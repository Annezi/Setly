"use client";

import { useState } from "react";
import PublicImage from "@/app/components/globals/public-image";
import styles from "./checkbox.module.css";

/**
 * Круглый чекбокс 15×15.
 * Не выбран: bg --grayscale-white, border --grayscale-gray 1px.
 * Выбран: bg --accent-blue, без бордера, иконка Correct.svg.
 */
export default function Checkbox({
    checked = false,
    onChange,
    disabled = false,
    "aria-label": ariaLabel,
    ...props
}) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-label={ariaLabel ?? "Чекбокс"}
            className={`${styles.checkbox} ${checked ? styles["checkbox--checked"] : ""}`}
            disabled={disabled}
            onClick={() => onChange?.(!checked)}
            {...props}
        >
            <span className={styles.checkbox__icon} aria-hidden>
                <PublicImage
                    src="/icons/system/Correct.svg"
                    alt=""
                    width={10}
                    height={10}
                />
            </span>
        </button>
    );
}

export function CheckboxDemo() {
    const [checked, setChecked] = useState(false);
    return (
        <div className="ButtonShowcaseCol1" style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <Checkbox checked={checked} onChange={setChecked} aria-label="Чекбокс" />
            <Checkbox checked={true} onChange={() => {}} aria-label="Выбран" />
            <Checkbox checked={false} onChange={() => {}} aria-label="Не выбран" />
        </div>
    );
}
