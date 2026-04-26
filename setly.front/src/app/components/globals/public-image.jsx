"use client";

import Image from "next/image";

/**
 * Локальные файлы из /public (`/img/**`, `/icons/**`).
 * `unoptimized` — без лишней оптимизации для SVG/мелких иконок в UI.
 */
export default function PublicImage({
  src,
  alt = "",
  width,
  height,
  className,
  style,
  priority,
  sizes,
  draggable,
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      sizes={sizes}
      draggable={draggable}
      unoptimized
    />
  );
}
