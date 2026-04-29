"use client";

import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import styles from "./calendar.module.css";

const MS_DAY = 24 * 60 * 60 * 1000;

function getDaysCount(start, end) {
    if (!start || !end) return 0;
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    const diff = Math.round((endDay - startDay) / MS_DAY);
    return Math.max(0, diff) + 1;
}

function daysLabel(n) {
    if (n === 1) return "1 день";
    if (n >= 2 && n <= 4) return `${n} дня`;
    return `${n} дней`;
}

/** Количество дней по диапазону [start, end]; для передачи в API (CheckPlan.days_num). */
export function getDaysCountFromRange(range) {
    if (!range || !range[0] || !range[1]) return 0;
    return getDaysCount(range[0], range[1]);
}

/** Строка вида "10 дней" для API (CheckPlan.days). */
export function getDaysLabelForApi(n) {
    if (n <= 0) return "";
    return daysLabel(n);
}

export function getButtonLabel(range, emptyPlaceholder = "Выберите даты") {
    if (!range || !range[0] || !range[1]) return emptyPlaceholder;
    const [start, end] = range;
    const count = getDaysCount(start, end);
    const sameMonth =
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear();
    const monthYear = new Intl.DateTimeFormat("ru", { month: "long", year: "numeric" }).format(start);
    const year = start.getFullYear();
    if (sameMonth) {
        return `${daysLabel(count)}, ${monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}`;
    }
    return `${daysLabel(count)}, ${year}`;
}

/** Контент календаря для вставки в dropdownContent (value/onChange — controlled, onClose — закрыть панель при выборе) */
export function CalendarContent({ value, onChange, onClose }) {
    const [viewMonthDate, setViewMonthDate] = useState(() => {
        const start = value?.[0];
        if (start instanceof Date && Number.isFinite(start.getTime())) {
            return new Date(start.getFullYear(), start.getMonth(), 1);
        }
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    const [monthMenuOpen, setMonthMenuOpen] = useState(false);
    const [yearMenuOpen, setYearMenuOpen] = useState(false);
    const monthWrapRef = useRef(null);
    const yearWrapRef = useRef(null);

    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const monthLabels = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    useEffect(() => {
        if (!monthMenuOpen && !yearMenuOpen) return undefined;
        const onPointerDown = (e) => {
            const t = e.target;
            if (
                monthWrapRef.current?.contains(t) ||
                yearWrapRef.current?.contains(t)
            ) {
                return;
            }
            setMonthMenuOpen(false);
            setYearMenuOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown, true);
        return () => document.removeEventListener("pointerdown", onPointerDown, true);
    }, [monthMenuOpen, yearMenuOpen]);

    const shiftMonths = (date, delta) =>
        new Date(date.getFullYear(), date.getMonth() + delta, 1);

    const getMonthGrid = (monthDate) => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const first = new Date(year, month, 1);
        const firstWeekday = (first.getDay() + 6) % 7; // Monday=0
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const cells = [];
        for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
        for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(year, month, d));
        while (cells.length % 7 !== 0) cells.push(null);
        return cells;
    };

    const isSameDay = (a, b) =>
        a instanceof Date &&
        b instanceof Date &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const normalize = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const [startRaw, endRaw] = value ?? [null, null];
    const start = startRaw instanceof Date ? normalize(startRaw) : null;
    const end = endRaw instanceof Date ? normalize(endRaw) : null;

    const handleChange = (v) => {
        const next = v ?? [null, null];
        onChange?.(next);
        if (next[0] && next[1]) onClose?.();
    };

    const handleDayClick = (day) => {
        if (!day) return;
        const clicked = normalize(day);
        if (!start || (start && end)) {
            handleChange([clicked, null]);
            return;
        }
        if (clicked.getTime() < start.getTime()) {
            handleChange([clicked, start]);
            return;
        }
        handleChange([start, clicked]);
    };

    const currentMonth = viewMonthDate;
    const currentGrid = getMonthGrid(currentMonth);

    const dayInRange = (day) => {
        if (!day || !start || !end) return false;
        const t = day.getTime();
        return t >= start.getTime() && t <= end.getTime();
    };

    const isRangeStart = (day) => start && isSameDay(day, start);
    const isRangeEnd = (day) => end && isSameDay(day, end);

    const currentYear = currentMonth.getFullYear();
    const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

    const openMonthMenu = () => {
        setYearMenuOpen(false);
        setMonthMenuOpen((o) => !o);
    };

    const openYearMenu = () => {
        setMonthMenuOpen(false);
        setYearMenuOpen((o) => !o);
    };

    return (
        <div className={styles.calendarWrap}>
            <div className={styles.calendarNav}>
                <button
                    type="button"
                    className={styles.calendarNavButton}
                    aria-label="Предыдущий месяц"
                    onClick={() => setViewMonthDate((prev) => shiftMonths(prev, -1))}
                >
                    <Image
                        src="/icons/system/blueArrowLeft.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.calendarNavIcon}
                        draggable={false}
                    />
                </button>
                <div className={styles.calendarHeaderSelects}>
                    <div className={styles.selectWrap} ref={monthWrapRef}>
                        <button
                            type="button"
                            className={styles.headerSelectTrigger}
                            aria-expanded={monthMenuOpen}
                            aria-haspopup="listbox"
                            onClick={openMonthMenu}
                            aria-label="Выбор месяца"
                        >
                            <span className={styles.headerSelectTriggerLabel}>
                                {monthLabels[currentMonth.getMonth()]}
                            </span>
                            <Image
                                src="/icons/system/ArrowDown.svg"
                                alt=""
                                width={16}
                                height={16}
                                className={styles.headerSelectArrow}
                                draggable={false}
                            />
                        </button>
                        {monthMenuOpen && (
                            <div className={styles.selectMenuClip} role="presentation">
                                <div className={styles.selectMenuScroll} role="listbox">
                                    {monthLabels.map((label, idx) => (
                                        <button
                                            key={label}
                                            type="button"
                                            role="option"
                                            aria-selected={idx === currentMonth.getMonth()}
                                            className={`${styles.selectMenuItem} ${
                                                idx === currentMonth.getMonth()
                                                    ? styles.selectMenuItemSelected
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                setViewMonthDate(
                                                    new Date(currentMonth.getFullYear(), idx, 1)
                                                );
                                                setMonthMenuOpen(false);
                                            }}
                                        >
                                            <span className={styles.selectMenuItemText}>{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.selectWrap} ref={yearWrapRef}>
                        <button
                            type="button"
                            className={styles.headerSelectTrigger}
                            aria-expanded={yearMenuOpen}
                            aria-haspopup="listbox"
                            onClick={openYearMenu}
                            aria-label="Выбор года"
                        >
                            <span className={styles.headerSelectTriggerLabel}>
                                {currentMonth.getFullYear()}
                            </span>
                            <Image
                                src="/icons/system/ArrowDown.svg"
                                alt=""
                                width={16}
                                height={16}
                                className={styles.headerSelectArrow}
                                draggable={false}
                            />
                        </button>
                        {yearMenuOpen && (
                            <div className={styles.selectMenuClip} role="presentation">
                                <div className={styles.selectMenuScroll} role="listbox">
                                    {yearOptions.map((year) => (
                                        <button
                                            key={year}
                                            type="button"
                                            role="option"
                                            aria-selected={year === currentMonth.getFullYear()}
                                            className={`${styles.selectMenuItem} ${
                                                year === currentMonth.getFullYear()
                                                    ? styles.selectMenuItemSelected
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                setViewMonthDate(
                                                    new Date(year, currentMonth.getMonth(), 1)
                                                );
                                                setYearMenuOpen(false);
                                            }}
                                        >
                                            <span className={styles.selectMenuItemText}>{year}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    className={styles.calendarNavButton}
                    aria-label="Следующий месяц"
                    onClick={() => setViewMonthDate((prev) => shiftMonths(prev, 1))}
                >
                    <Image
                        src="/icons/system/blueArrowRight.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.calendarNavIcon}
                        draggable={false}
                    />
                </button>
            </div>
            <div className={styles.weekdaysRow}>
                {weekDays.map((w) => (
                    <div key={w} className={styles.weekdayCell}>{w}</div>
                ))}
            </div>
            <div className={styles.daysGrid}>
                {currentGrid.map((day, i) => {
                    const selectedStart = day && isRangeStart(day);
                    const selectedEnd = day && isRangeEnd(day);
                    const selected = Boolean(selectedStart || selectedEnd);
                    const range = day ? dayInRange(day) : false;

                    const prevDay = i > 0 ? currentGrid[i - 1] : null;
                    const nextDay = i < currentGrid.length - 1 ? currentGrid[i + 1] : null;
                    const prevInRange = prevDay && dayInRange(prevDay);
                    const nextInRange = nextDay && dayInRange(nextDay);
                    const segLeft = range && !prevInRange;
                    const segRight = range && !nextInRange;

                    return (
                        <button
                            key={`${currentMonth.getMonth()}-${i}`}
                            type="button"
                            className={`${styles.dayCell} ${day ? "" : styles.dayCellEmpty} ${
                                range ? styles.dayCellInRange : ""
                            } ${segLeft ? styles.dayCellRangeSegLeft : ""} ${
                                segRight ? styles.dayCellRangeSegRight : ""
                            } ${selected ? styles.dayCellSelected : ""}`}
                            disabled={!day}
                            onClick={() => handleDayClick(day)}
                        >
                            {day ? day.getDate() : ""}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function CalendarDropdown() {
    const [range, setRange] = useState([null, null]);
    const buttonText = useMemo(() => getButtonLabel(range), [range]);

    return (
        <Dropdown
            text={buttonText}
            dropdownContent={<CalendarContent value={range} onChange={setRange} />}
            bgView={false}
        />
    );
}
