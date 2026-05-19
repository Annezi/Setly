"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../atomic/atoms/buttons/buttons";
import Input from "../../../atomic/molecules/input/input";
import { setAuth } from "@/app/lib/auth-storage";
import {
    getEmailVerificationPath,
    isEmailVerified,
    setPendingEmailVerification,
} from "@/app/lib/email-verification";
import { apiFetch } from "@/app/lib/api";
import styles from "./login.module.css";
import checkplanStyles from "@/app/create-checkplan/create-checkplan.module.css";

const API_PREFIX = "/api/user";
const OTP_COOLDOWN = 60; // seconds before resend allowed

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorType, setErrorType] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── 2FA modal state ─────────────────────────────────────────────────────
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [twoFAMethods, setTwoFAMethods] = useState([]); // ["totp"] or ["totp","email_otp"]
    const [twoFAStep, setTwoFAStep] = useState("choose"); // "choose" | "totp" | "email_otp"
    const [totpCode, setTotpCode] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [otpCooldown, setOtpCooldown] = useState(0);
    const [totpError, setTotpError] = useState(null);
    const [otpError, setOtpError] = useState(null);
    const cooldownRef = useRef(null);

    // ── Cooldown timer ──────────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            if (cooldownRef.current) clearInterval(cooldownRef.current);
        };
    }, []);

    const startOtpCooldown = useCallback(() => {
        setOtpCooldown(OTP_COOLDOWN);
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        cooldownRef.current = setInterval(() => {
            setOtpCooldown((prev) => {
                if (prev <= 1) {
                    if (cooldownRef.current) clearInterval(cooldownRef.current);
                    cooldownRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const handleRegisterClick = useCallback(() => {
        router.push("/registration");
    }, [router]);

    const handleRecoveryClick = useCallback(() => {
        router.push("/recovery");
    }, [router]);

    // ── Redirect after successful login ────────────────────────────────────
    const finishLogin = useCallback(
        async (loginData) => {
            const access_token = loginData.access_token;
            const expires_in = loginData.expires_in ?? 3600;
            let user = loginData.user;
            if (!access_token || !user?.id) return;
            setAuth(user, access_token, expires_in);
            setShow2FAModal(false);
            if (!isEmailVerified(user)) {
                setPendingEmailVerification(true);
                router.push(getEmailVerificationPath());
                return;
            }
            setPendingEmailVerification(false);
            router.push("/account");
        },
        [router],
    );

    // ── Step 1: email + password ───────────────────────────────────────────
    const handleSubmit = useCallback(
        async (e) => {
            e?.preventDefault?.();
            setErrorType(null);
            const emailTrimmed = email.trim().toLowerCase();
            if (!emailTrimmed) return;
            if (!password) return;

            setIsSubmitting(true);
            try {
                const loginRes = await apiFetch(`${API_PREFIX}/login`, {
                    method: "POST",
                    body: { email: emailTrimmed, password },
                });
                const loginData = await loginRes.json();

                if (!loginRes.ok) {
                    const detail = (loginData.detail || "").toLowerCase();
                    if (
                        detail.includes("password") ||
                        "incorrect" in loginData
                    ) {
                        setErrorType("wrong_password");
                    } else {
                        setErrorType("email_not_found");
                    }
                    return;
                }

                // ── 2FA required ──────────────────────────────────────────────
                if (loginData.requires_2fa) {
                    const methods = loginData.requires_2fa_methods || ["totp"];
                    setTwoFAMethods(methods);
                    setTwoFAStep(methods.length === 1 ? methods[0] : "choose");
                    setTotpCode("");
                    setOtpCode("");
                    setTotpError(null);
                    setOtpError(null);
                    setShow2FAModal(true);
                    return;
                }

                await finishLogin(loginData);
            } catch {
                setErrorType("email_not_found");
            } finally {
                setIsSubmitting(false);
            }
        },
        [email, password, router, finishLogin],
    );

    // ── Close 2FA modal ─────────────────────────────────────────────────────
    const close2FAModal = useCallback(() => {
        setShow2FAModal(false);
        setTwoFAStep("choose");
        setTotpCode("");
        setOtpCode("");
        setTotpError(null);
        setOtpError(null);
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        setOtpCooldown(0);
    }, []);

    // ── TOTP submit ─────────────────────────────────────────────────────────
    const handleTotpSubmit = useCallback(
        async (e) => {
            e?.preventDefault?.();
            setTotpError(null);
            if (!totpCode || totpCode.length < 6) {
                setTotpError("Введите 6-значный код");
                return;
            }

            setIsSubmitting(true);
            try {
                const loginRes = await apiFetch(`${API_PREFIX}/login`, {
                    method: "POST",
                    body: {
                        email: email.trim().toLowerCase(),
                        password,
                        totp_code: totpCode,
                    },
                });
                const loginData = await loginRes.json();

                if (!loginRes.ok) {
                    setTotpError(
                        "Неверный код. Проверьте приложение-аутентификатор",
                    );
                    return;
                }

                await finishLogin(loginData);
            } catch {
                setTotpError(
                    "Неверный код. Проверьте приложение-аутентификатор",
                );
            } finally {
                setIsSubmitting(false);
            }
        },
        [email, password, totpCode, finishLogin],
    );

    // ── Email OTP: request ──────────────────────────────────────────────────
    const handleOtpRequest = useCallback(async () => {
        setOtpError(null);
        try {
            await apiFetch(`${API_PREFIX}/login/otp/request`, {
                method: "POST",
                body: { email: email.trim().toLowerCase() },
            });
            startOtpCooldown();
        } catch {
            // silently fail - anti-enumeration
            startOtpCooldown();
        }
    }, [email, startOtpCooldown]);

    // ── Email OTP: verify ───────────────────────────────────────────────────
    const handleOtpVerify = useCallback(
        async (e) => {
            e?.preventDefault?.();
            setOtpError(null);
            if (!otpCode || otpCode.length < 6) {
                setOtpError("Введите 6-значный код");
                return;
            }

            setIsSubmitting(true);
            try {
                const loginRes = await apiFetch(
                    `${API_PREFIX}/login/otp/verify`,
                    {
                        method: "POST",
                        body: {
                            email: email.trim().toLowerCase(),
                            password,
                            otp: otpCode,
                        },
                    },
                );
                const loginData = await loginRes.json();

                if (!loginRes.ok) {
                    setOtpError("Неверный код или срок действия истёк");
                    return;
                }

                await finishLogin(loginData);
            } catch {
                setOtpError("Неверный код или срок действия истёк");
            } finally {
                setIsSubmitting(false);
            }
        },
        [email, password, otpCode, finishLogin],
    );

    const passwordError =
        errorType === "wrong_password"
            ? "Спокойно! Пароль неверный"
            : undefined;

    const emailError =
        errorType === "email_not_found"
            ? "Спокойно! Проверьте правильно ли указана почта, либо попробуйте Восстановить пароль или Зарегистрироваться"
            : undefined;

    return (
        <>
            {/* ════════════════════════════════════════════════════════════════════
          Normal login page
          ════════════════════════════════════════════════════════════════════ */}
            <div className={styles.wrapper}>
                <div className={styles.orbBackground} aria-hidden />
                <div className={styles.content}>
                    <h1 className={`${styles.title} title_1`}>
                        Войти в аккаунт
                    </h1>
                    <p className={`${styles.description} paragraph`}>
                        Сохраняйте планы, редактируйте свои наработки
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
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
                                        if (errorType) setErrorType(null);
                                    }}
                                    errorMessage={emailError}
                                    autoComplete="email"
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
                                        setPassword(e.target.value);
                                        if (errorType) setErrorType(null);
                                    }}
                                    errorMessage={passwordError}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <div className={styles.resetRow}>
                            <span className="subinfo">Забыли пароль?</span>
                            <span
                                className="subtitle_2 linkStub"
                                role="button"
                                tabIndex={0}
                                onClick={handleRecoveryClick}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleRecoveryClick();
                                    }
                                }}
                            >
                                Восстановить
                            </span>
                        </div>

                        <div className={styles.submitButton}>
                            <Button
                                color="white"
                                Text={isSubmitting ? "Вход..." : "Войти"}
                                type="submit"
                                disabled={isSubmitting}
                            />
                        </div>
                    </form>

                    <div className={styles.registerRow}>
                        <span className="subinfo">Еще нет аккаунта?</span>
                        <span
                            className="subtitle_2 linkStub"
                            role="button"
                            tabIndex={0}
                            onClick={handleRegisterClick}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleRegisterClick();
                                }
                            }}
                        >
                            Зарегистрироваться
                        </span>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════════
          2FA Modal overlay
          ════════════════════════════════════════════════════════════════════ */}
            {show2FAModal && (
                <div
                    className={checkplanStyles.deleteConfirmOverlay}
                    onClick={close2FAModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Двухфакторная аутентификация"
                >
                    <div
                        className={checkplanStyles.deleteConfirmPopup}
                        style={{ width: "min(400px, 94vw)", alignItems: "stretch" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ── Step: choose method ──────────────────────────────── */}
                        {twoFAStep === "choose" && (
                            <>
                                <h2 className={`${styles.modalTitle} title_2`}>
                                    Двухфакторная аутентификация
                                </h2>
                                <p className={`${styles.modalDesc} paragraph`}>
                                    Выберите способ подтверждения входа
                                </p>

                                <div className={styles.methodGrid}>
                                    {twoFAMethods.includes("totp") && (
                                        <button
                                            type="button"
                                            className={styles.methodCard}
                                            onClick={() => {
                                                setTwoFAStep("totp");
                                                setTotpCode("");
                                                setTotpError(null);
                                            }}
                                        >
                                            <span className={styles.methodIcon}>
                                                📱
                                            </span>
                                            <span
                                                className={styles.methodLabel}
                                            >
                                                Приложение-аутентификатор
                                            </span>
                                            <span className={styles.methodHint}>
                                                Google Authenticator, Authy
                                            </span>
                                        </button>
                                    )}
                                    {twoFAMethods.includes("email_otp") && (
                                        <button
                                            type="button"
                                            className={styles.methodCard}
                                            onClick={() => {
                                                setTwoFAStep("email_otp");
                                                setOtpCode("");
                                                setOtpError(null);
                                                handleOtpRequest();
                                            }}
                                        >
                                            <span className={styles.methodIcon}>
                                                ✉️
                                            </span>
                                            <span
                                                className={styles.methodLabel}
                                            >
                                                Код на почту
                                            </span>
                                            <span className={styles.methodHint}>
                                                Отправим код на {email}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        {/* ── Step: TOTP app ───────────────────────────────────── */}
                        {twoFAStep === "totp" && (
                            <>
                                <div className={styles.modalBackRow}>
                                    {twoFAMethods.length > 1 && (
                                        <span
                                            className="subtitle_2 linkStub"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => {
                                                setTwoFAStep("choose");
                                                setTotpError(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.preventDefault();
                                                    setTwoFAStep("choose");
                                                }
                                            }}
                                        >
                                            ← Назад
                                        </span>
                                    )}
                                </div>

                                <h2 className={`${styles.modalTitle} title_2`}>
                                    Код из приложения
                                </h2>
                                <p className={`${styles.modalDesc} paragraph`}>
                                    Откройте Google Authenticator или Authy и
                                    введите 6-значный код
                                </p>

                                <form onSubmit={handleTotpSubmit} noValidate>
                                    <div className={styles.modalFieldGroup}>
                                        <div
                                            className={`${styles.modalFieldLabel} subtitle_2`}
                                        >
                                            Код 2FA
                                        </div>
                                        <div className={styles.modalFieldInput}>
                                            <Input
                                                typeOfInput="text"
                                                placeholder="123456"
                                                value={totpCode}
                                                onChange={(e) => {
                                                    setTotpCode(
                                                        e.target.value
                                                            .replace(/\D/g, "")
                                                            .slice(0, 6),
                                                    );
                                                    if (totpError)
                                                        setTotpError(null);
                                                }}
                                                errorMessage={totpError}
                                                autoComplete="one-time-code"
                                                inputMode="numeric"
                                                maxLength={6}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.modalSubmitButton}>
                                        <Button
                                            color="blue"
                                            Text={
                                                isSubmitting
                                                    ? "Проверка..."
                                                    : "Подтвердить"
                                            }
                                            type="submit"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </form>
                            </>
                        )}

                        {/* ── Step: email OTP ──────────────────────────────────── */}
                        {twoFAStep === "email_otp" && (
                            <>
                                <div className={styles.modalBackRow}>
                                    {twoFAMethods.length > 1 && (
                                        <span
                                            className="subtitle_2 linkStub"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => {
                                                setTwoFAStep("choose");
                                                setOtpError(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.preventDefault();
                                                    setTwoFAStep("choose");
                                                }
                                            }}
                                        >
                                            ← Назад
                                        </span>
                                    )}
                                </div>

                                <h2 className={`${styles.modalTitle} title_2`}>
                                    Код отправлен на почту
                                </h2>
                                <p className={`${styles.modalDesc} paragraph`}>
                                    Мы отправили 6-значный код на{" "}
                                    <strong>{email}</strong>. Проверьте папку
                                    «Входящие» и «Спам».
                                </p>

                                <form onSubmit={handleOtpVerify} noValidate>
                                    <div className={styles.modalFieldGroup}>
                                        <div
                                            className={`${styles.modalFieldLabel} subtitle_2`}
                                        >
                                            Код из письма
                                        </div>
                                        <div className={styles.modalFieldInput}>
                                            <Input
                                                typeOfInput="text"
                                                placeholder="123456"
                                                value={otpCode}
                                                onChange={(e) => {
                                                    setOtpCode(
                                                        e.target.value
                                                            .replace(/\D/g, "")
                                                            .slice(0, 6),
                                                    );
                                                    if (otpError)
                                                        setOtpError(null);
                                                }}
                                                errorMessage={otpError}
                                                autoComplete="one-time-code"
                                                inputMode="numeric"
                                                maxLength={6}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.modalSubmitButton}>
                                        <Button
                                            color="blue"
                                            Text={
                                                isSubmitting
                                                    ? "Проверка..."
                                                    : "Подтвердить"
                                            }
                                            type="submit"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </form>

                                <div
                                    className={styles.resetRow}
                                    style={{ marginTop: 12 }}
                                >
                                    <span className="subinfo">
                                        {otpCooldown > 0
                                            ? `Повторная отправка через ${otpCooldown}с`
                                            : "Не пришёл код?"}
                                    </span>
                                    {otpCooldown === 0 && (
                                        <span
                                            className="subtitle_2 linkStub"
                                            role="button"
                                            tabIndex={0}
                                            onClick={handleOtpRequest}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.preventDefault();
                                                    handleOtpRequest();
                                                }
                                            }}
                                        >
                                            Отправить ещё раз
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
