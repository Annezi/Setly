"use client";

import PublicImage from "@/app/components/globals/public-image";
import styles from "./buttons-mini.module.css";

export default function ButtonsMini({
    state = "notcompleted",
    label,
    onClick,
    disabled = false,
    ...props
}) {
    const isCompleted = state === "completed";

    return (
        <button
            type="button"
            className={`${styles.buttonsMini} ${styles[`buttonsMini--${state}`]}`}
            onClick={onClick}
            disabled={disabled}
            aria-pressed={state === "current"}
            {...props}
        >
            {isCompleted ? (
                <span className={styles.icon} aria-hidden>
                    <PublicImage
                        src="/icons/system/Correct.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                </span>
            ) : (
                <span className="subtitle_2">{label}</span>
            )}
        </button>
    );
}

export function ButtonsMiniDemo() {
    return (
        <div className={styles.demo}>
            <ButtonsMini state="notcompleted" label="2" />
            <ButtonsMini state="current" label="1" />
            <ButtonsMini state="completed" />
        </div>
    );
}
