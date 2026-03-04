"use client";

import { useState, useRef, useEffect } from 'react';
import styles from "./dropdown.module.css";
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

export default function Dropdown({
    text = "Type",
    items = [],
    dropdownContent,
    selectedIndex,
    defaultSelectedIndex = -1,
    disabled = false,
    onSelect,
    bgView = true,
    icon,
    menuCentered = false,
    dropdownMenuClassName,
    hasValue: hasValueProp,
    /** Если true, на кнопке всегда показывается text, а не выбранный пункт */
    staticLabel = false,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);
    const buttonRef = useRef(null);

    const isControlled = typeof selectedIndex === "number";
    const currentIndex = isControlled ? selectedIndex : internalSelectedIndex;
    const currentText = staticLabel || !(items.length > 0 && currentIndex >= 0 && currentIndex < items.length)
        ? text
        : items[currentIndex];

    const hasValue = hasValueProp !== undefined ? hasValueProp : currentIndex >= 0;
    const hasCustomContent = dropdownContent != null;
    const hasItems = items.length > 0;
    const isPanelVisible = hasCustomContent || hasItems;

    const close = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) {
            buttonRef.current?.blur();
        }
    }, [isOpen]);

    const handleToggle = () => {
        if (!disabled && isPanelVisible) {
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

    const resolvedIcon = icon != null
        ? <span className={`${styles.dropdownIcon} ${isOpen ? styles["dropdownIcon--open"] : ""}`}>{icon}</span>
        : <ChevronDownIcon className={`${styles.dropdownIcon} ${isOpen ? styles["dropdownIcon--open"] : ""}`} />;

    const resolvedDropdownContent = typeof dropdownContent === "function"
        ? dropdownContent(close)
        : dropdownContent;

    return (
        <div className={styles.dropdown}>
            <button
                ref={buttonRef}
                type="button"
                className={`${styles.dropdownButton} ${isOpen ? styles["dropdownButton--open"] : ""}`}
                disabled={disabled}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-haspopup={hasCustomContent ? "dialog" : "listbox"}
                data-has-value={hasValue}
                {...props}
            >
                <span className="subinfo">{currentText}</span>
                {resolvedIcon}
            </button>
            {isPanelVisible && (
                <div 
                    className={`component-blur ${styles.dropdownMenu} ${bgView ? "" : styles["dropdownMenuTransperent"]} ${menuCentered ? (bgView ? styles["dropdownMenu--centered"] : styles["dropdownMenuTransperent--centered"]) : ""} ${isOpen ? styles["dropdownMenu--open"] : ""} ${dropdownMenuClassName ?? ""}`}
                    role={hasCustomContent ? null : "listbox"}
                >
                    {hasCustomContent
                        ? resolvedDropdownContent
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
    );
}

export function DropdownDemo() {
    return (
        <div className="ButtonShowcaseCol1">
            <Dropdown 
                text="Type"
                items={["Пункт", "Пункт", "Пункт", "Пункт"]}
            />
        </div>
    );
}
