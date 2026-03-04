"use client";

import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { getAuth } from "@/app/lib/auth-storage";
import styles from "./our-community.module.css";

/** Попап «Войдите, чтобы поставить Лайк» + кнопка «Войти» */
const LoginToLikePopup = memo(function LoginToLikePopup({ isClosing, onClose, onLogin }) {
	return (
		<div
			className={`${styles.loginToLikeOverlay} ${isClosing ? styles.loginToLikeOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="our-community-login-to-like-title"
		>
			<div
				className={`${styles.loginToLikePopup} ${isClosing ? styles.loginToLikePopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="our-community-login-to-like-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Войдите, чтобы поставить Лайк
				</h2>
				<div className={styles.loginToLikeButtons}>
					<Button Text="Войти" color="blue" type="button" onClick={onLogin} />
				</div>
			</div>
		</div>
	);
});

const COMMUNITY_CARDS = [
    {
        imageSrc: "/img/main/media-japan-card.png",
        imageAlt: "Япония",
        days: "10 дней",
        location: "Киото",
        title: "Япония 2025",
        description: "Список для тех, кто как я любит много ходить и искать не туристические места",
        avatarSrc: "/img/main/ducccky.png",
        userName: "ducccky",
        initialLikes: 241,
    },
    {
        imageSrc: "/img/main/media-thailand-card.png",
        imageAlt: "Таиланд",
        days: "10 дней",
        location: "Таиланд",
        title: "Чилловый Тайланд",
        description: "Ходила по храмам, купалась в море и грелась на солнце без экскурсий в 7 утра",
        avatarSrc: "/img/main/ksushzm.png",
        userName: "ksushzm",
        initialLikes: 210,
    },
];

function CheckPlanCard({
    imageSrc,
    imageAlt,
    days,
    location,
    title,
    description,
    avatarSrc,
    userName,
    initialLikes,
    isAuthenticated,
    onRequestLogin,
}) {
    const [liked, setLiked] = useState(false);
    const likes = initialLikes + (liked ? 1 : 0);

    const handleLikeClick = () => {
        if (!isAuthenticated) {
            onRequestLogin?.();
            return;
        }
        setLiked((prev) => !prev);
    };

    return (
        <article className={styles.card}>
            <div className={styles.tags}>
                <span className={styles.tag}>
                    <Image
                        src="/icons/images/Calender.svg"
                        alt=""
                        width={20}
                        height={20}
                        className={styles.tagIcon}
                    />
                    {days}
                </span>
                <span className={styles.tag}>
                    <Image
                        src="/icons/images/Location.svg"
                        alt=""
                        width={20}
                        height={20}
                        className={styles.tagIcon}
                    />
                    {location}
                </span>
            </div>
            <div className={styles.cardImageWrapper}>
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
            <div className={styles.cardFooter}>
                <div className={styles.userRow}>
                    <Image
                        src={avatarSrc}
                        alt={userName}
                        width={32}
                        height={32}
                        className={styles.userAvatar}
                    />
                    <span className={`${styles.userName} subinfo`}>{userName}</span>
                </div>
                <button
                    type="button"
                    className={styles.likesRow}
                    onClick={handleLikeClick}
                    aria-pressed={liked}
                >
                    <Image
                        src={liked ? "/icons/images/HeartFull.svg" : "/icons/images/Heart.svg"}
                        alt=""
                        width={20}
                        height={20}
                        className={styles.likesIcon}
                    />
                    <span className={styles.likesCount}>{likes}</span>
                </button>
            </div>
        </article>
    );
}

/* Трек с дубликатом для бесконечного цикла */
const trackCards = [...COMMUNITY_CARDS, ...COMMUNITY_CARDS];
const totalPositions = COMMUNITY_CARDS.length + 1;

const SWIPE_MIN_PX = 50;
const MOBILE_BREAKPOINT = 1200;

export default function OurCommunity() {
    const router = useRouter();
    const isAuthenticated = typeof getAuth()?.user?.id !== "undefined";
    const [showLoginToLikePopup, setShowLoginToLikePopup] = useState(false);
    const [loginToLikeClosing, setLoginToLikeClosing] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [transitionTo, setTransitionTo] = useState(null);
    const [entered, setEntered] = useState(false);
    const [skipTransition, setSkipTransition] = useState(false);
    const isJumpingRef = useRef(false);
    const touchStartX = useRef(null);

    const closeLoginToLikePopup = () => {
        setLoginToLikeClosing(true);
        setTimeout(() => {
            setShowLoginToLikePopup(false);
            setLoginToLikeClosing(false);
        }, 280);
    };

    const handleLoginFromPopup = () => {
        setLoginToLikeClosing(true);
        setTimeout(() => {
            setShowLoginToLikePopup(false);
            setLoginToLikeClosing(false);
            router.push("/login");
        }, 280);
    };

    const fromIndex = carouselIndex;
    const toIndex = transitionTo;
    const isTransitioning = toIndex !== null;

    const isMobileView = () => typeof window !== "undefined" && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

    useEffect(() => {
        if (!isTransitioning) return;
        const raf = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(raf);
    }, [isTransitioning]);

    useEffect(() => {
        if (!skipTransition) return;
        const id = requestAnimationFrame(() => {
            setSkipTransition(false);
            if (isJumpingRef.current) {
                isJumpingRef.current = false;
                setTransitionTo(totalPositions - 2);
            }
        });
        return () => cancelAnimationFrame(id);
    }, [skipTransition]);

    const handleTransitionEnd = (e) => {
        if (e.propertyName !== "transform" || toIndex === null) return;
        const resetToStart = toIndex === totalPositions - 1;
        if (resetToStart) setSkipTransition(true);
        setCarouselIndex(resetToStart ? 0 : toIndex);
        setTransitionTo(null);
        setEntered(false);
    };

    const goPrev = () => {
        if (isTransitioning) return;
        if (carouselIndex > 0) {
            setTransitionTo(carouselIndex - 1);
            return;
        }
        setSkipTransition(true);
        setCarouselIndex(totalPositions - 1);
        isJumpingRef.current = true;
    };
    const goNext = () => {
        if (isTransitioning || carouselIndex >= totalPositions - 1) return;
        setTransitionTo(carouselIndex + 1);
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

    const getCardTransform = (i) => {
        if (!isTransitioning) {
            return `translateX(${(i - carouselIndex) * 100}%)`;
        }
        const from = fromIndex;
        const to = toIndex;
        if (i === from) {
            return entered ? `translateX(${from < to ? -100 : 100}%)` : "translateX(0)";
        }
        if (i === to) {
            return entered ? "translateX(0)" : `translateX(${to > from ? 100 : -100}%)`;
        }
        return `translateX(${(i - carouselIndex) * 100}%)`;
    };

    const getCardZIndex = (i) => {
        if (!isTransitioning) return i === carouselIndex ? 1 : 0;
        if (i === toIndex) return 2;
        if (i === fromIndex) return 1;
        return 0;
    };

    return (
        <div className={styles.outerWrapper}>
            <section className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.leftTop}>
                        <h2 className={`${styles.title} title_1`}>
                            Откройте для себя наше сообщество
                        </h2>
                    </div>
                    <div className={styles.leftBottom}>
                        <p className={`${styles.description} paragraph`}>
                            Нам нравится делиться опытом с друг другом, опубликуйте свой следующий
                            чек-план, возможно, он кому-то пригодится
                        </p>
                        <div className={styles.buttonWrapper}>
                            <Button
                                color="blue"
                                Text="Смотреть, чем поделились другие"
                                onClick={() => router.push("/check-plans")}
                            />
                        </div>
                    </div>
                </div>

                {/* Десктоп: две карточки рядом */}
                <div className={styles.right}>
                    {COMMUNITY_CARDS.map((card) => (
                        <CheckPlanCard
                            key={card.title}
                            {...card}
                            isAuthenticated={isAuthenticated}
                            onRequestLogin={() => setShowLoginToLikePopup(true)}
                        />
                    ))}
                </div>

                {/* Мобильный (<1200px): стек карточек, новая наезжает поверх текущей */}
                <div className={styles.rightMobile}>
                    <div
                        className={styles.cardsSlider}
                        onTouchStart={handleSwipeStart}
                        onTouchEnd={handleSwipeEnd}
                        role="region"
                        aria-label="Карусель карточек сообщества"
                    >
                        <div
                            className={`${styles.cardsStack} ${skipTransition ? styles.cardsStackNoTransition : ""}`}
                        >
                            {trackCards.map((card, i) => (
                                <div
                                    key={`${card.title}-${i}`}
                                    className={styles.cardSlide}
                                    style={{
                                        transform: getCardTransform(i),
                                        zIndex: getCardZIndex(i),
                                    }}
                                    onTransitionEnd={
                                        isTransitioning && i === toIndex
                                            ? handleTransitionEnd
                                            : undefined
                                    }
                                >
                                    <CheckPlanCard
                                        {...card}
                                        isAuthenticated={isAuthenticated}
                                        onRequestLogin={() => setShowLoginToLikePopup(true)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.carouselNav}>
                        <RoundButton
                            variant="white"
                            icon={<Image src="/icons/system/ArrowLeft.svg" alt="" width={20} height={20} />}
                            onClick={goPrev}
                            aria-label="Предыдущая карточка"
                            disabled={isTransitioning}
                        />
                        <RoundButton
                            variant="white"
                            icon={<Image src="/icons/system/ArrowRight.svg" alt="" width={20} height={20} />}
                            onClick={goNext}
                            aria-label="Следующая карточка"
                            disabled={isTransitioning}
                        />
                    </div>
                </div>
            </section>
            {typeof document !== "undefined" &&
                showLoginToLikePopup &&
                createPortal(
                    <LoginToLikePopup
                        isClosing={loginToLikeClosing}
                        onClose={closeLoginToLikePopup}
                        onLogin={handleLoginFromPopup}
                    />,
                    document.body
                )}
        </div>
    );
}
