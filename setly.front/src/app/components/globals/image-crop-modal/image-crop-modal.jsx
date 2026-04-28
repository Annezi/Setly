'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NextImage from 'next/image';
import styles from './image-crop-modal.module.css';
import Button from '@/app/components/atomic/atoms/buttons/buttons';

const MAX_ZOOM = 3;
const MIN_ZOOM = 1;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Не удалось прочитать изображение'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Не удалось загрузить изображение'));
    image.src = src;
  });
}

export default function ImageCropModal({
  file,
  aspectRatio = 1,
  outputWidth = 600,
  outputHeight = 600,
  title = 'Кадрировать фото',
  confirmText = 'Сохранить',
  cancelText = 'Отмена',
  previewShape = 'rounded',
  onCancel,
  onConfirm,
}) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [submitting, setSubmitting] = useState(false);
  const draggingRef = useRef(null);
  const zoomProgress = ((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100;

  const frameSize = useMemo(() => {
    if (aspectRatio >= 1) {
      return { width: 360, height: Math.round(360 / aspectRatio) };
    }
    return { width: Math.round(320 * aspectRatio), height: 320 };
  }, [aspectRatio]);

  useEffect(() => {
    let cancelled = false;
    if (!file) return undefined;
    setLoading(true);
    setError(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    readFileAsDataUrl(file)
      .then(async (src) => {
        const img = await loadImage(src);
        if (cancelled) return;
        setImageSrc(src);
        setImageMeta({ width: img.naturalWidth, height: img.naturalHeight });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Ошибка открытия изображения');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  const renderState = useMemo(() => {
    if (!imageMeta) return null;
    const baseScale = Math.max(frameSize.width / imageMeta.width, frameSize.height / imageMeta.height);
    const displayScale = baseScale * zoom;
    const maxOffsetX = Math.max(0, (imageMeta.width * displayScale - frameSize.width) / 2);
    const maxOffsetY = Math.max(0, (imageMeta.height * displayScale - frameSize.height) / 2);
    return { baseScale, displayScale, maxOffsetX, maxOffsetY };
  }, [imageMeta, frameSize.height, frameSize.width, zoom]);

  const clampedOffset = useMemo(() => {
    if (!renderState) return { x: 0, y: 0 };
    return {
      x: clamp(offset.x, -renderState.maxOffsetX, renderState.maxOffsetX),
      y: clamp(offset.y, -renderState.maxOffsetY, renderState.maxOffsetY),
    };
  }, [offset.x, offset.y, renderState]);

  const onPointerDown = useCallback(
    (event) => {
      if (!renderState) return;
      draggingRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        startOffsetX: clampedOffset.x,
        startOffsetY: clampedOffset.y,
      };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [clampedOffset.x, clampedOffset.y, renderState]
  );

  const onPointerMove = useCallback(
    (event) => {
      const drag = draggingRef.current;
      if (!drag || !renderState) return;
      const nextX = drag.startOffsetX + (event.clientX - drag.startX);
      const nextY = drag.startOffsetY + (event.clientY - drag.startY);
      setOffset({
        x: clamp(nextX, -renderState.maxOffsetX, renderState.maxOffsetX),
        y: clamp(nextY, -renderState.maxOffsetY, renderState.maxOffsetY),
      });
    },
    [renderState]
  );

  const onPointerUp = useCallback((event) => {
    draggingRef.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!imageSrc || !imageMeta || !renderState) return;
    setSubmitting(true);
    setError(null);
    try {
      const img = await loadImage(imageSrc);
      const canvas = document.createElement('canvas');
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Не удалось подготовить изображение');

      const frameToOutput = outputWidth / frameSize.width;
      const scale = renderState.displayScale * frameToOutput;
      ctx.translate(outputWidth / 2 + clampedOffset.x * frameToOutput, outputHeight / 2 + clampedOffset.y * frameToOutput);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -imageMeta.width / 2, -imageMeta.height / 2);

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((result) => {
          if (!result) reject(new Error('Не удалось сохранить кадр'));
          else resolve(result);
        }, 'image/jpeg', 0.92);
      });

      const croppedFile = new File([blob], file?.name || 'image.jpg', { type: 'image/jpeg' });
      await onConfirm?.(croppedFile);
    } catch (err) {
      setError(err.message || 'Не удалось обрезать изображение');
    } finally {
      setSubmitting(false);
    }
  }, [
    clampedOffset.x,
    clampedOffset.y,
    file?.name,
    frameSize.width,
    imageMeta,
    imageSrc,
    onConfirm,
    outputHeight,
    outputWidth,
    renderState,
  ]);

  if (!file) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.modal}>
        <h3 className={styles.title}>{title}</h3>
        {loading && <p className={styles.meta}>Загрузка изображения…</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && imageSrc && renderState && (
          <>
            <div
              className={`${styles.cropArea} ${previewShape === 'circle' ? styles.cropAreaCircle : ''} ${previewShape === 'binocular' ? styles.cropAreaBinocular : ''}`}
              style={{ width: `${frameSize.width}px`, height: `${frameSize.height}px` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <NextImage
                src={imageSrc}
                alt=""
                width={imageMeta.width}
                height={imageMeta.height}
                unoptimized
                draggable={false}
                className={styles.cropImage}
                style={{
                  width: `${imageMeta.width * renderState.displayScale}px`,
                  height: `${imageMeta.height * renderState.displayScale}px`,
                  transform: `translate(calc(-50% + ${clampedOffset.x}px), calc(-50% + ${clampedOffset.y}px))`,
                }}
              />
            </div>
            <label className={styles.meta} htmlFor="crop-zoom-range">
              Масштаб
            </label>
            <input
              className={styles.zoomRange}
              id="crop-zoom-range"
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={0.01}
              value={zoom}
              style={{ '--range-progress': `${zoomProgress}%` }}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
            <p className={styles.meta}>Выберите область фото, которая будет отображаться</p>
          </>
        )}
        <div className={styles.actions}>
          <Button
            type="button"
            color="white"
            Text={cancelText}
            onClick={onCancel}
            disabled={submitting}
          />
          <Button
            type="button"
            color="blue"
            Text={submitting ? 'Сохраняем…' : confirmText}
            onClick={handleConfirm}
            disabled={loading || submitting || Boolean(error)}
          />
        </div>
      </div>
    </div>
  );
}
