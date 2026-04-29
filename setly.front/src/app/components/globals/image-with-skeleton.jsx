"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./image-with-skeleton.module.css";

const OPTIMIZED_IMAGE_HOSTS = new Set(["api.setly.space", "localhost"]);

export function shouldUseNextImageOptimization(src) {
  if (typeof src !== "string" || src.trim() === "") return true;
  if (!src.startsWith("http://") && !src.startsWith("https://")) return true;
  try {
    const parsed = new URL(src);
    return OPTIMIZED_IMAGE_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

export default function ImageWithSkeleton({
  wrapperClassName = "",
  className = "",
  src,
  alt = "",
  width,
  height,
  sizes,
  priority,
  fetchPriority,
  draggable,
  unoptimized = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const wrapperClasses = `${styles.wrapper} ${wrapperClassName}`.trim();
  const imageClasses = `${className} ${styles.image}`.trim();

  return (
    <div className={wrapperClasses}>
      {!loaded && <span className={styles.skeleton} aria-hidden />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority}
        draggable={draggable}
        unoptimized={unoptimized}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}
