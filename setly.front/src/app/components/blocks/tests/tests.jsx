"use client";

import Link from "next/link";
import Image from "next/image";
import { TESTS_LIST } from "@/data/tests-data";
import { applyTypograf } from "@/app/lib/typograf";
import styles from "./tests.module.css";

function normalizeForSearch(s) {
  if (s == null || typeof s !== "string") return "";
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function filterTestsBySearch(tests, query) {
  const q = normalizeForSearch(query);
  if (!q) return tests;
  const words = q.split(" ").filter(Boolean);
  if (words.length === 0) return tests;

  return tests.filter((test) => {
    const text = normalizeForSearch([test.title, test.description].join(" "));
    return words.some((word) => text.includes(word));
  });
}

function TestCard({ id, imageSrc, imageAlt, title, description, readTime }) {
  const href = `/tests/${encodeURIComponent(String(id))}`;
  const card = (
    <>
      <div className={styles.tags}>
        <span className={styles.tag}>
          <Image
            src="/icons/images/Lightbulb.svg"
            alt=""
            width={20}
            height={20}
            className={styles.tagIcon}
          />
          Тест
        </span>
        <span className={styles.tag}>
          <Image
            src="/icons/images/Clock.svg"
            alt=""
            width={20}
            height={20}
            className={styles.tagIcon}
          />
          {readTime}
        </span>
      </div>
      <div className={styles.cardImageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={264}
          height={264}
          className={styles.cardImage}
        />
      </div>
      <h3 className={`${styles.cardTitle} subtitle_1`}>{applyTypograf(title)}</h3>
      <p className={`${styles.cardDescription} subinfo`}>
        {applyTypograf(description)}
      </p>
    </>
  );

  return (
    <Link
      href={href}
      className={styles.cardLink}
      aria-label={`Пройти тест: ${title}`}
    >
      <article className={styles.card}>{card}</article>
    </Link>
  );
}

export default function Tests({ searchQuery = "" }) {
  const filtered = filterTestsBySearch(TESTS_LIST, searchQuery);

  return (
    <section className={styles.container} aria-label="Тесты">
      <div className={styles.cards}>
        {filtered.map((test) => (
          <TestCard key={test.id} id={test.id} {...test} />
        ))}
      </div>
    </section>
  );
}
