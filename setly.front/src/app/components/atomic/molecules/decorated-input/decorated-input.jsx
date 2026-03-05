"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import styles from "./decorated-input.module.css";
import Checkbox from "@/app/components/atomic/atoms/checkbox/checkbox";

function useAutoResizeTextarea(ref, value, enabled) {
    useEffect(() => {
        if (!enabled || !ref.current) return;
        const el = ref.current;
        el.style.height = "0";
        el.style.height = `${Math.max(el.scrollHeight, 24)}px`;
    }, [value, enabled, ref]);
}

export default function DecoratedInput({
    decorator = "bullet",
    placeholder = "Введите текст...",
    value: valueProp,
    defaultValue,
    onChange,
    checkboxChecked,
    onCheckboxChange,
    disabled = false,
    readOnly = false,
    className,
    multiline = false,
    inputTextClass,
    ...props
}) {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [underlineWidth, setUnderlineWidth] = useState(0);

    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;

    const useTextarea = decorator === "bullet" || multiline;
    const measureRef = useRef(null);
    const inputRef = useRef(null);
    const textareaRef = useRef(null);
    const controlRef = useTextarea ? textareaRef : inputRef;

    useLayoutEffect(() => {
        if (!useTextarea || !measureRef.current) return;
        setUnderlineWidth(measureRef.current.offsetWidth);
    }, [value, useTextarea]);

    useAutoResizeTextarea(textareaRef, value, useTextarea);

    const handleChange = (e) => {
        if (!isControlled) setInternalValue(e.target.value);
        onChange?.(e);
    };

    const handleClear = () => {
        if (!isControlled) setInternalValue("");
        const target = controlRef.current;
        if (target) {
            const syntheticEvent = { target: { ...target, value: "" } };
            onChange?.(syntheticEvent);
            target.focus();
        }
    };

    const showClear = (isFocused || isHovered) && !disabled && !readOnly && value.length > 0;
    const hasText = value.length > 0;

    const textClass = inputTextClass ?? "paragraph";
    const inputClassName = `${styles.input} ${textClass} ${hasText ? styles["input--filled"] : ""} ${decorator === "checkbox" && checkboxChecked ? styles["input--strikethrough"] : ""} ${useTextarea ? styles["input--multiline"] : ""}`;

    const isNoDecorator = decorator === "none";

    return (
        <div
            className={`${styles.root} ${className ?? ""} ${useTextarea ? styles["root--multiline"] : ""} ${isNoDecorator ? styles["root--no-decorator"] : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.decorator}>
                {decorator === "bullet" ? (
                    <span className={styles.bullet} aria-hidden />
                ) : decorator === "none" ? null : (
                    <Checkbox
                        checked={checkboxChecked}
                        onChange={onCheckboxChange}
                        disabled={disabled}
                        aria-label="Отметить"
                    />
                )}
            </div>
            <span className={styles.gap} aria-hidden />
            <div className={`${styles.inputWrap} ${useTextarea ? styles["inputWrap--multiline"] : ""}`}>
                {useTextarea ? (
                    <textarea
                        ref={textareaRef}
                        className={inputClassName}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={disabled}
                        readOnly={readOnly}
                        aria-label={placeholder}
                        rows={1}
                        {...props}
                    />
                ) : (
                    <>
                        <input
                            ref={inputRef}
                            type="text"
                            className={inputClassName}
                            placeholder={placeholder}
                            value={value}
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            disabled={disabled}
                            readOnly={readOnly}
                            aria-label={placeholder}
                            {...props}
                        />
                        <span ref={measureRef} className={`${styles.measure} paragraph`} aria-hidden>
                            {value || "\u00A0"}
                        </span>
                        {hasText && (isFocused || isHovered) && (
                            <span className={styles.underline} style={{ width: underlineWidth }} aria-hidden />
                        )}
                    </>
                )}
                {showClear && (
                    <button
                        type="button"
                        className={styles.clear}
                        onClick={handleClear}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="Очистить"
                        tabIndex={-1}
                    >
                        <img src="/icons/system/Cross.svg" alt="" width={16} height={16} />
                    </button>
                )}
            </div>
        </div>
    );
}

export function DecoratedInputDemo() {
    const [checked, setChecked] = useState(false);
    return (
        <div className={styles.demo}>
            <DecoratedInput decorator="bullet" placeholder="Введите текст..." />
            <DecoratedInput
                decorator="checkbox"
                placeholder="Введите текст..."
                checkboxChecked={checked}
                onCheckboxChange={setChecked}
            />
        </div>
    );
}
