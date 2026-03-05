"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { useLikedChecklists } from "@/app/lib/liked-checklists-context";
import styles from "./check-plans.module.css";

const SLIDER_BREAKPOINT = 1024;
const SLIDER_MAX_WIDTH = 950; /* совпадает с CSS: слайдер виден при max-width: 950px */
const SWIPE_MIN_PX = 50;

/** Аватар по умолчанию, если бэкенд не вернул avatarSrc */
const DEFAULT_AVATAR = "/img/main/setlypic.png?v=2";

function formatLikes(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function PlanCard({ id: cardId, imageSrc, imageAlt, days, location, title, description, userName, avatarSrc = DEFAULT_AVATAR, initialLikes = 0, filterTag, isAuthenticated, onRequestLogin }) {
  const { isLiked, toggle, getLikeCount } = useLikedChecklists();
  const liked = isLiked(cardId);
  const likes = getLikeCount(cardId);
  const previewHref = `/preview-checkplan/${encodeURIComponent(String(cardId))}`;

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      onRequestLogin?.();
      return;
    }
    toggle(cardId);
  };

  const cardContent = (
    <>
      <div className={styles.tags}>
        <span className={styles.tag}>
          <Image src="/icons/images/Calender.svg" alt="" width={20} height={20} className={styles.tagIcon} />
          {days}
        </span>
        <span className={styles.tag}>
          <Image src="/icons/images/Location.svg" alt="" width={20} height={20} className={styles.tagIcon} />
          {location}
        </span>
      </div>
      <div className={styles.cardImageWrapper}>
        <Image
          src={imageSrc}
          alt={imageAlt || title || ""}
          width={264}
          height={264}
          className={styles.cardImage}
          unoptimized={typeof imageSrc === "string" && imageSrc.startsWith("http")}
        />
      </div>
      <h3 className={`${styles.cardTitle} subtitle_1`}>{title}</h3>
      <p className={`${styles.cardDescription} subinfo`}>{description}</p>
      <div className={styles.cardFooter}>
        <div className={styles.userRow}>
          <Image src={avatarSrc} alt={userName} width={24} height={24} className={styles.userAvatar} />
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
          <span className={styles.likesCount}>{formatLikes(likes)}</span>
        </button>
      </div>
    </>
  );

  return (
    <article className={styles.card} data-filter-tag={filterTag ?? undefined}>
      <Link href={previewHref} className={styles.cardLink} aria-label={`Просмотр: ${title}`}>
        {cardContent}
      </Link>
    </article>
  );
}

/* Трек с дубликатом первой карточки для бесшовного цикла (режим 1 карточка) */
function getTrackCards(cards) {
  return [...cards, cards[0]];
}

/* Трек с двумя дубликатами в конце для бесконечной анимации (режим 2 карточки) */
function getTrackCardsTwo(cards) {
  if (cards.length === 0) return [];
  if (cards.length === 1) return [...cards, cards[0]];
  return [...cards, cards[0], cards[1]];
}

function BlockSection({ block, onAddFilterTag, isAuthenticated, onRequestLogin }) {
  const cards = block.cards;
  const trackCards = getTrackCards(cards);
  const trackCardsTwo = getTrackCardsTwo(cards);
  const totalPositions = cards.length + 1;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [transitionTo, setTransitionTo] = useState(null);
  const [entered, setEntered] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [stepPx, setStepPx] = useState(0);
  const [slideWidthPx, setSlideWidthPx] = useState(0);
  const isJumpingRef = useRef(false);
  const pendingPrevFromZeroRef = useRef(false);
  const touchStartX = useRef(null);
  const sliderRef = useRef(null);
  const sliderWrapperRef = useRef(null);

  /* В слайдере при ширине >= TWO_CARDS_MIN_WIDTH показываем 2 карточки, иначе 1 */
  const TWO_CARDS_MIN_WIDTH = 580; /* 280*2 + 20: если меньше — показываем одну карточку */
  useEffect(() => {
    const mqSlider = window.matchMedia(`(max-width: ${SLIDER_MAX_WIDTH}px)`);
    const update = () => {
      if (!mqSlider.matches) {
        setSlidesPerView(1);
        return;
      }
      const w = typeof window !== "undefined" ? window.innerWidth : 0;
      setSlidesPerView(w >= TWO_CARDS_MIN_WIDTH ? 2 : 1);
    };
    update();
    mqSlider.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mqSlider.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Шаг карусели в режиме 2 карточек: ширина одного слайда (карточки) + гэп 20px.
   * Измеряем по обёртке, видимую область слайдера ограничиваем ровно 2 карточками. */
  const CARD_MAX_WIDTH = 335;
  useEffect(() => {
    if (slidesPerView !== 2 || !sliderWrapperRef.current) return;
    const el = sliderWrapperRef.current;
    const update = () => {
      const w = el.offsetWidth;
      const slideWidthPx = Math.min(CARD_MAX_WIDTH, Math.max(280, (w - 20) / 2));
      setStepPx(slideWidthPx + 20);
      setSlideWidthPx(slideWidthPx);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [slidesPerView]);

  const fromIndex = carouselIndex;
  const toIndex = transitionTo;
  const isTransitioning = toIndex !== null;

  const isSliderView = () =>
    typeof window !== "undefined" && window.matchMedia(`(max-width: ${SLIDER_BREAKPOINT - 1}px)`).matches;

  useEffect(() => {
    if (!isTransitioning) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [isTransitioning]);

  useEffect(() => {
    if (!skipTransition) return;
    const id = requestAnimationFrame(() => {
      setSkipTransition(false);
      if (slidesPerView === 2) {
        if (pendingPrevFromZeroRef.current) {
          pendingPrevFromZeroRef.current = false;
          setCarouselIndex(cards.length - 1);
        }
        return;
      }
      if (isJumpingRef.current) {
        isJumpingRef.current = false;
        setTransitionTo(totalPositions - 2);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [skipTransition, totalPositions, slidesPerView, cards.length]);

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
    if (slidesPerView === 2) {
      if (carouselIndex > 0) {
        setCarouselIndex(carouselIndex - 1);
      } else {
        /* Мгновенно в конец трека (дубликаты), затем анимация назад на [последняя, первая] */
        setSkipTransition(true);
        setCarouselIndex(cards.length);
        pendingPrevFromZeroRef.current = true;
      }
      return;
    }
    if (carouselIndex > 0) {
      setTransitionTo(carouselIndex - 1);
      return;
    }
    setSkipTransition(true);
    setCarouselIndex(totalPositions - 1);
    isJumpingRef.current = true;
  };

  const goNext = () => {
    if (isTransitioning) return;
    if (slidesPerView === 2) {
      if (carouselIndex < cards.length) {
        setCarouselIndex(carouselIndex + 1);
      } else {
        /* carouselIndex === cards.length не должно достигаться через goNext без анимации */
        setSkipTransition(true);
        setCarouselIndex(0);
      }
      return;
    }
    if (carouselIndex >= totalPositions - 1) return;
    setTransitionTo(carouselIndex + 1);
  };

  /* После анимации вперёд на позицию cards.length сбрасываем в 0 без перерисовки */
  const handleStackTwoTransitionEnd = () => {
    if (carouselIndex === cards.length) {
      setSkipTransition(true);
      setCarouselIndex(0);
    }
  };

  const handleSwipeStart = (e) => {
    if (!isSliderView()) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSwipeEnd = (e) => {
    if (!isSliderView() || touchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX < -SWIPE_MIN_PX) goNext();
    else if (deltaX > SWIPE_MIN_PX) goPrev();
  };

  const getCardTransform = (i) => {
    if (slidesPerView === 2) return undefined; /* в режиме 2 карточек трансформ на стеке */
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
    if (slidesPerView === 2) return 0;
    if (!isTransitioning) return i === carouselIndex ? 1 : 0;
    if (i === toIndex) return 2;
    if (i === fromIndex) return 1;
    return 0;
  };

  return (
    <section className={styles.block}>
      <div className={styles.titleRow}>
        <h2 className={`${styles.title} title_1`}>{block.title}</h2>
        <RoundButton
          variant="white"
          icon={<Image src="/icons/system/ArrowRight.svg" alt="" width={20} height={20} />}
          onClick={() => onAddFilterTag?.(block.filterTag)}
          aria-label={`Применить фильтр: ${block.filterTag}`}
        />
      </div>
      <p className={`${styles.description} paragraph`}>{block.description}</p>

      {/* Десктоп (≥1024px): сетка из 3 карточек */}
      <div className={styles.cards}>
        {cards.map((card, i) => (
          <PlanCard key={`${block.id}-${i}`} id={card.id} {...card} avatarSrc={card.avatarSrc || DEFAULT_AVATAR} filterTag={block.filterTag} isAuthenticated={isAuthenticated} onRequestLogin={onRequestLogin} />
        ))}
      </div>

      {/* Слайдер (<950px): карусель с переключением; при ширине ≥620px — 2 карточки в ряд */}
      <div
        ref={sliderWrapperRef}
        className={`${styles.cardsSliderWrapper} ${slidesPerView === 2 ? styles.cardsSliderWrapperTwoPerView : ""}`}
      >
        <div
          ref={sliderRef}
          className={styles.cardsSlider}
          style={
            slidesPerView === 2 && slideWidthPx > 0
              ? { width: `${2 * slideWidthPx + 20}px`, maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }
              : undefined
          }
          onTouchStart={handleSwipeStart}
          onTouchEnd={handleSwipeEnd}
          role="region"
          aria-label={`Карусель: ${block.title}`}
        >
          {slidesPerView === 2 ? (
            <div
              className={`${styles.cardsStackTwo} ${skipTransition ? styles.cardsStackTwoNoTransition : ""}`}
              style={{
                transform: stepPx > 0 ? `translateX(-${carouselIndex * stepPx}px)` : undefined,
              }}
              onTransitionEnd={handleStackTwoTransitionEnd}
            >
              {trackCardsTwo.map((card, i) => (
                <div
                  key={`${block.id}-slide-${i}`}
                  className={styles.cardSlideTwo}
                  style={
                    slideWidthPx > 0
                      ? { width: `${slideWidthPx}px`, minWidth: `${slideWidthPx}px` }
                      : undefined
                  }
                >
                  <PlanCard id={card.id} {...card} avatarSrc={card.avatarSrc || DEFAULT_AVATAR} filterTag={block.filterTag} isAuthenticated={isAuthenticated} onRequestLogin={onRequestLogin} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`${styles.cardsStack} ${skipTransition ? styles.cardsStackNoTransition : ""}`}
            >
              {trackCards.map((card, i) => (
                <div
                  key={`${block.id}-slide-${i}`}
                  className={styles.cardSlide}
                  style={{
                    transform: getCardTransform(i),
                    zIndex: getCardZIndex(i),
                  }}
                  onTransitionEnd={
                    isTransitioning && i === toIndex ? handleTransitionEnd : undefined
                  }
                >
                  <PlanCard id={card.id} {...card} avatarSrc={card.avatarSrc || DEFAULT_AVATAR} filterTag={block.filterTag} isAuthenticated={isAuthenticated} onRequestLogin={onRequestLogin} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.carouselNav}>
          <RoundButton
            variant="white"
            icon={<Image src="/icons/system/ArrowLeft.svg" alt="" width={20} height={20} />}
            onClick={goPrev}
            aria-label="Предыдущая карточка"
            disabled={slidesPerView === 2 ? false : isTransitioning}
          />
          <RoundButton
            variant="white"
            icon={<Image src="/icons/system/ArrowRight.svg" alt="" width={20} height={20} />}
            onClick={goNext}
            aria-label="Следующая карточка"
            disabled={slidesPerView === 2 ? false : isTransitioning}
          />
        </div>
      </div>
    </section>
  );
}

export default function UnfilteredPlans({ blocks = [], onAddFilterTag, isAuthenticated, onRequestLogin }) {
  return (
    <div className={styles.container}>
      {blocks.map((block) => (
        <BlockSection key={block.id} block={block} onAddFilterTag={onAddFilterTag} isAuthenticated={isAuthenticated} onRequestLogin={onRequestLogin} />
      ))}
    </div>
  );
}

/** Сетка карточек, отфильтрованных по тегам (для выбранных фильтров) */
export function FilteredPlans({ plans, isAuthenticated, onRequestLogin }) {
  if (!plans || plans.length === 0) return null;
  return (
    <div className={styles.filteredContainer}>
      <div className={styles.cards}>
        {plans.map((card, i) => (
          <PlanCard
            key={`${card.blockId ?? "card"}-${i}-${card.title ?? i}`}
            id={card.id}
            {...card}
            avatarSrc={card.avatarSrc || DEFAULT_AVATAR}
            filterTag={card.filterTag}
            isAuthenticated={isAuthenticated}
            onRequestLogin={onRequestLogin}
          />
        ))}
      </div>
    </div>
  );
}
