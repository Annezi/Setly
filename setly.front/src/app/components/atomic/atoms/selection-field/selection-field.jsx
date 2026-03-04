"use client";

import { useState } from "react";
import styles from "./selection-field.module.css";
import DropdownItem from "../dropdown-item/dropdown-item";

function ChevronDownIcon({ className }) {
    return (
        <span className={className} aria-hidden>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

export default function SelectionField({
    title,
    icon,
    text = "Type",
    items = [],
    dropdownContent,
    selectedIndex,
    defaultSelectedIndex = -1,
    disabled = false,
    onSelect,
    className,
    panelAlign,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);

    const isControlled = typeof selectedIndex === "number";
    const currentIndex = isControlled ? selectedIndex : internalSelectedIndex;
    const currentText =
        items.length > 0 && currentIndex >= 0 && currentIndex < items.length
            ? items[currentIndex]
            : text;

    const hasDropdownContent = dropdownContent != null;
    const hasItems = items.length > 0;
    const isDropdownVisible = hasDropdownContent || hasItems;

    const handleToggle = () => {
        if (!disabled && isDropdownVisible) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (index) => {
        if (!isControlled) {
            setInternalSelectedIndex(index);
        }
        setIsOpen(false);
        if (onSelect) {
            onSelect(index, items[index]);
        }
    };

    return (
        <div className={`${styles.selectionField} ${className ?? ""}`} {...props}>
            <div className={styles.left}>
                {icon != null && (
                    <>
                        <span className={styles.iconWrap}>{icon}</span>
                        <span className={styles.gapIconTitle} aria-hidden />
                    </>
                )}
                <span className="subtitle_2">{title}</span>
            </div>
            <span className={styles.gapTitleDropdown} aria-hidden />
            <div className={styles.dropdownWrap}>
                <button
                    type="button"
                    className={`${styles.trigger} ${isOpen ? styles["trigger--open"] : ""}`}
                    disabled={disabled}
                    onClick={handleToggle}
                    aria-expanded={isOpen}
                    aria-haspopup={hasDropdownContent ? "dialog" : "listbox"}
                >
                    <span className="subtitle_2">{currentText}</span>
                    <ChevronDownIcon
                        className={`${styles.chevron} ${isOpen ? styles["chevron--open"] : ""}`}
                    />
                </button>
                {isDropdownVisible && (
                    <div
                        className={`component-blur ${styles.panel} ${panelAlign === "left" ? styles["panel--left"] : ""} ${isOpen ? styles["panel--open"] : ""}`}
                        role={hasDropdownContent ? null : "listbox"}
                    >
                        {hasDropdownContent
                            ? (typeof dropdownContent === "function"
                                ? dropdownContent(() => setIsOpen(false))
                                : dropdownContent)
                            : items.map((item, index) => (
                                  <DropdownItem
                                      key={index}
                                      text={item}
                                      selected={currentIndex >= 0 && index === currentIndex}
                                      onClick={() => handleSelect(index)}
                                  />
                              ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function SelectionFieldDemo() {
    return (
        <div className={styles.demo}>
            <SelectionField
                title="Subtitle:"
                icon={
                    <img
                        src="/icons/images/Calender.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                }
                text="Type"
                items={["Пункт", "Пункт", "Пункт"]}
            />
            <SelectionField title="Label:" text="Type" items={["Вариант 1", "Вариант 2"]} />
        </div>
    );
}
