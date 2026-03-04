'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ProfilePhoto from '@/app/components/atomic/atoms/profile-photo/profile-photo';
import RoundButton from '@/app/components/atomic/atoms/buttons-round/buttons-round';
import styles from './profile-info.module.css';
import { getApiUrl } from '@/app/lib/api';

/** Загрузка аватара через бэкенд POST /api/user/me/save-image/profile_photo, затем PATCH /api/user/me */
const UPLOAD_AVATAR_API = '/api/user/me/save-image/profile_photo/';
const UPDATE_ME_API = '/api/user/me';

/**
 * Блок информации о профиле: аватар, имя, почта, кнопка настроек.
 * Данные и загрузка аватара привязаны к авторизованному пользователю.
 *
 * @param {Object} props
 * @param {Object} [props.user] - данные пользователя { id, nickname, email, profile_photo_url }
 * @param {string} [props.token] - JWT для запросов к API
 * @param {function(): void} [props.onUserChange] - вызов после обновления данных (перезапрос user)
 */
export default function ProfileInfo({ user, token, onUserChange }) {
  const router = useRouter();
  const [localAvatarPath, setLocalAvatarPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const effectiveAvatarPath =
    localAvatarPath ??
    (user?.profile_photo_url && user.profile_photo_url.trim() ? user.profile_photo_url : null) ??
    (user?.avatarPath && user.avatarPath.trim() ? user.avatarPath : null);
  const canUpload = Boolean(user?.id && token);

  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target?.files?.[0];
      if (!file || !user?.id || !token) return;
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
        const uploadUrl = base ? `${base}${UPLOAD_AVATAR_API}` : UPLOAD_AVATAR_API;
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
          setLocalAvatarPath(url);
          onUserChange?.();
          const patchUrl = base ? `${base}${UPDATE_ME_API}` : UPDATE_ME_API;
          await fetch(patchUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.trim()}`,
            },
            body: JSON.stringify({ profile_photo_url: url }),
          });
        }
      } catch (err) {
        setError(err.message || 'Не удалось загрузить фото');
      } finally {
        setLoading(false);
        if (inputRef.current) inputRef.current.value = '';
      }
    },
    [user?.id, token, onUserChange]
  );

  const handlePhotoClick = useCallback(() => {
    if (canUpload && inputRef.current) inputRef.current.click();
  }, [canUpload]);

  const displayName = user?.nickname ?? user?.name ?? 'Пользователь';
  const displayEmail = user?.email ?? '';

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        aria-hidden
        onChange={handleFileChange}
      />
      <div className={styles.left}>
        <ProfilePhoto
          src={effectiveAvatarPath ? effectiveAvatarPath : undefined}
          onClick={handlePhotoClick}
        />
        <div className={styles.textBlock}>
          <h1 className={`title_1 ${styles.profileName}`}>{displayName}</h1>
          <p className={`subinfo ${styles.email}`}>{displayEmail}</p>
        </div>
      </div>
      <div className={styles.settingsButton}>
        <RoundButton
          variant="white"
          icon={<img src="/icons/system/Settings.svg" alt="" width={20} height={20} />}
          aria-label="Настройки профиля"
          onClick={() => router.push('/settings')}
        />
      </div>
      {loading && <span className={styles.loading}>Загрузка…</span>}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
