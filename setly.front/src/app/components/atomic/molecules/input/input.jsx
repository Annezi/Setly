"use client";

import { useState, useId } from "react";
import styles from "./input.module.css";

const URL_PATTERN = /^https?:\/\/.+/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

function isValidLink(value) {
    if (!value || !value.trim()) return true;
    return URL_PATTERN.test(value.trim());
}

function isValidEmail(value) {
    if (!value || !value.trim()) return true;
    return EMAIL_PATTERN.test(value.trim());
}

export default function Input({
    typeOfInput = "text",
    placeholder,
    value: valueProp,
    defaultValue,
    onChange,
    onBlur,
    onSearchSubmit,
    errorMessage: errorMessageProp,
    disabled = false,
    className,
    onKeyDown,
    ...props
}) {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const errorId = useId();

    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;

    const isLinkInvalid = typeOfInput === "link" && value.length > 0 && !isValidLink(value);
    const isEmailInvalid = typeOfInput === "email" && value.length > 0 && !isValidEmail(value);
    const hasError = Boolean(errorMessageProp) || isLinkInvalid || isEmailInvalid;
    const linkErrorMessage = "Спокойно! Похоже это не ссылка...";
    const emailErrorMessage = "Спокойно! Похоже это не почта...";

    const handleChange = (e) => {
        if (!isControlled) setInternalValue(e.target.value);
        onChange?.(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleSearchSubmit = () => {
        if (typeOfInput === "search" && onSearchSubmit) onSearchSubmit(value.trim());
    };

    const handleKeyDown = (e) => {
        if (typeOfInput === "search" && e.key === "Enter") {
            e.preventDefault();
            handleSearchSubmit();
        }
        onKeyDown?.(e);
    };

    const inputType =
        typeOfInput === "password"
            ? passwordVisible
                ? "text"
                : "password"
            : typeOfInput === "link"
              ? "url"
              : typeOfInput === "email"
                ? "email"
                : "text";

    const showLinkIcon = typeOfInput === "link";
    const showPasswordToggle = typeOfInput === "password";
    const isSearch = typeOfInput === "search";

    return (
        <div className={`${styles.wrap} ${className ?? ""}`}>
            <div
                className={`${styles.root} ${styles[`root--${typeOfInput}`]} ${isFocused ? styles["root--focused"] : ""} ${hasError ? styles["root--error"] : ""}`}
            >
                <input
                    type={inputType}
                    className={`${styles.input} ${value.length > 0 ? styles["input--filled"] : ""} ${hasError ? styles["input--error"] : ""}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    disabled={disabled}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? errorId : undefined}
                    {...props}
                />
                {showLinkIcon && (
                    <span className={styles.iconRight} aria-hidden>
                        <img
                            src={hasError ? "/icons/system/Link Arrow Red.svg" : "/icons/system/Link Arrow.svg"}
                            alt=""
                            width={14}
                            height={14}
                            draggable={false}
                        />
                    </span>
                )}
                {showPasswordToggle && (
                    <button
                        type="button"
                        className={styles.iconButton}
                        onClick={() => setPasswordVisible((v) => !v)}
                        aria-label={passwordVisible ? "Скрыть пароль" : "Показать пароль"}
                        tabIndex={-1}
                    >
                        <img
                            key={passwordVisible ? "on" : "off"}
                            src={passwordVisible ? "/icons/system/Eye.svg" : "/icons/system/Eye-Closed.svg"}
                            alt=""
                            width={24}
                            height={20}
                            draggable={false}
                        />
                    </button>
                )}
                {isSearch && (
                    <button type="button" className={styles.searchButton} onClick={handleSearchSubmit} tabIndex={-1}>
                        <img src="/icons/system/Search.svg" alt="" width={20} height={20} draggable={false} />
                        <span>Найти</span>
                    </button>
                )}
            </div>
            {hasError && (
                <span id={errorId} className={`${styles.errorMessage} label`} style={{paddingLeft: 20}} role="alert">
                    {typeOfInput === "link" && isLinkInvalid
                        ? linkErrorMessage
                        : typeOfInput === "email" && isEmailInvalid
                          ? emailErrorMessage
                          : errorMessageProp}
                </span>
            )}
        </div>
    );
}

export function InputDemo() {
    return (
        <div className={styles.demo}>
            <Input typeOfInput="link" placeholder="https://link.com" />
            <Input typeOfInput="link" placeholder="https://link.com" defaultValue="https://link.co" />
            <Input typeOfInput="link" placeholder="https://link.com" defaultValue="Текст" />
            <Input typeOfInput="text" placeholder="Введите..." />
            <Input typeOfInput="text" placeholder="Введите..." defaultValue="Любой текст" />
            <Input typeOfInput="text" placeholder="Введите..." defaultValue="Текст" errorMessage="Спокойно! Неверный формат..." />
            <Input typeOfInput="password" placeholder="Пароль" />
            <Input typeOfInput="password" placeholder="Пароль" defaultValue="password" />
            <Input typeOfInput="password" placeholder="Пароль" defaultValue="wrong" errorMessage="Спокойно! Пароль не верный..." />
            <Input typeOfInput="search" placeholder="Например, Китай" />
            <Input typeOfInput="search" placeholder="Например, Китай" defaultValue="Япония 2028" />
        </div>
    );
}
