"use client";

import styles from "./plan-card-skeleton.module.css";

/**
 * Фантомная карточка чекплана с анимацией загрузки полей.
 * Совпадает по структуре и размерам с карточкой чекплана, чтобы не было скачков верстки.
 */
export function PlanCardSkeleton() {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.tags}>
        <span className={styles.tag} />
        <span className={styles.tag} />
      </div>
      <div className={styles.cardImageWrapper} />
      <div className={styles.cardTitle} />
      <div className={styles.cardDescription}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <div className={styles.avatar} />
          <div className={styles.footerLabel} />
        </div>
        <div className={styles.footerRight} />
      </div>
    </article>
  );
}

