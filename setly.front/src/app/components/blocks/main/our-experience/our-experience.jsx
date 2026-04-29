"use client";

import {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
    useMemo,
} from "react";
import Link from "next/link";
import Image from "next/image";
import ImageWithSkeleton from "@/app/components/globals/image-with-skeleton";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { ARTICLES_LIST } from "@/data/articles-data";
import { applyTypograf } from "@/app/lib/typograf";
import {
    CAROUSEL_CARD_GAP_PX as CARD_GAP_PX,
    computeCarouselLayout,
} from "@/app/lib/carousel-layout";
import styles from "./our-experience.module.css";

const EXPERIENCE_CARDS = ARTICLES_LIST.map((article) => ({
    id: article.id,
    slug: article.slug,
    imageSrc: article.imageSrc,
    imageAlt: article.imageAlt,
    title: article.title,
    description: article.description,
    readTime: article.readTime,
}));


/* Дубликат трека для бесконечной прокрутки */
const trackCards = [...EXPERIENCE_CARDS, ...EXPERIENCE_CARDS];
const totalSlides = trackCards.length;
const totalPositions = EXPERIENCE_CARDS.length + 1;

const SWIPE_MIN_PX = 50;
const MOBILE_BREAKPOINT = 2561;

function ExperienceCard({ id, slug, imageSrc, imageAlt, title, description, readTime }) {
    return (
        <Link
            href={`/articles/${encodeURIComponent(slug || String(id))}`}
            className={styles.cardLink}
            aria-label={`Читать: ${title}`}
        >
            <article className={styles.card}>
                <div className={styles.tags}>
                    <span className={styles.tag}>
                        <Image
                            src="/icons/images/Lightbulb.svg"
                            alt=""
                            width={20}
                            height={20}
                            className={styles.tagIcon}
                        />
                        Статья
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
                <ImageWithSkeleton
                    wrapperClassName={styles.cardImageWrap}
                    className={styles.cardImage}
                    src={imageSrc}
                    alt={imageAlt}
                    width={264}
                    height={264}
                    sizes="(max-width: 620px) 280px, (max-width: 950px) 335px, 264px"
                />
                <h3 className={`${styles.cardTitle} subtitle_1`}>{applyTypograf(title)}</h3>
                <p className={`${styles.cardDescription} subinfo`}>{applyTypograf(description)}</p>
            </article>
        </Link>
    );
}

export default function OurExperience() {
    const viewportRef = useRef(null);
    const [viewportWidth, setViewportWidth] = useState(1164);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [skipTransition, setSkipTransition] = useState(false);
    const isJumpingRef = useRef(false);
    const touchStartX = useRef(null);

    const layout = useMemo(
        () => computeCarouselLayout(viewportWidth),
        [viewportWidth],
    );
    const { cardWidth: cardWidthPx, centerOffset } = layout;
    const stepPx = cardWidthPx + CARD_GAP_PX;
    const trackWidthPx =
        totalSlides * cardWidthPx + (totalSlides - 1) * CARD_GAP_PX;

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el) return;
        const measure = () => {
            setViewportWidth(el.getBoundingClientRect().width);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setCarouselIndex(0);
        });
        return () => cancelAnimationFrame(id);
    }, [viewportWidth]);

    const isMobileView = () =>
        typeof window !== "undefined" &&
        window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

    const goNext = () => {
        if (isTransitioning || stepPx <= 0 || cardWidthPx <= 0) return;
        setIsTransitioning(true);
        setCarouselIndex((prev) => (prev < totalPositions - 1 ? prev + 1 : prev));
    };

    const goPrev = () => {
        if (isTransitioning || stepPx <= 0 || cardWidthPx <= 0) return;
        if (carouselIndex > 0) {
            setIsTransitioning(true);
            setCarouselIndex((prev) => prev - 1);
            return;
        }
        setSkipTransition(true);
        setCarouselIndex(totalPositions - 1);
        isJumpingRef.current = true;
    };

    const handleTransitionEnd = (e) => {
        if (e.propertyName !== "transform") return;
        setIsTransitioning(false);
        if (carouselIndex === totalPositions - 1) {
            setSkipTransition(true);
            setCarouselIndex(0);
        }
    };

    const handleSwipeStart = (e) => {
        if (!isMobileView()) return;
        touchStartX.current = e.touches[0].clientX;
    };

    const handleSwipeEnd = (e) => {
        if (!isMobileView() || touchStartX.current === null) return;
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - touchStartX.current;
        touchStartX.current = null;
        if (deltaX < -SWIPE_MIN_PX) goNext();
        else if (deltaX > SWIPE_MIN_PX) goPrev();
    };

    useEffect(() => {
        if (!skipTransition) return;
        const id = requestAnimationFrame(() => {
            setSkipTransition(false);
            if (isJumpingRef.current) {
                isJumpingRef.current = false;
                setIsTransitioning(true);
                setCarouselIndex(totalPositions - 2);
            }
        });
        return () => cancelAnimationFrame(id);
    }, [skipTransition]);

    const translateX = centerOffset - carouselIndex * stepPx;

    return (
        <section className={styles.wrapper}>
            <h2 className={`${styles.title} title_1`}>
                Делимся личным опытом
            </h2>

            <div className={styles.carouselBlock}>
                <div className={styles.carouselNav}>
                    <RoundButton
                        variant="white"
                        icon={
                            <Image
                                src="/icons/system/ArrowLeft.svg"
                                alt=""
                                width={20}
                                height={20}
                            />
                        }
                        onClick={goPrev}
                        aria-label="Предыдущая карточка"
                        disabled={isTransitioning}
                    />
                    <RoundButton
                        variant="white"
                        icon={
                            <Image
                                src="/icons/system/ArrowRight.svg"
                                alt=""
                                width={20}
                                height={20}
                            />
                        }
                        onClick={goNext}
                        aria-label="Следующая карточка"
                        disabled={isTransitioning}
                    />
                </div>

                <div
                    className={styles.cardsSlider}
                    onTouchStart={handleSwipeStart}
                    onTouchEnd={handleSwipeEnd}
                    role="region"
                    aria-label="Карусель статей"
                >
                    <div className={styles.cardsSliderViewport} ref={viewportRef}>
                        <div
                            className={`${styles.cardsTrack} ${skipTransition ? styles.cardsTrackNoTransition : ""}`}
                            style={{
                                width: trackWidthPx,
                                gap: CARD_GAP_PX,
                                transform: `translateX(${translateX}px)`,
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {trackCards.map((card, i) => (
                                <div
                                    key={`${card.id}-${i}`}
                                    className={styles.cardSlide}
                                    style={{
                                        width: cardWidthPx,
                                        flex: `0 0 ${cardWidthPx}px`,
                                    }}
                                >
                                    <ExperienceCard {...card} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
