"use client";

import Image from "next/image";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import ScrollReveal from "@/app/components/globals/scroll-reveal/scroll-reveal";
import { applyTypograf } from "@/app/lib/typograf";
import styles from "./about.module.css";

const PURPOSE_CARDS = [
  {
    imageSrc: "/img/main/forwhat.png",
    imageAlt: "Для чего",
    title: "Наша миссия",
    description:
      "Создать медиа-сервис, который превращает подготовку к путешествию из источника тревоги в спокойную уверенность в планах",
  },
  {
    imageSrc: "/img/main/andwhy.png",
    imageAlt: "Почему",
    title: "Контекст создания",
    description:
      "Setly является дипломным проектом студентки 4 курса программы «UX/UI дизайн и Frontend-разработка» в Школе Дизайна НИУ ВШЭ",
  },
];

const AUTHORS = [
  {
    imageSrc: "/img/main/autor1.png",
    imageAlt: "Анна Гущина",
    name: "Анна Гущина",
    description:
      "Дизайнер, в качестве дипломного проекта решила сделать продукт, который совмещает в себе две любимые вещи — путешествия и планирование",
  },
  {
    imageSrc: "/img/main/autor2.png",
    imageAlt: "Антон Ларин",
    name: "Антон Ларин",
    description:
      "UX/UI-дизайнер, куратор дипломного проекта и профиля «UX/UI и frontend-разработка» в Школе дизайна НИУ ВШЭ — Нижний Новгород.",
  },
  {
    imageSrc: "/img/main/autor3.png",
    imageAlt: "Кирилл Ермолаев",
    name: "Кирилл Ермолаев",
    description:
      "Frontend-разработчик, консультант дипломного проекта. Преподаватель UX/UI и Frontend-разработки в Школе дизайна НИУ ВШЭ — Нижний Новгород.",
  },
];

export default function AboutPageClient() {
  return (
    <div className="container main-page-reveal">
      <ScrollReveal delay={0}>
        <Header />
      </ScrollReveal>

      <main className={styles.main}>
        <ScrollReveal delay={60}>
          <section className={styles.welcomeSection}>
            <div className={styles.welcomeImageWrap}>
              <Image
                src="/img/main/aboutWelcome.webp"
                alt="О проекте Setly"
                width={1163}
                height={676}
                className={styles.welcomeImage}
                priority
              />
            </div>
            <h1 className={`${styles.welcomeSubtitle} subtitle_2`}>
              {applyTypograf("О чем этот проект?")}
            </h1>
            <p className={`${styles.welcomeDescription} paragraph`}>
              {applyTypograf(
                "Многие хотят путешествовать, но редко задумываются, что подготовка — важная часть самого путешествия. Эта медиа платформа создана чтобы путешественники не только могли удобно планировать свои поездки, но и делиться своим опытом с другими в формате чек-планов"
              )}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <section className={styles.purposeSection}>
            <div className={styles.purposeCards}>
              {PURPOSE_CARDS.map((card) => (
                <article key={card.title} className={styles.purposeCard}>
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={183}
                    height={186}
                    className={styles.purposeCardImage}
                  />
                  <h2 className={`${styles.purposeCardTitle} subtitle_1`}>
                    {applyTypograf(card.title)}
                  </h2>
                  <p className={`${styles.purposeCardDescription} subinfo`}>
                    {applyTypograf(card.description)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <section className={styles.authorsSection}>
            <h2 className={`${styles.authorsTitle} subtitle_2`}>
              {applyTypograf("Авторы проекта")}
            </h2>
            <p className={`${styles.authorsDescription} paragraph`}>
              {applyTypograf("При поддержке кураторов Школы Дизайна НИУ ВШЭ")}
            </p>

            <div className={styles.authorsList}>
              {AUTHORS.map((author, index) => (
                <article
                  key={author.name}
                  className={`${styles.authorRow} ${index % 2 === 1 ? styles.authorRowReversed : ""}`}
                >
                  <div className={styles.authorImageWrap}>
                    <Image
                      src={author.imageSrc}
                      alt={author.imageAlt}
                      width={276}
                      height={278}
                      className={styles.authorImage}
                    />
                  </div>
                  <div className={styles.authorContent}>
                    <h3 className={`${styles.authorName} subtitle_1`}>
                      {applyTypograf(author.name)}
                    </h3>
                    <p className={`${styles.authorText} paragraph`}>
                      {applyTypograf(author.description)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </main>

      <ScrollReveal delay={180}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
