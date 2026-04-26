"use client";

import { useState } from "react";
import PublicImage from "@/app/components/globals/public-image";
import styles from "./filter-tag.module.css";

/**
 * Тег фильтра с двумя состояниями: не выбран и выбран.
 * Поддерживается вариант, когда не выбран ни один тег (все с selected={false}).
 * Не выбран: bg --grayscale-primary-gray, белая обводка 1px, тёмный текст; клик по тегу — выбор.
 * Выбран: синий фон, круг с крестиком (кликабелен только он) и белый текст; крестик — снятие выбора.
 * @param {string} children — текст тега
 * @param {boolean} selected — выбран ли тег (по умолчанию false)
 * @param {function} onSelect — вызывается при клике по тегу в невыбранном состоянии
 * @param {function} onRemove — вызывается при клике по крестику в выбранном состоянии
 */
export default function FilterTag({
    children = "Text",
    selected = false,
    onSelect,
    onRemove,
    ...props
}) {
    return (
        <div
            className={`${styles.tag} ${selected ? styles["tag--selected"] : styles["tag--unselected"]}`}
            role="button"
            tabIndex={0}
            onClick={!selected ? onSelect : undefined}
            onKeyDown={(e) => {
                if (!selected && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelect?.();
                }
            }}
            {...props}
        >
            {selected && (
                <button
                    type="button"
                    className={styles.tag__iconWrap}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove?.();
                    }}
                    aria-label="Удалить тег"
                >
                    <PublicImage
                        src="/icons/system/Cross.svg"
                        alt=""
                        width={12}
                        height={12}
                    />
                </button>
            )}
            <span className={`subinfo ${styles.tag__label}`}>{children}</span>
        </div>
    );
}

/**
 * Контейнер для нескольких FilterTag: отступ 12px слева у всех, кроме первого.
 */
export function FilterTagStack({ children, className, ...props }) {
    return (
        <div className={`${styles.stack} ${className || ""}`} {...props}>
            {children}
        </div>
    );
}

export function FilterTagDemo() {
    const [selectedIds, setSelectedIds] = useState(new Set());
    const toggle = (id) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };
    return (
        <div className="ButtonShowcaseCol1">
            <FilterTagStack>
                <FilterTag
                    selected={selectedIds.has("a")}
                    onSelect={() => toggle("a")}
                    onRemove={() => toggle("a")}
                >
                    Text
                </FilterTag>
                <FilterTag
                    selected={selectedIds.has("b")}
                    onSelect={() => toggle("b")}
                    onRemove={() => toggle("b")}
                >
                    Text
                </FilterTag>
            </FilterTagStack>
        </div>
    );
}
