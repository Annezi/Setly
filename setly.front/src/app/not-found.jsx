"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container">
      <Header />

      <main className={styles.main}>
        <section className={styles.content} aria-labelledby="not-found-title">
          <Image
            src="/img/main/404bg.png"
            alt="404"
            width={295}
            height={299}
            className={styles.image}
            priority
            draggable={false}
          />

          <h1 id="not-found-title" className={`title_1 ${styles.title}`}>
            Страница не найдена
          </h1>

          <p className={`paragraph ${styles.description}`}>
            Но не переживайте — ваши документы, адаптер и зарядка всё ещё на месте
          </p>

          <div className={styles.buttonWrap}>
            <Button
              color="blue"
              Text="Вернуться на главную"
              type="button"
              onClick={() => router.push("/")}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
