"use client";

import Link from "next/link";
import Image from "next/image";
import { ARTICLES_LIST } from "@/data/articles-data";
import { applyTypograf } from "@/app/lib/typograf";
import styles from "./articles.module.css";

function normalizeForSearch(s) {
  if (s == null || typeof s !== "string") return "";
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function filterArticlesBySearch(articles, query) {
  const q = normalizeForSearch(query);
  if (!q) return articles;
  const words = q.split(" ").filter(Boolean);
  if (words.length === 0) return articles;
  return articles.filter((article) => {
    const text = normalizeForSearch([article.title, article.description].join(" "));
    return words.some((word) => text.includes(word));
  });
}

function ArticleCard({ id, imageSrc, imageAlt, title, description, readTime }) {
  const card = (
    <>
      <div className={styles.tags}>
        <span className={styles.tag}>
          <Image src="/icons/images/Lightbulb.svg" alt="" width={20} height={20} className={styles.tagIcon} />
          Статья
        </span>
        <span className={styles.tag}>
          <Image src="/icons/images/Clock.svg" alt="" width={20} height={20} className={styles.tagIcon} />
          {readTime}
        </span>
      </div>
      <div className={styles.cardImageWrap}>
        <Image src={imageSrc} alt={imageAlt} width={264} height={264} className={styles.cardImage} />
      </div>
      <h3 className={`${styles.cardTitle} subtitle_1`}>{applyTypograf(title)}</h3>
      <p className={`${styles.cardDescription} subinfo`}>{applyTypograf(description)}</p>
    </>
  );

  return (
    <Link href={`/articles/${id}`} className={styles.cardLink} aria-label={`Читать: ${title}`}>
      <article className={styles.card}>{card}</article>
    </Link>
  );
}

export default function Articles({ searchQuery = "" }) {
  const filtered = filterArticlesBySearch(ARTICLES_LIST, searchQuery);

  return (
    <section className={styles.container} aria-label="Статьи">
      <div className={styles.cards}>
        {filtered.map((article) => (
          <ArticleCard key={article.id} id={article.id} {...article} />
        ))}
      </div>
    </section>
  );
}
