'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './personal-header.module.css';
import { apiFetch } from '@/app/lib/api';
import ImageCropModal from '@/app/components/globals/image-crop-modal/image-crop-modal';

const DEFAULT_HEADER_IMAGE = '/img/main/personal-bg-default.png';
const DEFAULT_HEADER_IMAGE_MOBILE = '/img/main/personal-bg-default-mobile.png';
const MOBILE_BREAKPOINT = 601;
const DESKTOP_HEADER_CROP = {
  aspectRatio: 1045 / 200,
  outputWidth: 1600,
  outputHeight: 306,
};
const MOBILE_HEADER_CROP = {
  aspectRatio: 560 / 334,
  outputWidth: 1120,
  outputHeight: 668,
};
/** Загрузка шапки через бэкенд POST /api/user/me/save-image/profile_bg, затем PATCH /api/user/me */
const UPLOAD_HEADER_API = '/api/user/me/save-image/profile_bg/';
const UPDATE_ME_API = '/api/user/me';

/**
 * Хук: совпадает ли viewport с условием (max-width: MOBILE_BREAKPOINT - 1px).
 */
function useIsMobileView(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

/**
 * Блок-фон шапки личного кабинета (маска desktop 1045×200px, mobile 560×334px).
 * По умолчанию — personal-bg-default.png; при наличии пользователя — profile_bg_url с бэкенда.
 * При наведении можно загрузить своё фото (сохраняется на бэкенде в storage/profile_bg, привязывается к /me).
 *
 * @param {Object} props
 * @param {string} [props.profileBgUrl] - URL шапки пользователя (из user.profile_bg_url)
 * @param {string} [props.userId] - id пользователя
 * @param {string} [props.token] - JWT для запросов к API
 * @param {function(): void} [props.onHeaderImageChange] - Вызов после успешной загрузки (перезапросить user)
 */
export default function PersonalHeader({ profileBgUrl, userId, token, canEdit = true, onHeaderImageChange }) {
  const [localPath, setLocalPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileToCrop, setFileToCrop] = useState(null);
  const inputRef = useRef(null);
  const isMobile = useIsMobileView(MOBILE_BREAKPOINT);
  const headerCrop = isMobile ? MOBILE_HEADER_CROP : DESKTOP_HEADER_CROP;

  const defaultImage = isMobile ? DEFAULT_HEADER_IMAGE_MOBILE : DEFAULT_HEADER_IMAGE;
  const effectivePath =
    localPath ?? (profileBgUrl && profileBgUrl.trim() ? profileBgUrl : defaultImage);
  const canUpload = Boolean(canEdit && userId && token);

  const uploadHeaderFile = useCallback(
    async (file) => {
      if (!file || !userId || !token) return;
      setError(null);
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await apiFetch(UPLOAD_HEADER_API, {
          method: 'POST',
          token: token.trim(),
          body: formData,
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const detail = data?.detail;
          const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
          throw new Error(msg || data?.message || 'Ошибка загрузки');
        }

        const url = data.url;
        if (url) {
          setLocalPath(url);
          onHeaderImageChange?.();
          await apiFetch(UPDATE_ME_API, {
            method: 'PATCH',
            token: token.trim(),
            body: { profile_bg_url: url },
          });
        }
      } catch (err) {
        setError(err.message || 'Не удалось загрузить фото');
      } finally {
        setLoading(false);
      }
    },
    [userId, token, onHeaderImageChange]
  );

  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target?.files?.[0];
      if (!file || !userId || !token) return;
      if (!file.type.startsWith('image/')) {
        setError('Выберите изображение (JPG, PNG и т.д.)');
        return;
      }
      setFileToCrop(file);
      if (inputRef.current) inputRef.current.value = '';
    },
    [userId, token]
  );

  const handleClick = useCallback(() => {
    if (canUpload && inputRef.current) inputRef.current.click();
  }, [canUpload]);

  return (
    <div className={styles.wrapper} role="img" aria-label="Шапка профиля">
      <div className={styles.bgLayer} aria-hidden>
        <Image
          src={effectivePath}
          alt=""
          fill
          className={styles.bgImage}
          sizes="(max-width: 600px) 100vw, 1045px"
          unoptimized
        />
      </div>
      {loading && (
        <div className={styles.loadingOverlay} aria-live="polite">
          Загрузка…
        </div>
      )}
      {canUpload && (
        <div
          className={styles.uploadTrigger}
          onClick={handleClick}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          role="button"
          tabIndex={0}
          aria-label="Загрузить фото для шапки"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            aria-hidden
            onChange={handleFileChange}
          />
        </div>
      )}
      {error && <span className={styles.errorText}>{error}</span>}
      {fileToCrop && (
        <ImageCropModal
          file={fileToCrop}
          aspectRatio={headerCrop.aspectRatio}
          outputWidth={headerCrop.outputWidth}
          outputHeight={headerCrop.outputHeight}
          title="Кадрировать фото шапки"
          confirmText="Применить"
          onCancel={() => setFileToCrop(null)}
          onConfirm={async (croppedFile) => {
            await uploadHeaderFile(croppedFile);
            setFileToCrop(null);
          }}
        />
      )}
    </div>
  );
}
