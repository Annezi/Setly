"use client";

import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import { CalendarRange, ConfigProvider } from "@vkontakte/vkui";
import { useState, useMemo } from "react";

import "@vkontakte/vkui/dist/vkui.css";
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
    const handleChange = (v) => {
        const next = v ?? [null, null];
        onChange?.(next);
        if (next[0] && next[1]) onClose?.();
    };
    return (
        <div className={styles.calendarWrap}>
            <ConfigProvider direction="ltr" colorScheme="light">
                <CalendarRange
                    value={value ?? [null, null]}
                    onChange={handleChange}
                />
            </ConfigProvider>
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