"use client";

import Image from "next/image";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import styles from "./technical-error-page.module.css";

export default function TechnicalErrorPage({ asDocument = false }) {
  const content = (
    <div className="container">
      <Header />

      <main className={styles.main}>
        <section className={styles.content} aria-labelledby="technical-error-title">
          <Image
            src="/img/main/500bg.png"
            alt="500"
            width={295}
            height={299}
            className={styles.image}
            priority
            draggable={false}
          />

          <h1 id="technical-error-title" className={`title_1 ${styles.title}`}>
            Техническая ошибка
          </h1>

          <p className={`paragraph ${styles.description}`}>
            Мы уже разбираемся. А вы пока проверьте, всё ли на месте: паспорт, зарядка, спокойствие.
            Попробуйте обновить страницу позже
          </p>

          <div className={styles.buttonWrap}>
            <Button
              color="blue"
              Text="Перезагрузить"
              type="button"
              onClick={() => window.location.reload()}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );

  if (asDocument) {
    return (
      <html lang="ru">
        <body>{content}</body>
      </html>
    );
  }

  return content;
}
