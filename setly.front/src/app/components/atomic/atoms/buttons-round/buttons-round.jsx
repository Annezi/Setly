"use client";

import Image from "next/image";
import styles from "./buttons-round.module.css";

function ArrowRightIcon({ className }) {
    return (
        <span className={className} aria-hidden>
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 4L13 10L7 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

export default function RoundButton({ variant = "white", icon, children, ...props }) {
    const hasCustomIcon = Boolean(icon ?? children);

    return (
        <button
            type="button"
            className={`${styles.roundButton} ${styles[`roundButton--${variant}`]}`}
            disabled={variant === "disabled"}
            aria-disabled={variant === "disabled"}
            {...props}
        >
            {hasCustomIcon ? (
                <span className={styles.roundButton__icon}>{icon ?? children}</span>
            ) : (
                <ArrowRightIcon className={styles.roundButton__icon} />
            )}
        </button>
    );
}

export function ButtonsRoundDemo() {
    return (
        <div className="ButtonShowcase">
            <RoundButton variant="white" aria-label="Стрелка вправо" />
            <RoundButton variant="hover" aria-label="Стрелка вправо" />
            <RoundButton variant="disabled" aria-label="Стрелка вправо (неактивно)" />
        </div>
    );
}
