"use client";

import Button from "@/app/components/atomic/atoms/buttons/buttons";
import styles from "./error-state-section.module.css";

/**
 * Центрированный блок ошибки: title_2, опционально paragraph, кнопка blue.
 * Обёртка — div, чтобы не вкладывать main в страницу, где уже есть main.
 */
export default function ErrorStateSection({
  title,
  description,
  buttonText,
  onButtonClick,
  titleId = "app-error-state-title",
}) {
  return (
    <div className={styles.wrap}>
      <section className={styles.content} aria-labelledby={titleId}>
        <h1 id={titleId} className={`title_2 ${styles.title}`}>
          {title}
        </h1>
        {description != null && description !== "" && (
          <p className={`paragraph ${styles.description}`}>{description}</p>
        )}
        <div className={styles.buttonWrap}>
          <Button
            color="blue"
            Text={buttonText}
            type="button"
            onClick={onButtonClick}
          />
        </div>
      </section>
    </div>
  );
}
