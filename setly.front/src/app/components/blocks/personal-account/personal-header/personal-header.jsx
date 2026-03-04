'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './personal-header.module.css';

const DEFAULT_HEADER_IMAGE = '/img/main/personal-bg-default.png';
const DEFAULT_HEADER_IMAGE_MOBILE = '/img/main/personal-bg-default-mobile.png';
const MOBILE_BREAKPOINT = 601;
import { getApiUrl } from '@/app/lib/api';
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
 * Блок-фон шапки личного кабинета (1008×200px).
 * По умолчанию — personal-bg-default.png; при наличии пользователя — profile_bg_url с бэкенда.
 * При наведении можно загрузить своё фото (сохраняется на бэкенде в storage/profile_bg, привязывается к /me).
 *
 * @param {Object} props
 * @param {string} [props.profileBgUrl] - URL шапки пользователя (из user.profile_bg_url)
 * @param {string} [props.userId] - id пользователя
 * @param {string} [props.token] - JWT для запросов к API
 * @param {function(): void} [props.onHeaderImageChange] - Вызов после успешной загрузки (перезапросить user)
 */
export default function PersonalHeader({ profileBgUrl, userId, token, onHeaderImageChange }) {
  const [localPath, setLocalPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const isMobile = useIsMobileView(MOBILE_BREAKPOINT);

  const defaultImage = isMobile ? DEFAULT_HEADER_IMAGE_MOBILE : DEFAULT_HEADER_IMAGE;
  const effectivePath =
    localPath ?? (profileBgUrl && profileBgUrl.trim() ? profileBgUrl : defaultImage);
  const canUpload = Boolean(userId && token);

  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target?.files?.[0];
      if (!file || !userId || !token) return;
      if (!file.type.startsWith('image/')) {
        setError('Выберите изображение (JPG, PNG и т.д.)');
        return;
      }
      setError(null);
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const base = getApiUrl();
        const uploadUrl = base ? `${base}${UPLOAD_HEADER_API}` : UPLOAD_HEADER_API;
        const res = await fetch(uploadUrl, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token.trim()}` },
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
          const patchUrl = base ? `${base}${UPDATE_ME_API}` : UPDATE_ME_API;
          await fetch(patchUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.trim()}`,
            },
            body: JSON.stringify({ profile_bg_url: url }),
          });
        }
      } catch (err) {
        setError(err.message || 'Не удалось загрузить фото');
      } finally {
        setLoading(false);
        if (inputRef.current) inputRef.current.value = '';
      }
    },
    [userId, token, onHeaderImageChange]
  );

  const handleClick = useCallback(() => {
    if (canUpload && inputRef.current) inputRef.current.click();
  }, [canUpload]);

  return (
    <div className={styles.wrapper} role="img" aria-label="Шапка профиля">
      <div className={styles.bgLayer} aria-hidden>
        <img
          src={effectivePath}
          alt=""
          className={styles.bgImage}
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
    </div>
  );
}
