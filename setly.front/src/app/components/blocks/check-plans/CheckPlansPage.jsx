"use client";

import { useState, useMemo, useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Header } from "../../globals/header/Header";
import { Footer } from "../../globals/footer/Footer";
import planStyles from "./plans/check-plans/check-plans.module.css";
import { PlanCardSkeleton } from "@/app/components/atomic/molecules/plan-card-skeleton/plan-card-skeleton";
import { useLikedChecklists } from "@/app/lib/liked-checklists-context";
import { parseAppliedFilters } from "./utils/parseFilterTags";
import { apiFetch } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import { mapFlatCheckPlanCardFromApi, sortCheckPlansByIndex } from "@/app/lib/checkplan-list-utils";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import ErrorStateSection from "@/app/components/globals/error-state/error-state-section";

const Search = dynamic(() => import("./search/search").then((m) => m.default), {
	ssr: false,
	loading: () => <div style={{ minHeight: 48 }} aria-busy="true" aria-label="Загрузка поиска" />,
});
const Filters = dynamic(() => import("./filters/filters").then((m) => m.default), {
	ssr: false,
	loading: () => <div style={{ minHeight: 80 }} aria-busy="true" aria-label="Загрузка фильтров" />,
});
const UnfilteredPlans = dynamic(
	() => import("./plans/check-plans/check-plans").then((m) => m.default),
	{
		ssr: false,
		loading: () => (
			<div className={`${planStyles.filteredContainer} ${planStyles.filteredContainerLoading}`} aria-busy="true">
				<div className={planStyles.cards}>
					{[1, 2, 3].map((i) => (
						<PlanCardSkeleton key={i} />
					))}
				</div>
			</div>
		),
	}
);
const FilteredPlans = dynamic(
	() => import("./plans/check-plans/check-plans").then((m) => m.FilteredPlans),
	{
		ssr: false,
		loading: () => (
			<div className={`${planStyles.filteredContainer} ${planStyles.filteredContainerLoading}`} aria-busy="true">
				<div className={planStyles.cards}>
					{[1, 2, 3].map((i) => (
						<PlanCardSkeleton key={i} />
					))}
				</div>
			</div>
		),
	}
);
const NotFound = dynamic(() => import("./plans/notFound/notFound").then((m) => m.default), {
	ssr: false,
	loading: () => <div style={{ minHeight: 220 }} aria-busy="true" aria-label="Загрузка результатов" />,
});

/** Попап «Войдите, чтобы поставить Лайк» + кнопка «Войти» */
const LoginToLikePopup = memo(function LoginToLikePopup({ isClosing, onClose, onLogin }) {
	return (
		<div
			className={`${planStyles.loginToLikeOverlay} ${isClosing ? planStyles.loginToLikeOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="check-plans-login-to-like-title"
		>
			<div
				className={`${planStyles.loginToLikePopup} ${isClosing ? planStyles.loginToLikePopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="check-plans-login-to-like-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Войдите, чтобы поставить Лайк
				</h2>
				<div className={planStyles.loginToLikeButtons}>
					<Button Text="Войти" color="blue" type="button" onClick={onLogin} />
				</div>
			</div>
		</div>
	);
});

/** Нормализует строку для поиска: нижний регистр, лишние пробелы убраны. */
function normalizeForSearch(s) {
    if (s == null || typeof s !== "string") return "";
    return s.toLowerCase().trim().replace(/\s+/g, " ");
}

/** Собирает из карточки одну строку для поиска: заголовок, описание, теги (filterTag, regionTag, location, travelerTags, seasonTags). */
function getSearchableText(card) {
    const parts = [
        card.title,
        card.description,
        card.filterTag,
        card.regionTag,
        card.location,
        ...(Array.isArray(card.travelerTags) ? card.travelerTags : []),
        ...(Array.isArray(card.seasonTags) ? card.seasonTags : []),
    ].filter(Boolean);
    return normalizeForSearch(parts.join(" "));
}

/**
 * Фильтрует карточки по поисковому запросу: хотя бы одно слово запроса
 * встречается в заголовке, описании или тегах (без учёта регистра).
 */
function filterCardsBySearch(cards, query) {
    const q = normalizeForSearch(query);
    if (!q) return cards;
    const words = q.split(" ").filter(Boolean);
    if (words.length === 0) return cards;
    return cards.filter((card) => {
        const text = getSearchableText(card);
        return words.some((word) => text.includes(word));
    });
}

export function CheckPlansPage() {
    const router = useRouter();
    const isAuthenticated = typeof getAuth()?.user?.id !== "undefined";
    const [showLoginToLikePopup, setShowLoginToLikePopup] = useState(false);
    const [loginToLikeClosing, setLoginToLikeClosing] = useState(false);
    const [appliedFilterTags, setAppliedFilterTags] = useState([]);
    const [sortIndex, setSortIndex] = useState(1); // 1 = "По новизне" по умолчанию
    const [searchQuery, setSearchQuery] = useState("");
    const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
    const [blocks, setBlocks] = useState([]);
    const [flatCards, setFlatCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getLikeCount, setInitialLikeCounts } = useLikedChecklists();

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

    useEffect(() => {
        let cancelled = false;
        async function fetchCheckPlans() {
            try {
                const res = await apiFetch("/api/check-plans");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (cancelled) return;
                const cards = (data.flatCards || []).map(mapFlatCheckPlanCardFromApi);
                setFlatCards(cards);
                setInitialLikeCounts(Object.fromEntries((data.flatCards || []).map((c) => [c.id, c.initialLikes ?? 0])));
                setBlocks(
                    (data.blocks || []).map((block) => ({
                        ...block,
                        cards: (block.cards || []).map(mapFlatCheckPlanCardFromApi),
                    }))
                );
            } catch (e) {
                if (!cancelled) setError(e.message || "Ошибка загрузки");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchCheckPlans();
        return () => { cancelled = true; };
    }, [setInitialLikeCounts]);

    const allCardsWithTags = flatCards;

    const sortedAllCards = useMemo(
        () => sortCheckPlansByIndex(allCardsWithTags, sortIndex, getLikeCount),
        [allCardsWithTags, sortIndex, getLikeCount]
    );

    const sortedBlocks = useMemo(
        () =>
            blocks.map((block) => ({
                ...block,
                cards: sortedAllCards.filter((c) => c.filterTag === block.filterTag),
            })),
        [blocks, sortedAllCards]
    );

    const filteredPlans = useMemo(() => {
        if (appliedFilterTags.length === 0) return [];
        const { categories, regions, travelers, seasons, duration } = parseAppliedFilters(appliedFilterTags);

        return allCardsWithTags.filter((card) => {
            if (categories.length > 0 && !categories.includes(card.filterTag)) return false;
            if (regions.length > 0 && (!card.regionTag || !regions.includes(card.regionTag))) return false;
            if (travelers.length > 0) {
                const cardTravelers = card.travelerTags ?? [];
                if (!cardTravelers.some((t) => travelers.includes(t))) return false;
            }
            if (seasons.length > 0) {
                const cardSeasons = card.seasonTags ?? [];
                if (!cardSeasons.some((s) => seasons.includes(s))) return false;
            }
            if (duration) {
                const cardDays = card.daysNum ?? 0;
                const { minDays, maxDays } = duration;
                if (minDays === 30 && maxDays === 30) {
                    if (cardDays < 30) return false;
                } else if (cardDays < minDays || cardDays > maxDays) {
                    return false;
                }
            }
            return true;
        });
    }, [appliedFilterTags, allCardsWithTags]);

    const hasActiveFilters = appliedFilterTags.length > 0;
    const baseForSearch = hasActiveFilters ? filteredPlans : sortedAllCards;
    const searchFilteredPlans = useMemo(
        () => filterCardsBySearch(baseForSearch, appliedSearchQuery),
        [baseForSearch, appliedSearchQuery]
    );

    const sortedFilteredPlans = useMemo(
        () => sortCheckPlansByIndex(filteredPlans, sortIndex, getLikeCount),
        [filteredPlans, sortIndex, getLikeCount]
    );

    const sortedSearchFilteredPlans = useMemo(
        () => sortCheckPlansByIndex(searchFilteredPlans, sortIndex, getLikeCount),
        [searchFilteredPlans, sortIndex, getLikeCount]
    );

    const hasNoMatchingCards = sortedFilteredPlans.length === 0;
    const showNotFound = hasActiveFilters && hasNoMatchingCards;
    const hasSearchQuery = appliedSearchQuery.length > 0;
    const showSearchNotFound = hasSearchQuery && sortedSearchFilteredPlans.length === 0;

    if (loading) {
        return (
            <>
                <Header />
                <main>
                    <div className="main-page-reveal__item" style={{ "--reveal-delay": "50ms", position: "relative", zIndex: 20 }}>
                        <Search
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSearchSubmit={() => setAppliedSearchQuery(searchQuery.trim())}
                        />
                    </div>
                    <div className="main-page-reveal__item" style={{ "--reveal-delay": "80ms", position: "relative", zIndex: 30 }}>
                        <Filters
                            appliedFilterTags={appliedFilterTags}
                            onApplyFilters={setAppliedFilterTags}
                            onRemoveAppliedTag={(index) =>
                                setAppliedFilterTags((prev) => prev.filter((_, i) => i !== index))
                            }
                            sortIndex={sortIndex}
                            onSortSelect={setSortIndex}
                        />
                    </div>
                    <div className={`${planStyles.filteredContainer} ${planStyles.filteredContainerLoading} main-page-reveal__item`} style={{ "--reveal-delay": "120ms", position: "relative", zIndex: 1 }} aria-busy="true" aria-label="Загрузка чек-планов">
                        <div className={planStyles.cards}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <PlanCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </main>
                <div className="main-page-reveal__item" style={{ "--reveal-delay": "170ms" }}>
                    <Footer />
                </div>
            </>
        );
    }
    if (error) {
        return (
            <>
                <Header />
                <div className="container main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
                    <ErrorStateSection
                        title="Не удалось загрузить каталог"
                        description={error}
                        buttonText="Обновить страницу"
                        onButtonClick={() => {
                            if (typeof window !== "undefined") window.location.reload();
                        }}
                        titleId="check-plans-catalog-error-title"
                    />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main>
                <div className="main-page-reveal__item" style={{ "--reveal-delay": "50ms", position: "relative", zIndex: 20 }}>
                    <Search
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onSearchSubmit={() => setAppliedSearchQuery(searchQuery.trim())}
                    />
                </div>
                <div className="main-page-reveal__item" style={{ "--reveal-delay": "80ms", position: "relative", zIndex: 30 }}>
                    <Filters
                        appliedFilterTags={appliedFilterTags}
                        onApplyFilters={setAppliedFilterTags}
                        onRemoveAppliedTag={(index) =>
                            setAppliedFilterTags((prev) => prev.filter((_, i) => i !== index))
                        }
                        sortIndex={sortIndex}
                        onSortSelect={setSortIndex}
                    />
                </div>
                <div className="main-page-reveal__item" style={{ "--reveal-delay": "120ms", position: "relative", zIndex: 1 }}>
                    {!hasActiveFilters && !hasSearchQuery && (
                        <UnfilteredPlans
                            blocks={sortedBlocks}
                            onAddFilterTag={(tag) =>
                                setAppliedFilterTags((prev) =>
                                    prev.includes(tag) ? prev : [...prev, tag]
                                )
                            }
                            isAuthenticated={isAuthenticated}
                            onRequestLogin={() => setShowLoginToLikePopup(true)}
                        />
                    )}
                    {hasSearchQuery && !showSearchNotFound && (
                        <FilteredPlans
                            plans={sortedSearchFilteredPlans}
                            isAuthenticated={isAuthenticated}
                            onRequestLogin={() => setShowLoginToLikePopup(true)}
                        />
                    )}
                    {hasSearchQuery && showSearchNotFound && <NotFound />}
                    {!hasSearchQuery && hasActiveFilters && !showNotFound && (
                        <FilteredPlans
                            plans={sortedFilteredPlans}
                            isAuthenticated={isAuthenticated}
                            onRequestLogin={() => setShowLoginToLikePopup(true)}
                        />
                    )}
                    {!hasSearchQuery && showNotFound && <NotFound />}
                </div>
            </main>
            <div className="main-page-reveal__item" style={{ "--reveal-delay": "170ms" }}>
                <Footer />
            </div>
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
        </>
    );
}
