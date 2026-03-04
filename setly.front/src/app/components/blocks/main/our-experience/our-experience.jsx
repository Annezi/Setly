"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import styles from "./our-experience.module.css";

const EXPERIENCE_CARDS = [
    {
        imageSrc: "/img/main/suit-case-2.png",
        imageAlt: "Чемодан",
        title: "Как собраться в поездку за 15 минут",
        description:
            "Не обязательно брать все подряд, чтобы быть готовым ко всему",
    },
    {
        imageSrc: "/img/main/question-sign.png",
        imageAlt: "Вопрос",
        title: "Почему вы всё ещё забываете вещи",
        description:
            "Разбираемся как перестать это делать и систематизировать свой опыт",
    },
    {
        imageSrc: "/img/main/med-kit.png",
        imageAlt: "Аптечка",
        title: "Как собрать универсальную дорожную аптечку",
        description:
            "Собираем базовый минимум, чтобы исключить рискованный максимум",
    },
];

function ExperienceCard({ imageSrc, imageAlt, title, description }) {
    return (
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
                    5 минут
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
            <h3 className={`${styles.cardTitle} subtitle_1`}>{title}</h3>
            <p className={`${styles.cardDescription} subinfo`}>{description}</p>
        </article>
    );
}

/* Трек [0,1,2,0,1,2]: полный дубликат для бесконечного цикла без перескакивания */
const trackCards = [...EXPERIENCE_CARDS, ...EXPERIENCE_CARDS];
const totalSlides = trackCards.length; /* 6 */
const totalPositions = EXPERIENCE_CARDS.length + 1; /* 0,1,2,3 — позиция 3 = клон начала */
const trackStepPercent = 100 / totalSlides; /* один слайд = 16.666% трека */

const SWIPE_MIN_PX = 50;
const MOBILE_BREAKPOINT = 2561;

export default function OurExperience() {
    const [carouselIndex, setCarouselIndex] = useState(0); /* 0..3 */
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [skipTransition, setSkipTransition] = useState(false);
    const isJumpingRef = useRef(false);
    const touchStartX = useRef(null);

    const isMobileView = () =>
        typeof window !== "undefined" &&
        window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

    const goNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCarouselIndex((prev) => (prev < totalPositions - 1 ? prev + 1 : prev));
    };

    const goPrev = () => {
        if (isTransitioning) return;
        if (carouselIndex > 0) {
            setIsTransitioning(true);
            setCarouselIndex((prev) => prev - 1);
            return;
        }
        /* С позиции 0 «назад» = показываем конец трека [2,0,1]: мгновенно в позицию 3, затем анимация в 2 */
        setSkipTransition(true);
        setCarouselIndex(totalPositions - 1); /* 3 */
        isJumpingRef.current = true;
    };

    const handleTransitionEnd = (e) => {
        if (e.propertyName !== "transform") return;
        setIsTransitioning(false);
        /* После анимации вперёд до позиции 3 (клон начала) — мгновенно сброс в 0 без скачка */
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
                setCarouselIndex(totalPositions - 2); /* 2 — показываем [2,0,1] */
            }
        });
        return () => cancelAnimationFrame(id);
    }, [skipTransition]);

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
                    <div className={styles.cardsSliderViewport}>
                        <div
                            className={`${styles.cardsTrack} ${skipTransition ? styles.cardsTrackNoTransition : ""}`}
                            style={{
                                transform: `translateX(-${carouselIndex * trackStepPercent}%)`,
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {trackCards.map((card, i) => (
                                <div
                                    key={`${card.title}-${i}`}
                                    className={styles.cardSlide}
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
