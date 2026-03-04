"use client";

import { useState } from "react";
import styles from "./toggler.module.css";

/**
 * Toggler — переключатель из двух (или более) сегментов по макету Figma.
 * @param {Array<string>} options — подписи сегментов, например ["Text", "Text"]
 * @param {number} value — индекс выбранного (controlled)
 * @param {number} defaultValue — начальный индекс (uncontrolled)
 * @param {function(number): void} onChange — вызывается при выборе сегмента
 * @param {boolean} disabled — отключить весь toggler
 */
export default function Toggler({
    options = ["Text", "Text"],
    value,
    defaultValue = 0,
    onChange,
    disabled = false,
    ...props
}) {
    const [internalIndex, setInternalIndex] = useState(defaultValue);
    const isControlled = typeof value === "number";
    const activeIndex = isControlled ? value : internalIndex;

    const handleSelect = (index) => {
        if (disabled) return;
        if (!isControlled) setInternalIndex(index);
        onChange?.(index);
    };

    const count = options.length;
    const thumbWidth = count > 0 ? 100 / count : 100;
    /* transform % считается от ширины самого thumb — сдвиг на activeIndex «слотов» */
    const thumbTranslate = activeIndex * 100;

    return (
        <div className={styles.toggler} role="group" aria-label="Toggler" {...props}>
            <div className={styles.togglerTrack} aria-hidden>
                <div
                    className={styles.togglerThumb}
                    style={{
                        width: `${thumbWidth}%`,
                        transform: `translateX(${thumbTranslate}%)`,
                    }}
                />
            </div>
            {options.map((label, index) => (
                <button
                    key={index}
                    type="button"
                    className={`${styles.segment} ${index === activeIndex ? styles["segment--active"] : ""}`}
                    disabled={disabled}
                    onClick={() => handleSelect(index)}
                    aria-pressed={index === activeIndex}
                    role="radio"
                >
                    <span className={`subinfo ${styles.segmentLabel}`}>{label}</span>
                </button>
            ))}
        </div>
    );
}

export function TogglerDemo() {
    return (
        <div className="ButtonShowcaseCol1">
            <Toggler options={["Text", "Text"]} defaultValue={1} />
        </div>
    );
}
