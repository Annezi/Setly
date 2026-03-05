'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/globals/header/Header';
import { Footer } from '@/app/components/globals/footer/Footer';
import OurExperience from '@/app/components/blocks/main/our-experience/our-experience';
import Button from '@/app/components/atomic/atoms/buttons/buttons';
import RoundButton from '@/app/components/atomic/atoms/buttons-round/buttons-round';
import { getArticleById } from '@/data/articles-data';
import styles from './article.module.css';

/** Тостер «Ссылка на статью скопирована»: по центру экрана, 2 сек */
function CopyLinkToast({ show, onExited }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onExited?.(), 2000);
    return () => clearTimeout(t);
  }, [show, onExited]);
  if (!show || typeof document === 'undefined') return null;
  return createPortal(
    <div className={styles.copyLinkToast} role="status" aria-live="polite">
      Ссылка на статью скопирована
    </div>,
    document.body
  );
}

export default function Article({ articleId }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showCopyLinkToast, setShowCopyLinkToast] = useState(false);

  const article = getArticleById(articleId);

  const handleCopyLink = useCallback(() => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}${pathname || window.location.pathname}`
        : '';
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => setShowCopyLinkToast(true));
    } else {
      setShowCopyLinkToast(true);
    }
  }, [pathname]);

  if (!article) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <Link href="/articles" className={styles.breadcrumb} aria-label="Назад к списку статей">
            <span className={styles.breadcrumbIcon} aria-hidden>
              <Image src="/icons/system/ArrowLeft.svg" alt="" width={20} height={20} />
            </span>
            <span className={`${styles.breadcrumbText} subinfo`}>Назад</span>
          </Link>
          <div className={styles.notFound}>
            <p className={`${styles.notFoundText} title_2`}>Статья не найдена</p>
            <Link href="/articles" className={`${styles.notFoundLink} subinfo`}>
              Вернуться к списку статей
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const hasSecondImage = Boolean(article.image2 && article.image2Caption);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Link href="/articles" className={styles.breadcrumb} aria-label="Назад к списку статей">
          <span className={styles.breadcrumbIcon} aria-hidden>
            <Image src="/icons/system/ArrowLeft.svg" alt="" width={20} height={20} />
          </span>
          <span className={`${styles.breadcrumbText} subinfo`}>Назад</span>
        </Link>

        <section className={styles.hero} aria-label="Заголовок статьи">
          <div className={styles.heroImageWrap}>
            <Image
              src={article.heroImage}
              alt=""
              width={335}
              height={338}
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.tags}>
              <span className={styles.tag}>
                <Image src="/icons/images/Lightbulb.svg" alt="" width={20} height={20} className={styles.tagIcon} />
                Статья
              </span>
              <span className={styles.tag}>
                <Image src="/icons/images/Clock.svg" alt="" width={20} height={20} className={styles.tagIcon} />
                {article.readTime}
              </span>
            </div>
            <h1 className={`${styles.heroTitle} title_1`}>{article.title}</h1>
            <p className={`${styles.heroDescription} subinfo`}>{article.description}</p>
          </div>
        </section>

        <article className={styles.articleBody}>
          <div className={styles.block}>
            <h2 className={`${styles.blockTitle} title_2`}>Предисловие</h2>
            <p className={`${styles.paragraph} paragraph`}>{article.preamble}</p>
          </div>

          <figure className={styles.figure}>
            <div className={styles.figureImageWrap}>
              <Image
                src={article.image1}
                alt=""
                width={808}
                height={470}
                className={styles.figureImage}
              />
            </div>
            <figcaption className={`${styles.caption} subinfo`}>{article.image1Caption}</figcaption>
          </figure>

          <div className={styles.block}>
            <h2 className={`${styles.blockTitle} title_2`}>{article.step1Title}</h2>
            <p className={`${styles.paragraph} paragraph`}>{article.step1Intro}</p>
            <div className={styles.listBlock}>
              <ol className={styles.orderedList}>
                {article.step1Items.map((item, idx) => (
                  <li key={idx}>
                    <span className="subtitle_1">{item.subtitle}</span>
                    <ul className={styles.bulletList}>
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
            {article.step1Outro && (
              <p className={`${styles.paragraph} paragraph`}>{article.step1Outro}</p>
            )}
          </div>

          {hasSecondImage && (
            <figure className={styles.figure}>
              <div className={styles.figureImageWrap}>
                <Image
                  src={article.image2}
                  alt=""
                  width={808}
                  height={470}
                  className={styles.figureImage}
                />
              </div>
              <figcaption className={`${styles.caption} subinfo`}>{article.image2Caption}</figcaption>
            </figure>
          )}

          {article.step2Title && article.step2Steps?.length > 0 && (
            <div className={styles.block}>
              <h2 className={`${styles.blockTitle} title_2`}>{article.step2Title}</h2>
              <p className={`${styles.paragraph} paragraph`}>{article.step2Intro}</p>
              <ol className={styles.stepList}>
                {article.step2Steps.map((step, idx) => (
                  <li key={idx}>
                    <span className="subtitle_1">{step.title}</span>
                    <p className={`${styles.paragraph} paragraph`}>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className={styles.block}>
            <h2 className={`${styles.blockTitle} title_2`}>Ключевой принцип</h2>
            <p className={`${styles.paragraph} paragraph`}>{article.keyPrinciple}</p>
          </div>

          <div className={styles.articleFooter}>
            <RoundButton
              variant="white"
              icon={
                <Image src="/icons/images/Link.svg" alt="" width={20} height={20} aria-hidden />
              }
              onClick={handleCopyLink}
              aria-label="Скопировать ссылку на статью"
            />
            <time className={`${styles.articleDate} subinfo`} dateTime={article.publishedDate?.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')}>
              {article.publishedDate}
            </time>
          </div>
        </article>

        <section className={styles.templatesBlock} aria-labelledby="templates-heading">
          <div className={styles.templatesLeft}>
            <Image
              src="/img/main/article3.png"
              alt="Шаблоны для поездок"
              width={572}
              height={572}
              className={styles.templatesImage}
            />
          </div>
          <div className={styles.templatesRight}>
            <h2 id="templates-heading" className={`${styles.templatesTitle} title_1`}>
              Попробуй наши шаблоны для поездок
            </h2>
            <div className={styles.templatesDescriptionWrap}>
              <p className={`${styles.templatesDescription} paragraph`}>
                Практично, удобно, а ещё мы предусмотрели все важные пункты, тебе осталось только скопировать и настроить под себя
              </p>
              <Button
                Text="Использовать"
                color="white"
                onClick={() => router.push('/creating')}
              />
            </div>
          </div>
        </section>

        <OurExperience />
      </main>
      <Footer />
      <CopyLinkToast show={showCopyLinkToast} onExited={() => setShowCopyLinkToast(false)} />
    </>
  );
}
