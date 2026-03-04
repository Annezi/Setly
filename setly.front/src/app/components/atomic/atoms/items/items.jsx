"use client";

import styles from "./items.module.css";

function DefaultTextIcon() {
    return <img src="/icons/images/Text.svg"/>;
}

/**
 * Варианты (как на макете):
 * - text: кнопка как текст
 * - filled: кнопка с bg
 * - textIcon: кнопка как текст с иконкой в начале
 * - filledIcon: кнопка с иконкой в начале и bg
 */
export default function Item({
    text = "Пункт",
    variant = "text",
    icon,
    disabled = false,
    ...props
}) {
    const withBg = variant === "filled" || variant === "filledIcon";
    const withIcon = variant === "textIcon" || variant === "filledIcon";

    return (
        <button
            type="button"
            className={[
                styles.item,
                withBg ? styles["item--filled"] : styles["item--text"],
                withIcon ? styles["item--withIcon"] : styles["item--noIcon"],
            ].join(" ")}
            disabled={disabled}
            {...props}
        >
            {withIcon && (
                <span className={styles.item__icon} aria-hidden>
                    {icon ?? <DefaultTextIcon />}
                </span>
            )}
            <span className={`subinfo ${styles.item__label}`}>{text}</span>
        </button>
    );
}

export function ItemsDemo() {
    return (
        <div className="ButtonShowcaseCol1" >
            <Item text="Пункт" variant="text" />
            <Item text="Пункт" variant="filled" />
            <Item text="Пункт" variant="textIcon" />
            <Item text="Пункт" variant="filledIcon" />
        </div>
    );
}

