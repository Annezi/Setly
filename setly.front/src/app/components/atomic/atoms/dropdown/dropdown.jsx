"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
    mobileAdaptiveMenu = false,
    mobileAdaptiveBreakpoint = 768,
    mobileFullWidthBreakpoint = 420,
    mobileViewportSidePadding = 16,
    mobileAdaptiveNoHeightClamp = false,
    mobileAdaptiveHorizontalScroll = false,
    menuMatchContainerSelector = "",
    mobileAlignToContainerLeft = false,
    /**
     * На узком вьюпорте: если карточка шире панели (календарь max 400px), левый край панели = левый край кнопки;
     * иначе — по центру экрана. Для дропдауна «Даты» с календарём.
     */
    mobileAlignPanelToTriggerIfWide = false,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);
    const buttonRef = useRef(null);
    const [menuInlineStyle, setMenuInlineStyle] = useState(undefined);
    const dropdownInstanceIdRef = useRef(`dropdown-${Math.random().toString(36).slice(2)}`);

    const isControlled = typeof selectedIndex === "number";
    const currentIndex = isControlled ? selectedIndex : internalSelectedIndex;
    const currentText = staticLabel || !(items.length > 0 && currentIndex >= 0 && currentIndex < items.length)
        ? text
        : items[currentIndex];

    const hasValue = hasValueProp !== undefined ? hasValueProp : currentIndex >= 0;
    const hasCustomContent = dropdownContent != null;
    const hasItems = items.length > 0;
    const isPanelVisible = hasCustomContent || hasItems;

    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (!isOpen) {
            buttonRef.current?.blur();
        }
    }, [isOpen]);

    const handleToggle = useCallback(() => {
        if (!disabled && isPanelVisible) {
            setIsOpen((prev) => !prev);
        }
    }, [disabled, isPanelVisible]);

    const handleSelect = useCallback((index) => {
        if (!isControlled) {
            setInternalSelectedIndex(index);
        }
        setIsOpen(false);
        if (onSelect) {
            onSelect(index, items[index]);
        }
    }, [isControlled, items, onSelect]);

    useEffect(() => {
        if (typeof window === "undefined") return undefined;
        const handleAnotherDropdownOpen = (event) => {
            const openedId = event?.detail?.id;
            if (!openedId || openedId === dropdownInstanceIdRef.current) return;
            setIsOpen(false);
        };
        window.addEventListener("setly:dropdown-open", handleAnotherDropdownOpen);
        return () => window.removeEventListener("setly:dropdown-open", handleAnotherDropdownOpen);
    }, []);

    useEffect(() => {
        if (!isOpen || typeof window === "undefined") return;
        const id = dropdownInstanceIdRef.current;
        const rafId = window.requestAnimationFrame(() => {
            window.dispatchEvent(
                new CustomEvent("setly:dropdown-open", {
                    detail: { id },
                })
            );
        });
        return () => window.cancelAnimationFrame(rafId);
    }, [isOpen]);

    const resolvedIcon = useMemo(() => (
        icon != null
            ? <span className={`${styles.dropdownIcon} ${isOpen ? styles["dropdownIcon--open"] : ""}`}>{icon}</span>
            : <ChevronDownIcon className={`${styles.dropdownIcon} ${isOpen ? styles["dropdownIcon--open"] : ""}`} />
    ), [icon, isOpen]);

    const resolvedDropdownContent = useMemo(() => (
        typeof dropdownContent === "function"
            ? dropdownContent(close)
            : dropdownContent
    ), [dropdownContent, close]);

    const menuClassName = useMemo(() => (
        `component-blur ${styles.dropdownMenu} ${bgView ? "" : styles["dropdownMenuTransperent"]} ${menuCentered ? (bgView ? styles["dropdownMenu--centered"] : styles["dropdownMenuTransperent--centered"]) : ""} ${isOpen ? styles["dropdownMenu--open"] : ""} ${dropdownMenuClassName ?? ""}`
    ), [bgView, menuCentered, isOpen, dropdownMenuClassName]);

    useEffect(() => {
        if (typeof window === "undefined") return undefined;
        if (!isOpen || !mobileAdaptiveMenu) {
            setMenuInlineStyle(undefined);
            return undefined;
        }

        const updateMenuPosition = () => {
            const buttonEl = buttonRef.current;
            if (!buttonEl) return;
            const viewportWidth = window.innerWidth || 0;
            if (viewportWidth > mobileAdaptiveBreakpoint) {
                setMenuInlineStyle(undefined);
                return;
            }

            const rect = buttonEl.getBoundingClientRect();
            const containerRect =
                menuMatchContainerSelector
                    ? buttonEl.closest(menuMatchContainerSelector)?.getBoundingClientRect?.() ?? null
                    : null;
            const top = rect.bottom + 12;
            const viewportHeight = window.innerHeight || 0;
            const maxHeight = Math.max(180, viewportHeight - top - 16);
            const pad = mobileViewportSidePadding;
            const maxPanelW = Math.max(140, viewportWidth - pad * 2);
            /** Совпадает с max-width календаря в calendar.module.css */
            const mobileCalendarPanelMaxW = 400;

            /** Центр по горизонтали или выравнивание по кнопке, если карточка шире панели */
            const fixedPanelFromContainer = () => {
                let rawW = containerRect ? Math.min(containerRect.width, maxPanelW) : maxPanelW;
                if (mobileAlignPanelToTriggerIfWide) {
                    rawW = Math.min(rawW, mobileCalendarPanelMaxW);
                }
                const widthPx = Math.max(140, rawW);
                const containerWiderThanPanel =
                    Boolean(containerRect) && containerRect.width > widthPx;
                const leftPx =
                    mobileAlignPanelToTriggerIfWide && containerWiderThanPanel
                        ? Math.max(pad, Math.min(rect.left, viewportWidth - widthPx - pad))
                        : Math.max(pad, Math.round((viewportWidth - widthPx) / 2));
                return {
                    position: "fixed",
                    top: `${top}px`,
                    left: `${leftPx}px`,
                    width: `${widthPx}px`,
                    minWidth: `${widthPx}px`,
                    maxWidth: `${widthPx}px`,
                    transform: "none",
                    ...(mobileAdaptiveNoHeightClamp ? {} : { maxHeight: `${maxHeight}px`, overflowY: "auto" }),
                    ...(mobileAdaptiveHorizontalScroll ? { overflowX: "auto" } : {}),
                };
            };

            if (viewportWidth <= mobileFullWidthBreakpoint) {
                if (containerRect) {
                    setMenuInlineStyle(fixedPanelFromContainer());
                    return;
                }
                const width = maxPanelW;
                setMenuInlineStyle({
                    position: "fixed",
                    top: `${top}px`,
                    left: `${pad}px`,
                    width: `${width}px`,
                    minWidth: `${width}px`,
                    maxWidth: `${width}px`,
                    ...(mobileAdaptiveNoHeightClamp ? {} : { maxHeight: `${maxHeight}px`, overflowY: "auto" }),
                    ...(mobileAdaptiveHorizontalScroll ? { overflowX: "auto" } : {}),
                    transform: "none",
                });
                return;
            }

            if (containerRect) {
                setMenuInlineStyle(fixedPanelFromContainer());
                return;
            }

            setMenuInlineStyle({
                position: "fixed",
                top: `${top}px`,
                left: "50%",
                ...(mobileAdaptiveNoHeightClamp ? {} : { maxHeight: `${maxHeight}px`, overflowY: "auto" }),
                ...(mobileAdaptiveHorizontalScroll ? { overflowX: "auto", maxWidth: `calc(100vw - ${mobileViewportSidePadding * 2}px)` } : {}),
                transform: "translateX(-50%)",
            });
        };

        updateMenuPosition();
        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);
        return () => {
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
        };
    }, [
        isOpen,
        mobileAdaptiveMenu,
        mobileAdaptiveBreakpoint,
        mobileFullWidthBreakpoint,
        mobileViewportSidePadding,
        mobileAdaptiveNoHeightClamp,
        mobileAdaptiveHorizontalScroll,
        menuMatchContainerSelector,
        mobileAlignToContainerLeft,
        mobileAlignPanelToTriggerIfWide,
    ]);

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
                    className={menuClassName}
                    style={menuInlineStyle}
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
