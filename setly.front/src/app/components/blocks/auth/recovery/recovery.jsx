"use client";

import { useCallback, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../atomic/atoms/buttons/buttons";
import Input from "../../../atomic/molecules/input/input";
import { apiFetch } from "@/app/lib/api";
import styles from "./recovery.module.css";

const API_PREFIX = "/api/user";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

function toErrorText(detail, fallback) {
    if (!detail) return fallback;
    const translate = (text) => {
        const msg = String(text || "").trim();
        const low = msg.toLowerCase();
        if (low.includes("not a valid email"))
            return "Спокойно! Введите корректную почту";
        if (low.includes("email address"))
            return "Спокойно! Введите корректную почту";
        if (low.includes("field required"))
            return "Спокойно! Введите вашу почту";
        return msg || fallback;
    };
    if (typeof detail === "string") return translate(detail);
    if (Array.isArray(detail)) {
        const first = detail[0];
        if (typeof first === "string") return translate(first);
        if (first && typeof first === "object" && typeof first.msg === "string")
            return translate(first.msg);
        return fallback;
    }
    if (typeof detail === "object" && typeof detail.msg === "string")
        return translate(detail.msg);
    return fallback;
}

function maskEmail(email) {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}***@${domain}`;
}

export default function Recovery() {
    const router = useRouter();

    // ── Step "email" state ────────────────────────────────────────────────────
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Step "otp" state ──────────────────────────────────────────────────────
    const [step, setStep] = useState("email"); // "email" | "otp"
    const [userId, setUserId] = useState(null);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const cooldownRef = useRef(null);

    const emailTrimmed = useMemo(() => email.trim(), [email]);

    // ── Cooldown ──────────────────────────────────────────────────────────────
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

    // ── Handlers: step "email" ────────────────────────────────────────────────
    const handleLoginClick = useCallback(() => {
        router.push("/login");
    }, [router]);

    const handleSubmit = useCallback(
        async (e) => {
            e?.preventDefault?.();
            setErrorMessage(null);

            if (!emailTrimmed || !EMAIL_PATTERN.test(emailTrimmed)) {
                return;
            }

            setIsSubmitting(true);
            try {
                const res = await apiFetch(
                    `${API_PREFIX}/recovery/otp/request`,
                    {
                        method: "POST",
                        body: { email: emailTrimmed.toLowerCase() },
                    },
                );
                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                    if (res.status === 404) {
                        setErrorMessage(
                            "Спокойно! Данная почта не зарегистрирована на Setly",
                        );
                        return;
                    }
                    setErrorMessage(
                        toErrorText(
                            data.detail,
                            "Не удалось отправить письмо. Попробуйте позже.",
                        ),
                    );
                    return;
                }

                setUserId(data.user_id ?? null);
                startCooldown();
                setStep("otp");
            } catch {
                setErrorMessage(
                    "Не удалось отправить письмо. Попробуйте позже.",
                );
            } finally {
                setIsSubmitting(false);
            }
        },
        [emailTrimmed],
    );

    // ── Handlers: step "otp" ─────────────────────────────────────────────────
    async function handleOtpSubmit(e) {
        e?.preventDefault?.();
        setOtpError(null);
        if (!otp.trim()) return;
        setIsConfirming(true);
        try {
            const res = await apiFetch(`${API_PREFIX}/recovery/otp/confirm`, {
                method: "POST",
                body: {
                    email: emailTrimmed.toLowerCase(),
                    otp: otp.trim().toUpperCase(),
                },
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setOtpError(data.detail || "Неверный код");
                return;
            }
            // redirect to newpass with token
            router.push(`/newpass?token=${encodeURIComponent(data.token)}`);
        } catch {
            setOtpError("Не удалось проверить код");
        } finally {
            setIsConfirming(false);
        }
    }

    async function handleResend() {
        if (cooldown > 0) return;
        try {
            await apiFetch(`${API_PREFIX}/recovery/otp/request`, {
                method: "POST",
                body: { email: emailTrimmed.toLowerCase() },
            });
            startCooldown();
            setOtpError(null);
        } catch {}
    }

    // ── Render: step "otp" ────────────────────────────────────────────────────
    if (step === "otp") {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className={`${styles.title} title_1`}>
                        Восстановление пароля
                    </h1>
                    <p className={`${styles.description} paragraph`}>
                        Введите код, который мы отправили на вашу почту
                    </p>

                    <p
                        className="subtitle_2"
                        style={{
                            color: "var(--grayscale-white)",
                            marginBottom: 24,
                        }}
                    >
                        {maskEmail(emailTrimmed.toLowerCase())}
                    </p>

                    <form
                        onSubmit={handleOtpSubmit}
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
                                    value={otp}
                                    onChange={(e) => {
                                        setOtp(e.target.value.toUpperCase());
                                        setOtpError(null);
                                    }}
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    errorMessage={otpError ?? undefined}
                                />
                            </div>
                        </div>

                        <div className={styles.submitButton}>
                            <Button
                                color="white"
                                Text={
                                    isConfirming ? "Проверка..." : "Продолжить"
                                }
                                type="submit"
                                disabled={isConfirming}
                            />
                        </div>
                    </form>

                    <div className={styles.bottomRow} style={{ marginTop: 12 }}>
                        <span
                            className="subtitle_2 linkStub"
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                                setStep("email");
                                setOtp("");
                                setOtpError(null);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setStep("email");
                                    setOtp("");
                                    setOtpError(null);
                                }
                            }}
                            style={{
                                color: "var(--grayscale-white)",
                                cursor: "pointer",
                            }}
                        >
                            ← Назад
                        </span>
                    </div>

                    <div className={styles.bottomRow} style={{ marginTop: 8 }}>
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
                                onClick={handleResend}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleResend();
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

                    <div className={styles.bottomRow} style={{ marginTop: 12 }}>
                        <span className="subinfo">Вспомнили пароль?</span>
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
                </div>
            </div>
        );
    }

    // ── Render: step "email" ──────────────────────────────────────────────────
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1 className={`${styles.title} title_1`}>
                    Восстановление пароля
                </h1>
                <p className={`${styles.description} paragraph`}>
                    Укажите почту, и мы отправим код для смены пароля
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldGroup}>
                        <div className={`${styles.fieldLabel} subtitle_2`}>
                            Введите вашу почту
                        </div>
                        <div className={styles.fieldInput}>
                            <Input
                                typeOfInput="email"
                                placeholder="Введите..."
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errorMessage) setErrorMessage(null);
                                }}
                                errorMessage={errorMessage ?? undefined}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className={styles.submitButton}>
                        <Button
                            color="white"
                            Text={isSubmitting ? "Отправка..." : "Восстановить"}
                            type="submit"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>

                <div className={styles.bottomRow}>
                    <span className="subinfo">Вспомнили пароль?</span>
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
            </div>
        </div>
    );
}
