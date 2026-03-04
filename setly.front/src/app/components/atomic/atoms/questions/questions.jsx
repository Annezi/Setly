"use client";

import styles from "./questions.module.css";

export default function Questions({
    text,
    title,
    description,
    imageSrc,
    selected = false,
    onClick,
    disabled = false,
    className,
    ...props
}) {
    const hasTitle = title != null && title !== "";
    const hasImage = imageSrc != null && imageSrc !== "";

    return (
        <button
            type="button"
            className={`${styles.questions} ${selected ? styles["questions--selected"] : styles["questions--unselected"]} ${hasTitle ? styles["questions--withTitle"] : ""} ${hasImage ? styles["questions--withImage"] : ""} ${className ?? ""}`}
            onClick={onClick}
            disabled={disabled}
            aria-pressed={selected}
            {...props}
        >
            {hasImage && (
                <span className={styles.imageWrap} aria-hidden>
                    <img src={imageSrc} alt="" className={styles.image} />
                </span>
            )}
            {hasTitle ? (
                <span className={styles.contentCentered}>
                    <span className={`${styles.title} subtitle_1`}>{title}</span>
                    {description != null && description !== "" && (
                        <span className={`${styles.description} subinfo`}>{description}</span>
                    )}
                </span>
            ) : (
                <span className={`${styles.textOnly} subinfo`}>{text ?? "Пункт"}</span>
            )}
        </button>
    );
}

export function QuestionsDemo() {
    return (
        <div className={styles.demo}>
            <Questions text="Пункт" selected={false} />
            <Questions text="Пункт" selected />
            <Questions
                title="⛰️ Горы / Природа"
                description="Для тех, кто хочет треккинга, палаток, высоты и природы"
                selected={false}
            />
            <Questions
                title="🏙️ Городской отдых"
                description="Планы для музеев, кафе, прогулок"
                selected
            />
        </div>
    );
}
