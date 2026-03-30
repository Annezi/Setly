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
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { ARTICLES_LIST } from "@/data/articles-data";
import { applyTypograf } from "@/app/lib/typograf";
import styles from "./our-experience.module.css";

const CARD_GAP_PX = 20;
const MIN_CARD_WIDTH_PX = 280;
const MAX_CARD_WIDTH_PX = 335;

const EXPERIENCE_CARDS = ARTICLES_LIST.map((article) => ({
    id: article.id,
    imageSrc: article.imageSrc,
    imageAlt: article.imageAlt,
    title: article.title,
    description: article.description,
    readTime: article.readTime,
}));

/**
 * Сначала подбираем ширину карточки в [280, 335], затем число колонок:
 * 3 колонки, если в слоте ≥ 280px; иначе 2 при ≥ 280; иначе 1.
 * Между карточками всегда ровно CARD_GAP_PX. Ряд короче viewport — центрируем через centerOffset.
 */
function computeCarouselLayout(viewportWidth) {
    const W = viewportWidth;
    if (W <= 0) {
        return {
            visibleCount: 1,
            cardWidth: MIN_CARD_WIDTH_PX,
            centerOffset: 0,
        };
    }

    const raw3 = (W - 2 * CARD_GAP_PX) / 3;
    if (raw3 >= MIN_CARD_WIDTH_PX) {
        const cardWidth = Math.min(MAX_CARD_WIDTH_PX, raw3);
        const rowWidth = 3 * cardWidth + 2 * CARD_GAP_PX;
        const centerOffset = Math.max(0, (W - rowWidth) / 2);
        return { visibleCount: 3, cardWidth, centerOffset };
    }

    const raw2 = (W - CARD_GAP_PX) / 2;
    if (raw2 >= MIN_CARD_WIDTH_PX) {
        const cardWidth = Math.min(MAX_CARD_WIDTH_PX, raw2);
        const rowWidth = 2 * cardWidth + CARD_GAP_PX;
        const centerOffset = Math.max(0, (W - rowWidth) / 2);
        return { visibleCount: 2, cardWidth, centerOffset };
    }

    const cardWidth = Math.min(
        MAX_CARD_WIDTH_PX,
        Math.max(MIN_CARD_WIDTH_PX, W),
    );
    const centerOffset = Math.max(0, (W - cardWidth) / 2);
    return { visibleCount: 1, cardWidth, centerOffset };
}

/* Дубликат трека для бесконечной прокрутки */
const trackCards = [...EXPERIENCE_CARDS, ...EXPERIENCE_CARDS];
const totalSlides = trackCards.length;
const totalPositions = EXPERIENCE_CARDS.length + 1;

const SWIPE_MIN_PX = 50;
const MOBILE_BREAKPOINT = 2561;

function ExperienceCard({ id, imageSrc, imageAlt, title, description, readTime }) {
    return (
        <Link
            href={`/articles/${id}`}
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
        setCarouselIndex(0);
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
