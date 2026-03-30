"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { PlanCard } from "@/app/components/blocks/check-plans/plans/check-plans/check-plans";
import { PlanCardSkeleton } from "@/app/components/atomic/molecules/plan-card-skeleton/plan-card-skeleton";
import { getApiUrl } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import { useLikedChecklists } from "@/app/lib/liked-checklists-context";
import experienceStyles from "@/app/components/blocks/main/our-experience/our-experience.module.css";

const CARD_GAP_PX = 20;
const MIN_CARD_WIDTH_PX = 280;
const MAX_CARD_WIDTH_PX = 335;

/** Нормализует URL картинки (как на странице чек-планов). */
function resolveImageSrc(imageSrc) {
  if (imageSrc == null || typeof imageSrc !== "string") return imageSrc;
  const cleaned = imageSrc.trim().replace(/,+$/, "").trim();
  if (!cleaned) return cleaned;
  const base = getApiUrl();
  if (cleaned.startsWith("/storage") && base) return base + cleaned;
  return cleaned;
}

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

const SWIPE_MIN_PX = 50;
const MOBILE_BREAKPOINT = 2561;
const POPULAR_COUNT = 6;

/**
 * Карусель из 6 самых популярных чек-планов (как «Делимся личным опытом»).
 * @param {{ excludeIdStr?: string | null }} props — не показывать этот план в подборке (текущий предпросмотр).
 */
export default function PopularCheckplansCarousel({ excludeIdStr = null }) {
  const router = useRouter();
  const { setInitialLikeCounts } = useLikedChecklists();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = typeof getAuth()?.user?.id !== "undefined";

  useEffect(() => {
    let cancelled = false;
    const base = getApiUrl();
    const url = base ? `${base}/api/check-plans` : "/api/check-plans";
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.flatCards?.length) {
          if (!cancelled) setCards([]);
          return;
        }
        const normalized = data.flatCards.map((c) => ({
          ...c,
          imageSrc: resolveImageSrc(c.imageSrc),
          avatarSrc: resolveImageSrc(c.avatarSrc) || c.avatarSrc,
        }));
        const pool = excludeIdStr
          ? normalized.filter((c) => String(c.id) !== String(excludeIdStr))
          : normalized;
        const sorted = [...pool].sort(
          (a, b) => (b.initialLikes ?? 0) - (a.initialLikes ?? 0),
        );
        const top = sorted.slice(0, POPULAR_COUNT);
        setCards(top);
        setInitialLikeCounts(
          Object.fromEntries(
            data.flatCards.map((c) => [c.id, c.initialLikes ?? 0]),
          ),
        );
      })
      .catch(() => {
        if (!cancelled) setCards([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [setInitialLikeCounts, excludeIdStr]);

  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(1164);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const isJumpingRef = useRef(false);
  const touchStartX = useRef(null);

  const trackCards = useMemo(
    () => (cards.length ? [...cards, ...cards] : []),
    [cards],
  );
  const totalPositions = cards.length + 1;

  const layout = useMemo(
    () => computeCarouselLayout(viewportWidth),
    [viewportWidth],
  );
  const { cardWidth: cardWidthPx, centerOffset } = layout;
  const stepPx = cardWidthPx + CARD_GAP_PX;
  const trackLen = trackCards.length;
  const trackWidthPx =
    trackLen * cardWidthPx + (trackLen > 0 ? trackLen - 1 : 0) * CARD_GAP_PX;

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
  }, [viewportWidth, cards.length]);

  const isMobileView = () =>
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

  const goNext = () => {
    if (
      isTransitioning ||
      stepPx <= 0 ||
      cardWidthPx <= 0 ||
      totalPositions <= 1
    )
      return;
    setIsTransitioning(true);
    setCarouselIndex((prev) =>
      prev < totalPositions - 1 ? prev + 1 : prev,
    );
  };

  const goPrev = () => {
    if (
      isTransitioning ||
      stepPx <= 0 ||
      cardWidthPx <= 0 ||
      totalPositions <= 1
    )
      return;
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
  }, [skipTransition, totalPositions]);

  const translateX = centerOffset - carouselIndex * stepPx;

  if (!loading && cards.length === 0) {
    return null;
  }

  return (
    <section className={experienceStyles.wrapper}>
      <h2 className={`${experienceStyles.title} title_1`}>Смотри далее</h2>

      <div className={experienceStyles.carouselBlock}>
        <div className={experienceStyles.carouselNav}>
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
            disabled={loading || isTransitioning}
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
            disabled={loading || isTransitioning}
          />
        </div>

        <div
          className={experienceStyles.cardsSlider}
          onTouchStart={handleSwipeStart}
          onTouchEnd={handleSwipeEnd}
          role="region"
          aria-label="Карусель популярных чек-планов"
        >
          <div
            className={experienceStyles.cardsSliderViewport}
            ref={viewportRef}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  gap: CARD_GAP_PX,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ width: 280, flex: "0 0 280px" }}>
                  <PlanCardSkeleton />
                </div>
                <div style={{ width: 280, flex: "0 0 280px" }}>
                  <PlanCardSkeleton />
                </div>
                <div style={{ width: 280, flex: "0 0 280px" }}>
                  <PlanCardSkeleton />
                </div>
              </div>
            ) : (
              <div
                className={`${experienceStyles.cardsTrack} ${skipTransition ? experienceStyles.cardsTrackNoTransition : ""}`}
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
                    className={experienceStyles.cardSlide}
                    style={{
                      width: cardWidthPx,
                      flex: `0 0 ${cardWidthPx}px`,
                    }}
                  >
                    <PlanCard
                      id={card.id}
                      imageSrc={card.imageSrc}
                      imageAlt={card.imageAlt}
                      days={card.days}
                      location={card.location}
                      title={card.title}
                      description={card.description}
                      userName={card.userName}
                      avatarSrc={card.avatarSrc}
                      initialLikes={card.initialLikes ?? 0}
                      filterTag={card.filterTag}
                      isAuthenticated={isAuthenticated}
                      onRequestLogin={() => router.push("/login")}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
