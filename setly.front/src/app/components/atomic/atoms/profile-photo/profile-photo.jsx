"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PublicImage from "@/app/components/globals/public-image";
import styles from "./profile-photo.module.css";

export default function ProfilePhoto({
  src,
  onClick,
  className,
  href,
  hideUploadOnHover = false,
  interactive = true,
  size,
  ...props
}) {
  const showImage = Boolean(src && src.trim());
  const [brokenSrc, setBrokenSrc] = useState(null);
  const imageFailed = Boolean(showImage && brokenSrc === src);

  const sizeStyle = size != null ? { width: size, height: size, minWidth: size, minHeight: size } : undefined;
  /* В хедере кнопка 44×44, иконка внутри — 22×22; в остальных случаях иконка до 40px */
  const iconSize = size === 44 ? 22 : (size != null ? Math.min(size, 40) : 40);
  const avatarDim = size != null ? Math.max(1, size) : 80;

  const content = (
    <>
      <span className={styles.iconUser} aria-hidden>
        <PublicImage src="/icons/images/User.svg" alt="" width={iconSize} height={iconSize} />
      </span>
      {showImage && (
        <Image
          src={src}
          alt=""
          width={avatarDim}
          height={avatarDim}
          className={`${styles.avatarImage} ${imageFailed ? styles.avatarImageError : ""}`}
          onError={() => setBrokenSrc(src)}
          unoptimized
        />
      )}
      <span
        className={`${styles.hoverOverlay} ${hideUploadOnHover ? styles.hoverOverlayShade : ""}`}
        aria-hidden
      >
        {hideUploadOnHover ? null : (
          <span className={styles.hoverCircle}>
            <PublicImage src="/icons/system/Download.svg" alt="" width={20} height={20} />
          </span>
        )}
      </span>
    </>
  );

  const commonProps = {
    className: `${styles.profilePhoto} ${interactive ? styles.profilePhotoInteractive : styles.profilePhotoNonInteractive} ${className ?? ""}`,
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

  if (interactive) {
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

  return <div {...commonProps}>{content}</div>;
}

export function ProfilePhotoDemo() {
    return (
        <div className={styles.demo}>
            <ProfilePhoto onClick={() => {}} />
        </div>
    );
}
