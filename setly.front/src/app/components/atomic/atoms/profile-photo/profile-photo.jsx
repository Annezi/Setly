"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./profile-photo.module.css";

export default function ProfilePhoto({
  src,
  onClick,
  className,
  href,
  hideUploadOnHover = false,
  size,
  ...props
}) {
  const showImage = Boolean(src && src.trim());
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const sizeStyle = size != null ? { width: size, height: size, minWidth: size, minHeight: size } : undefined;
  /* В хедере кнопка 44×44, иконка внутри — 22×22; в остальных случаях иконка до 40px */
  const iconSize = size === 44 ? 22 : (size != null ? Math.min(size, 40) : 40);

  const content = (
    <>
      <span className={styles.iconUser} aria-hidden>
        <img src="/icons/images/User.svg" alt="" width={iconSize} height={iconSize} />
      </span>
      {showImage && (
        <img
          src={src}
          alt=""
          className={`${styles.avatarImage} ${imageError ? styles.avatarImageError : ""}`}
          onError={() => setImageError(true)}
        />
      )}
      <span
        className={`${styles.hoverOverlay} ${hideUploadOnHover ? styles.hoverOverlayShade : ""}`}
        aria-hidden
      >
        {hideUploadOnHover ? null : (
          <span className={styles.hoverCircle}>
            <img src="/icons/system/Download.svg" alt="" width={20} height={20} />
          </span>
        )}
      </span>
    </>
  );

  const commonProps = {
    className: `${styles.profilePhoto} ${className ?? ""}`,
    style: sizeStyle,
    ...props,
  };

  if (href) {
    return (
      <Link href={href} aria-label="Перейти в личный кабинет" {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label="Загрузить фото профиля"
      onClick={onClick}
      {...commonProps}
    >
      {content}
    </button>
  );
}

export function ProfilePhotoDemo() {
    return (
        <div className={styles.demo}>
            <ProfilePhoto onClick={() => console.log("Profile photo click")} />
        </div>
    );
}
