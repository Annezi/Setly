"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../../atomic/atoms/buttons/buttons";
import RoundButton from "../../../atomic/atoms/buttons-round/buttons-round";
import Input from "../../../atomic/molecules/input/input";
import Checkbox from "../../../atomic/atoms/checkbox/checkbox";
import PublicImage from "@/app/components/globals/public-image";
import { setAuth } from "@/app/lib/auth-storage";
import { apiFetch } from "@/app/lib/api";
import { applyTypograf } from "@/app/lib/typograf";
import styles from "./registration.module.css";

const API_PREFIX = "/api/user";

// Допустимые символы никнейма: латиница, кириллица, цифры, подчёркивание, дефис, пробелы
const NICKNAME_ALLOWED = /[^a-zA-Z\u0400-\u04FF0-9_\-\s]/g;
const NICKNAME_MAX_LENGTH = 40;

// Пароль: минимум 6 символов, без пробелов, только латиница, цифры и базовые символы
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_ALLOWED = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;':",./<>?`~\\]*$/;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

function normalizeNickname(value) {
    return value.replace(NICKNAME_ALLOWED, "").slice(0, NICKNAME_MAX_LENGTH);
}

function normalizePassword(value) {
    return value.replace(/\s/g, "");
}

function getPasswordError(value) {
    if (!value) return null;
    if (value.length < PASSWORD_MIN_LENGTH) {
        return "Спокойно! Пароль должен быть не менее 6 символов";
    }
    if (!PASSWORD_ALLOWED.test(value)) {
        return "Спокойно! Разрешены только английские буквы, цифры и базовые символы";
    }
    return null;
}

function getNicknameError(value) {
    if (!value || !value.trim()) return null;
    if (/\s{2,}/.test(value)) {
        return "Спокойно! Не используйте двойной пробел в никнейме";
    }
    if (value.length > NICKNAME_MAX_LENGTH) {
        return "Спокойно! Никнейм не должен превышать 40 символов";
    }
    return null;
}

function maskEmail(email) {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}***@${domain}`;
}

export default function Registration() {
    const router = useRouter();

    // --- Step 1: registration form ---
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [showAgreeError, setShowAgreeError] = useState(false);
    const [showEmailExistsError, setShowEmailExistsError] = useState(false);
    const [showNicknameExistsError, setShowNicknameExistsError] =
        useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordError, setPasswordError] = useState(null);

    // --- Step 2: email verification ---
    const [step, setStep] = useState("form"); // "form" | "verify"
    const [verifyOtp, setVerifyOtp] = useState("");
    const [verifyError, setVerifyError] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [pendingToken, setPendingToken] = useState(null);
    const [maskedEmail, setMaskedEmail] = useState("");
    const [cooldown, setCooldown] = useState(0);
    const cooldownRef = useRef(null);

    // --- Derived ---
    const nicknameError = getNicknameError(nickname);
    const nicknameDisplayError =
        nicknameError ??
        (showNicknameExistsError
            ? "Спокойно! Данный никнейм уже используется, попробуйте другой"
            : null);
    const passwordMismatch =
        password.length > 0 &&
        passwordAgain.length > 0 &&
        password !== passwordAgain;

    // --- Cooldown ---
    function startCooldown() {
        setCooldown(60);
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        cooldownRef.current = setInterval(() => {
            setCooldown((c) => {
                if (c <= 1) {
                    clearInterval(cooldownRef.current);
                    return 0;
                }
                return c - 1;
            });
        }, 1000);
    }

    // --- Handlers: step 1 ---
    const handleLoginClick = useCallback(() => {
        router.push("/login");
    }, [router]);

    const handleNicknameChange = useCallback((e) => {
        setNickname(normalizeNickname(e.target.value));
        setShowNicknameExistsError(false);
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e?.preventDefault?.();
            setShowEmailExistsError(false);
            setShowNicknameExistsError(false);
            setPasswordError(null);

            const nicknameTrimmed = nickname.trim().replace(/\s+/g, " ");
            if (getNicknameError(nickname)) {
                return;
            }

            if (!agreed) {
                setShowAgreeError(true);
                return;
            }
            setShowAgreeError(false);

            const emailTrimmed = email.trim();
            if (!emailTrimmed) return;
            if (!EMAIL_PATTERN.test(emailTrimmed)) return;

            const pwdError = getPasswordError(password);
            if (pwdError) {
                setPasswordError(pwdError);
                return;
            }
            setPasswordError(null);
            if (password !== passwordAgain) return;

            setIsSubmitting(true);
            try {
                const res = await apiFetch(`${API_PREFIX}/register`, {
                    method: "POST",
                    body: {
                        nickname: nicknameTrimmed || null,
                        email: emailTrimmed.toLowerCase(),
                        password,
                    },
                });
                const data = await res.json();

                if (res.ok && data.user) {
                    const token = data.access_token;
                    const expiresIn = data.expires_in;
                    setAuth(data.user, token, expiresIn);
                    setPendingToken(token);
                    setMaskedEmail(maskEmail(emailTrimmed.toLowerCase()));

                    // Request OTP immediately (fire and forget errors)
                    try {
                        await apiFetch("/api/user/verify-email/request", {
                            method: "POST",
                            headers: { Authorization: `Bearer ${token}` },
                            body: {},
                        });
                    } catch {}

                    startCooldown();
                    setStep("verify");
                    return;
                }

                const detail = (data.detail || "").toLowerCase();
                if (detail.includes("email") || data.error === "email_exists") {
                    setShowEmailExistsError(true);
                }
                if (
                    detail.includes("nickname") ||
                    data.error === "nickname_exists"
                ) {
                    setShowNicknameExistsError(true);
                }
            } catch {
                setShowEmailExistsError(true);
            } finally {
                setIsSubmitting(false);
            }
        },
        [agreed, nickname, email, password, passwordAgain],
    );

    const handleAgreeChange = useCallback((value) => {
        setAgreed(value);
        if (value) setShowAgreeError(false);
    }, []);

    const handleBackToRegistrationForm = useCallback(() => {
        setStep("form");
        setVerifyOtp("");
        setVerifyError(null);
    }, []);

    // --- Handlers: step 2 ---
    async function handleVerifySubmit(e) {
        e?.preventDefault?.();
        setVerifyError(null);
        if (!verifyOtp.trim()) return;
        setIsVerifying(true);
        try {
            const res = await apiFetch("/api/user/verify-email/confirm", {
                method: "POST",
                headers: { Authorization: `Bearer ${pendingToken}` },
                body: { otp: verifyOtp.trim().toUpperCase() },
            });
            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                setVerifyError(d.detail || "Неверный код");
                return;
            }
            router.push("/account");
        } catch {
            setVerifyError("Не удалось проверить код");
        } finally {
            setIsVerifying(false);
        }
    }

    async function handleResendVerify() {
        if (cooldown > 0 || !pendingToken) return;
        try {
            await apiFetch("/api/user/verify-email/request", {
                method: "POST",
                headers: { Authorization: `Bearer ${pendingToken}` },
                body: {},
            });
            startCooldown();
        } catch {}
    }

    // --- Render: step 'verify' ---
    if (step === "verify") {
        return (
            <div
                className={`${styles.wrapper} main-page-reveal__item`}
                style={{ "--reveal-delay": "60ms" }}
            >
                <div className={styles.orbBackground} aria-hidden />
                <div className={styles.content}>
                    <div
                        className={styles.backRow}
                        role="button"
                        tabIndex={0}
                        onClick={handleBackToRegistrationForm}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleBackToRegistrationForm();
                            }
                        }}
                        aria-label="Назад"
                    >
                        <RoundButton
                            variant="white"
                            icon={
                                <PublicImage
                                    src="/icons/system/ArrowLeft.svg"
                                    alt=""
                                    width={12}
                                    height={12}
                                    style={{ color: "var(--grayscale-dark-gray)" }}
                                />
                            }
                            aria-hidden
                        />
                        <span className={`subinfo ${styles.backRowText}`}>
                            Назад
                        </span>
                    </div>

                    <h1 className={`${styles.title} title_1`}>
                        Подтверждение почты
                    </h1>
                    <p className={`${styles.description} paragraph`}>
                        {applyTypograf(
                            'Введите код, который мы отправили на вашу почту. Если письма нет, проверьте папку "Спам"',
                        )}
                    </p>

                    <p
                        className={`subtitle_2`}
                        style={{
                            color: "var(--grayscale-white)",
                            marginBottom: 24,
                        }}
                    >
                        {maskedEmail}
                    </p>

                    <form
                        onSubmit={handleVerifySubmit}
                        noValidate
                        style={{ width: "100%" }}
                    >
                        <div className={styles.fieldGroup}>
                            <div className={`${styles.fieldLabel} subtitle_2`}>
                                Код подтверждения
                            </div>
                            <div className={styles.fieldInput}>
                                <Input
                                    typeOfInput="text"
                                    placeholder="A3F7B2"
                                    value={verifyOtp}
                                    onChange={(e) => {
                                        setVerifyOtp(
                                            e.target.value.toUpperCase(),
                                        );
                                        setVerifyError(null);
                                    }}
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    errorMessage={verifyError ?? undefined}
                                />
                            </div>
                        </div>

                        <div className={styles.submitButton} style={{ marginTop: 24 }}>
                            <Button
                                color="white"
                                Text={
                                    isVerifying ? "Проверка..." : "Подтвердить"
                                }
                                type="submit"
                                disabled={isVerifying}
                            />
                        </div>
                    </form>

                    <div className={styles.loginRow} style={{ marginTop: 60 }}>
                        {cooldown > 0 ? (
                            <span
                                className="subinfo"
                                style={{ color: "var(--grayscale-white)" }}
                            >
                                Отправить повторно через {cooldown}с
                            </span>
                        ) : (
                            <span
                                className="subtitle_2 linkStub"
                                role="button"
                                tabIndex={0}
                                onClick={handleResendVerify}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleResendVerify();
                                    }
                                }}
                                style={{
                                    color: "var(--grayscale-white)",
                                    cursor: "pointer",
                                }}
                            >
                                Отправить код повторно
                            </span>
                        )}
                    </div>

                    <div className={styles.loginRow} style={{ marginTop: 8 }}>
                        <span
                            className="subtitle_2 linkStub"
                            role="button"
                            tabIndex={0}
                            onClick={() => router.push("/account")}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    router.push("/account");
                                }
                            }}
                            style={{
                                color: "var(--grayscale-white)",
                                cursor: "pointer",
                            }}
                        >
                            Пропустить
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // --- Render: step 'form' ---
    return (
        <div
            className={`${styles.wrapper} main-page-reveal__item`}
            style={{ "--reveal-delay": "60ms" }}
        >
            <div className={styles.orbBackground} aria-hidden />
            <div className={styles.content}>
                <h1 className={`${styles.title} title_1`}>Регистрация</h1>
                <p className={`${styles.description} paragraph`}>
                    Сохраняйте планы, редактируйте свои наработки
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldGroup}>
                        <div className={`${styles.fieldLabel} subtitle_2`}>
                            Никнейм
                        </div>
                        <div className={styles.fieldInput}>
                            <Input
                                typeOfInput="text"
                                placeholder="Введите..."
                                value={nickname}
                                onChange={handleNicknameChange}
                                maxLength={NICKNAME_MAX_LENGTH}
                                errorMessage={nicknameDisplayError ?? undefined}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <div className={`${styles.fieldLabel} subtitle_2`}>
                            Почта
                        </div>
                        <div className={styles.fieldInput}>
                            <Input
                                typeOfInput="email"
                                placeholder="Введите..."
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setShowEmailExistsError(false);
                                }}
                                errorMessage={
                                    showEmailExistsError
                                        ? "Спокойно! Пользователь с данной почтой уже зарегистрирован, попробуйте Войти"
                                        : undefined
                                }
                                autoComplete="on"
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <div className={`${styles.fieldLabel} subtitle_2`}>
                            Пароль
                        </div>
                        <div className={styles.fieldInput}>
                            <Input
                                typeOfInput="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => {
                                    setPassword(
                                        normalizePassword(e.target.value),
                                    );
                                    setPasswordError(null);
                                }}
                                errorMessage={passwordError ?? undefined}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <div className={`${styles.fieldLabel} subtitle_2`}>
                            Пароль ещё раз
                        </div>
                        <div className={styles.fieldInput}>
                            <Input
                                typeOfInput="password"
                                placeholder="Пароль"
                                value={passwordAgain}
                                onChange={(e) =>
                                    setPasswordAgain(
                                        normalizePassword(e.target.value),
                                    )
                                }
                                errorMessage={
                                    passwordMismatch
                                        ? "Похоже, пароли не совпадают..."
                                        : undefined
                                }
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className={styles.policyRow}>
                        <Checkbox
                            checked={agreed}
                            onChange={handleAgreeChange}
                            aria-label="Согласие с условиями"
                        />
                        <span className={`${styles.policyText} label`}>
                            Я соглашаюсь с{" "}
                            <Link
                                href="/terms"
                                className={`subtitle_2 linkStub label ${styles.policyLink}`}
                            >
                                [Пользовательским соглашением]
                            </Link>{" "}
                            и даю согласие на обработку персональных данных в
                            соответствии с{" "}
                            <Link
                                href="/privacy"
                                className={`subtitle_2 linkStub label ${styles.policyLink}`}
                            >
                                [Политикой конфиденциальности]
                            </Link>
                            .
                        </span>
                    </div>
                    {showAgreeError && (
                        <span
                            className={`${styles.policyError} label`}
                            role="alert"
                        >
                            Спокойно! Поставьте галочку вот здесь...
                        </span>
                    )}

                    <div className={styles.submitButton}>
                        <Button
                            color="white"
                            Text={
                                isSubmitting
                                    ? "Регистрация..."
                                    : "Зарегистрироваться"
                            }
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className={styles.loginRow}>
                        <span className="subinfo">Уже есть аккаунт?</span>
                        <span
                            className="subtitle_2 linkStub"
                            role="button"
                            tabIndex={0}
                            onClick={handleLoginClick}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleLoginClick();
                                }
                            }}
                        >
                            Войти
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
