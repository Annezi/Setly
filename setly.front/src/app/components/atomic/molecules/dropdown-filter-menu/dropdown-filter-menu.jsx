"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import PublicImage from "@/app/components/globals/public-image";
import styles from "./dropdown-filter-menu.module.css";
import FilterTag from "@/app/components/atomic/atoms/filter-tag/filter-tag";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import Toggler from "@/app/components/atomic/atoms/toggler/toggler";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { CHECK_PLANS_SORT_ITEMS } from "@/app/lib/checkplan-list-utils";

const DURATION_MAX_INDEX = 29; // 0..29 => 1..30+

const DEFAULT_DURATION_MIN = 6;
const DEFAULT_DURATION_MAX = 13;

function formatDuration(index) {
    if (index === DURATION_MAX_INDEX) return "30+";
    return String(index + 1);
}

/** Склонение для одного значения: 1 день, 2 дня, 5 дней, 21 день, 22 дня, 25 дней, 30+ дней */
function getDaysWord(n) {
    if (n === "30+" || n === 30) return "дней";
    const num = typeof n === "number" ? n : parseInt(n, 10);
    if (num === 1 || num === 21) return "день";
    if ([2, 3, 4, 22, 23, 24].includes(num)) return "дня";
    return "дней";
}

/** Форматирует тег длительности: один день — "4 дня", диапазон — "4-10 дней", 30+ — "30+ дней" */
function formatDurationTag(minIndex, maxIndex) {
    if (minIndex === maxIndex) {
        if (maxIndex === DURATION_MAX_INDEX) return "30+ дней";
        const n = minIndex + 1;
        return `${n} ${getDaysWord(n)}`;
    }
    const minDays = minIndex + 1;
    const maxStr = maxIndex === DURATION_MAX_INDEX ? "30+" : String(maxIndex + 1);
    return `${minDays}-${maxStr} дней`;
}

const FILTER_CATEGORY_TAGS = [
    "В горы",
    "По городам",
    "На пляж",
    "С семьёй или детьми",
    "Долго / Кочёвка",
];
const FILTER_REGION_TAGS = [
    "Европа",
    "Азия",
    "Кавказ",
    "Россия и СНГ",
    "Ближнее Зарубежье (Турция, Египет, ОАЭ)",
    "Америка",
    "Африка и Океания",
];
const FILTER_TRAVELER_TAGS = ["Один", "Вдвоём", "Компания", "С детьми"];
const FILTER_SEASON_TAGS = ["Зима", "Весна", "Лето", "Осень"];

function DurationSlider({ minIndex = 0, maxIndex = DURATION_MAX_INDEX, onChange }) {
    const trackRef = useRef(null);
    const [dragging, setDragging] = useState(null); // "min" | "max" | null

    const clampIndex = (i) => Math.max(0, Math.min(DURATION_MAX_INDEX, Math.round(i)));

    const getIndexFromClientX = useCallback(
        (clientX) => {
            if (!trackRef.current) return 0;
            const rect = trackRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const t = Math.max(0, Math.min(1, x / rect.width));
            return clampIndex(t * DURATION_MAX_INDEX);
        },
        []
    );

    const handlePointerDown = (e, which) => {
        e.preventDefault();
        setDragging(which);
    };

    const handlePointerMove = useCallback(
        (e) => {
            if (dragging === null) return;
            const index = getIndexFromClientX(e.clientX);
            if (dragging === "min") {
                const newMin = Math.min(index, maxIndex);
                onChange?.({ minIndex: newMin, maxIndex });
            } else {
                const newMax = Math.max(index, minIndex);
                onChange?.({ minIndex, maxIndex: newMax });
            }
        },
        [dragging, minIndex, maxIndex, onChange, getIndexFromClientX]
    );

    const handlePointerUp = useCallback(() => {
        setDragging(null);
    }, []);

    useEffect(() => {
        if (dragging === null) return;
        const onMove = (e) => handlePointerMove(e);
        const onUp = () => handlePointerUp();
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [dragging, handlePointerMove, handlePointerUp]);

    const leftPercent = (minIndex / DURATION_MAX_INDEX) * 100;
    const rightPercent = (maxIndex / DURATION_MAX_INDEX) * 100;

    return (
        <div className={styles.durationRow}>
            <div className={styles.durationInputs}>
                <span className={`subinfo ${styles.durationValueBox}`}>
                    {formatDuration(minIndex)}
                </span>
                <span className={`subinfo ${styles.durationValueBox}`}>
                    {formatDuration(maxIndex)}
                </span>
            </div>
            <div className={styles.durationTrackWrap}>
                <div className={styles.durationTrack} ref={trackRef}>
                    <div
                        className={styles.durationTrackFill}
                        style={{
                            left: `${leftPercent}%`,
                            width: `${rightPercent - leftPercent}%`,
                        }}
                    />
                    <span
                        className={styles.durationThumb}
                        style={{ left: `${leftPercent}%` }}
                        onPointerDown={(e) => handlePointerDown(e, "min")}
                        role="slider"
                        aria-valuemin={1}
                        aria-valuemax={30}
                        aria-valuenow={minIndex + 1}
                        aria-label="Минимум дней"
                    />
                    <span
                        className={styles.durationThumb}
                        style={{ left: `${rightPercent}%` }}
                        onPointerDown={(e) => handlePointerDown(e, "max")}
                        role="slider"
                        aria-valuemin={1}
                        aria-valuemax={30}
                        aria-valuenow={maxIndex === DURATION_MAX_INDEX ? 30 : maxIndex + 1}
                        aria-label="Максимум дней"
                    />
                </div>
            </div>
        </div>
    );
}

export default function DropdownFilterMenu({
    className,
    onClose,
    onApply,
    appliedTags,
    onCategoryChange,
    onDurationChange,
    onRegionChange,
    onTravelerChange,
    onSeasonChange,
}) {
    const [categorySelected, setCategorySelected] = useState(new Set());
    const [regionSelected, setRegionSelected] = useState(new Set());
    const [travelerSelected, setTravelerSelected] = useState(new Set());
    const [seasonSelected, setSeasonSelected] = useState(new Set());
    const [durationMin, setDurationMin] = useState(DEFAULT_DURATION_MIN);
    const [durationMax, setDurationMax] = useState(DEFAULT_DURATION_MAX);
    const [resetKey, setResetKey] = useState(0);

    const toggleTag = (setter, id) => {
        setter((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const applyTagsToState = useCallback((tags) => {
        if (!tags || tags.length === 0) {
            setCategorySelected(new Set());
            setRegionSelected(new Set());
            setTravelerSelected(new Set());
            setSeasonSelected(new Set());
            setDurationMin(DEFAULT_DURATION_MIN);
            setDurationMax(DEFAULT_DURATION_MAX);
            setResetKey((k) => k + 1);
            return;
        }
        const categorySet = new Set();
        const regionSet = new Set();
        const travelerSet = new Set();
        const seasonSet = new Set();
        let durationMinVal = DEFAULT_DURATION_MIN;
        let durationMaxVal = DEFAULT_DURATION_MAX;

        for (const tag of tags) {
            if (FILTER_CATEGORY_TAGS.includes(tag)) categorySet.add(tag);
            else if (FILTER_REGION_TAGS.includes(tag)) regionSet.add(tag);
            else if (FILTER_TRAVELER_TAGS.includes(tag)) travelerSet.add(tag);
            else if (FILTER_SEASON_TAGS.includes(tag)) seasonSet.add(tag);
            else {
                const rangeMatch = tag.match(/^(\d+)-(\d+|\d+\+) дней$/);
                const singleMatch = tag.match(/^(\d+) (день|дня|дней)$/);
                if (rangeMatch) {
                    durationMinVal = Math.max(0, parseInt(rangeMatch[1], 10) - 1);
                    durationMaxVal = rangeMatch[2] === "30+"
                        ? DURATION_MAX_INDEX
                        : Math.min(DURATION_MAX_INDEX, parseInt(rangeMatch[2], 10) - 1);
                } else if (singleMatch) {
                    const idx = parseInt(singleMatch[1], 10) - 1;
                    const clamped = Math.max(0, Math.min(DURATION_MAX_INDEX, idx));
                    durationMinVal = clamped;
                    durationMaxVal = clamped;
                } else if (tag === "30+ дней") {
                    durationMinVal = DURATION_MAX_INDEX;
                    durationMaxVal = DURATION_MAX_INDEX;
                }
            }
        }
        setCategorySelected(categorySet);
        setRegionSelected(regionSet);
        setTravelerSelected(travelerSet);
        setSeasonSelected(seasonSet);
        setDurationMin(durationMinVal);
        setDurationMax(durationMaxVal);
        setResetKey((k) => k + 1);
    }, []);

    useEffect(() => {
        if (appliedTags === undefined) return;
        const rafId = window.requestAnimationFrame(() => {
            applyTagsToState(appliedTags);
        });
        return () => window.cancelAnimationFrame(rafId);
    }, [appliedTags, applyTagsToState]);

    const handleReset = useCallback(() => {
        setCategorySelected(new Set());
        setRegionSelected(new Set());
        setTravelerSelected(new Set());
        setSeasonSelected(new Set());
        setDurationMin(DEFAULT_DURATION_MIN);
        setDurationMax(DEFAULT_DURATION_MAX);
        setResetKey((k) => k + 1);
        onApply?.([]);
    }, [onApply]);

    const buildAppliedTags = useCallback(() => {
        const tags = [];
        categorySelected.forEach((label) => tags.push(label));
        regionSelected.forEach((label) => tags.push(label));
        tags.push(formatDurationTag(durationMin, durationMax));
        travelerSelected.forEach((label) => tags.push(label));
        seasonSelected.forEach((label) => tags.push(label));
        return tags;
    }, [categorySelected, regionSelected, durationMin, durationMax, travelerSelected, seasonSelected]);

    const handleApply = useCallback(() => {
        const tags = buildAppliedTags();
        onApply?.(tags);
        onClose?.();
    }, [buildAppliedTags, onApply, onClose]);

    return (
        <div className={`${styles.menuWrap} ${className ?? ""}`}>
            <div className={styles.mobileHeader}>
                <h2 className={`title_1-mobile ${styles.mobileHeaderTitle}`}>Фильтры</h2>
                <RoundButton
                    variant="white"
                    icon={
                        <PublicImage
                            src="/icons/system/Cross.svg"
                            alt=""
                            width={20}
                            height={20}
                            draggable={false}
                        />
                    }
                    onClick={onClose}
                    aria-label="Закрыть"
                />
            </div>
            <div className={styles.menu}>
            <section className={styles.togglerSection}>
                <h3 className={`subtitle_1 ${styles.sectionTitle}`}>Сортировать по</h3>
                <div className={styles.togglerFullWidth}>
                    <Toggler key={`sort-${resetKey}`} options={CHECK_PLANS_SORT_ITEMS} defaultValue={1} />
                </div>
            </section>
            <div className={`${styles.sectionSpacer} ${styles.spacerAfterToggler}`} aria-hidden />
            <section className={styles.section}>
                <h3 className={`subtitle_1 ${styles.sectionTitle}`}>Категория поездки</h3>
                <div className={styles.tagsRow}>
                    {FILTER_CATEGORY_TAGS.map((label) => (
                        <FilterTag
                            key={label}
                            selected={categorySelected.has(label)}
                            onSelect={() => toggleTag(setCategorySelected, label)}
                            onRemove={() => toggleTag(setCategorySelected, label)}
                        >
                            {label}
                        </FilterTag>
                    ))}
                </div>
            </section>

            <div className={styles.sectionSpacer} aria-hidden />

            <section className={styles.section}>
                <h3 className={`subtitle_1 ${styles.sectionTitle}`}>Регион / Направление</h3>
                <div className={styles.tagsRow}>
                    {FILTER_REGION_TAGS.map((label) => (
                        <FilterTag
                            key={label}
                            selected={regionSelected.has(label)}
                            onSelect={() => toggleTag(setRegionSelected, label)}
                            onRemove={() => toggleTag(setRegionSelected, label)}
                        >
                            {label}
                        </FilterTag>
                    ))}
                </div>
            </section>

            <div className={styles.sectionSpacer} aria-hidden />

            <section className={styles.section}>
                <h3 className={`subtitle_1 ${styles.sectionTitle}`}>Длительность в днях</h3>
                <DurationSlider
                    minIndex={durationMin}
                    maxIndex={durationMax}
                    onChange={({ minIndex, maxIndex }) => {
                        setDurationMin(minIndex);
                        setDurationMax(maxIndex);
                        onDurationChange?.({ min: minIndex + 1, max: maxIndex === DURATION_MAX_INDEX ? "30+" : maxIndex + 1 });
                    }}
                />
            </section>

            <div className={styles.sectionSpacer} aria-hidden />

            <section className={styles.section}>
                <h3 className={`subtitle_1 ${styles.sectionTitle}`}>Тип путешественника</h3>
                <div className={styles.tagsRow}>
                    {FILTER_TRAVELER_TAGS.map((label) => (
                        <FilterTag
                            key={label}
                            selected={travelerSelected.has(label)}
                            onSelect={() => toggleTag(setTravelerSelected, label)}
                            onRemove={() => toggleTag(setTravelerSelected, label)}
                        >
                            {label}
                        </FilterTag>
                    ))}
                </div>
            </section>

            <div className={styles.sectionSpacer} aria-hidden />

            <section className={styles.section}>
                <h3 className={`subtitle_1 ${styles.sectionTitle}`}>Сезонность</h3>
                <div className={styles.tagsRow}>
                    {FILTER_SEASON_TAGS.map((label) => (
                        <FilterTag
                            key={label}
                            selected={seasonSelected.has(label)}
                            onSelect={() => toggleTag(setSeasonSelected, label)}
                            onRemove={() => toggleTag(setSeasonSelected, label)}
                        >
                            {label}
                        </FilterTag>
                    ))}
                </div>
            </section>

            <div className={styles.actionsRow}>
                <Button Text="Применить" color="blue" onClick={handleApply} />
                <Button
                    Text="Сбросить"
                    color="dangerFilled"
                    onClick={handleReset}
                    icon={
                        <PublicImage
                            src="/icons/system/Trash-red.svg"
                            alt=""
                            width={16}
                            height={16}
                            draggable={false}
                        />
                    }
                    hoverIcon={
                        <PublicImage
                            src="/icons/system/Trash-white.svg"
                            alt=""
                            width={16}
                            height={16}
                            draggable={false}
                        />
                    }
                />
            </div>
            </div>
        </div>
    );
}

export function DropdownFilterMenuDemo() {
    return (
        <div style={{ padding: 20 }}>
            <DropdownFilterMenu />
        </div>
    );
}
