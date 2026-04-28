"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { requestAdminOtp, verifyAdminOtp, setToken } from "@/lib/api";

const RESEND_COOLDOWN = 60;

function maskEmail(email) {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}***@${domain}`;
}

// ── Shared input style helper ─────────────────────────────────────────────────

function inputStyle(overrides = {}) {
    return {
        width: "100%",
        padding: "10px 14px",
        border: "1.5px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        fontSize: 14,
        outline: "none",
        transition: "border-color 0.15s",
        background: "#fff",
        color: "var(--color-text)",
        boxSizing: "border-box",
        ...overrides,
    };
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LoginPage() {
    const router = useRouter();

    // step: "credentials" | "otp"
    const [step, setStep] = useState("credentials");

    // credentials step state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // otp step state
    const [userId, setUserId] = useState(null);
    const [otp, setOtp] = useState("");
    const [cooldown, setCooldown] = useState(0);

    // shared
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const cooldownRef = useRef(null);

    // Start / restart the 60s resend cooldown timer
    function startCooldown() {
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        setCooldown(RESEND_COOLDOWN);
        cooldownRef.current = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(cooldownRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (cooldownRef.current) clearInterval(cooldownRef.current);
        };
    }, []);

    // ── Step 1 — credentials ────────────────────────────────────────────────────

    async function handleCredentialsSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await requestAdminOtp(email, password);
            setUserId(data.user_id);
            setOtp("");
            setStep("otp");
            startCooldown();
        } catch (err) {
            setError(err.message || "Неверный email или пароль");
        } finally {
            setLoading(false);
        }
    }

    // ── Step 2 — OTP ────────────────────────────────────────────────────────────

    async function handleOtpSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await verifyAdminOtp(userId, otp);
            setToken(data.access_token);
            router.replace("/");
        } catch (err) {
            setError(err.message || "Неверный код");
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        if (cooldown > 0 || loading) return;
        setError("");
        setLoading(true);
        try {
            const data = await requestAdminOtp(email, password);
            setUserId(data.user_id);
            setOtp("");
            startCooldown();
        } catch (err) {
            setError(err.message || "Не удалось отправить код");
        } finally {
            setLoading(false);
        }
    }

    function handleBack() {
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        setCooldown(0);
        setStep("credentials");
        setOtp("");
        setError("");
    }

    // ── Layout shell ────────────────────────────────────────────────────────────

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1c2333 0%, #2d3748 100%)",
                padding: 20,
            }}
        >
            <div style={{ width: "100%", maxWidth: 400 }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: "var(--color-primary)",
                            marginBottom: 16,
                            boxShadow: "0 8px 24px rgba(26,115,232,0.4)",
                        }}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1
                        style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: "#fff",
                            marginBottom: 6,
                        }}
                    >
                        Setly Admin
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                        Панель управления
                    </p>
                </div>

                {/* Card */}
                <div
                    style={{
                        background: "var(--color-surface)",
                        borderRadius: "var(--radius-lg)",
                        padding: "32px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                    }}
                >
                    {step === "credentials" ? (
                        <CredentialsStep
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            loading={loading}
                            error={error}
                            onSubmit={handleCredentialsSubmit}
                        />
                    ) : (
                        <OtpStep
                            email={email}
                            otp={otp}
                            setOtp={setOtp}
                            loading={loading}
                            error={error}
                            cooldown={cooldown}
                            onSubmit={handleOtpSubmit}
                            onResend={handleResend}
                            onBack={handleBack}
                        />
                    )}
                </div>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: 20,
                        color: "rgba(255,255,255,0.3)",
                        fontSize: 12,
                    }}
                >
                    Только для авторизованных администраторов{" "}
                    <a
                        href="https://e.mail.ru/inbox/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        mail.ru
                    </a>
                </p>
            </div>
        </div>
    );
}

// ── Step 1 component ──────────────────────────────────────────────────────────

function CredentialsStep({
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    onSubmit,
}) {
    return (
        <>
            <h2
                style={{
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 24,
                    color: "var(--color-text)",
                }}
            >
                Вход в систему
            </h2>

            <form
                onSubmit={onSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
                <div>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="somesecretemail@somewhere.com"
                        style={inputStyle()}
                        onFocus={(e) =>
                            (e.target.style.borderColor =
                                "var(--color-primary)")
                        }
                        onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                        }
                    />
                </div>

                <div>
                    <label style={labelStyle}>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        style={inputStyle()}
                        onFocus={(e) =>
                            (e.target.style.borderColor =
                                "var(--color-primary)")
                        }
                        onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                        }
                    />
                </div>

                <ErrorBox message={error} />

                <SubmitButton
                    loading={loading}
                    label="Получить код"
                    loadingLabel="Отправка..."
                />
            </form>
        </>
    );
}

// ── Step 2 component ──────────────────────────────────────────────────────────

function OtpStep({
    email,
    otp,
    setOtp,
    loading,
    error,
    cooldown,
    onSubmit,
    onResend,
    onBack,
}) {
    return (
        <>
            {/* Header row with back button */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 20,
                }}
            >
                <button
                    type="button"
                    onClick={onBack}
                    style={{
                        background: "none",
                        border: "none",
                        padding: "4px 0",
                        cursor: "pointer",
                        color: "var(--color-primary)",
                        fontSize: 13,
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        flexShrink: 0,
                    }}
                >
                    ← Назад
                </button>
                <h2
                    style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--color-text)",
                        margin: 0,
                    }}
                >
                    Введите код
                </h2>
            </div>

            {/* Delivery notice */}
            <div
                style={{
                    padding: "10px 14px",
                    background: "rgba(26,115,232,0.08)",
                    border: "1px solid rgba(26,115,232,0.25)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: 20,
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                }}
            >
                Код отправлен на почту{" "}
                <span
                    style={{
                        fontWeight: 600,
                        color: "var(--color-text)",
                        wordBreak: "break-all",
                    }}
                >
                    {maskEmail(email)}
                </span>
            </div>

            <form
                onSubmit={onSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
                <div>
                    <label style={labelStyle}>Код подтверждения</label>
                    <input
                        type="text"
                        inputMode="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.toUpperCase())}
                        required
                        maxLength={6}
                        placeholder="A3F7B2"
                        autoComplete="one-time-code"
                        autoFocus
                        style={inputStyle({
                            fontSize: 28,
                            fontWeight: 700,
                            letterSpacing: 8,
                            textAlign: "center",
                            padding: "14px",
                        })}
                        onFocus={(e) =>
                            (e.target.style.borderColor =
                                "var(--color-primary)")
                        }
                        onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                        }
                    />
                </div>

                <ErrorBox message={error} />

                <SubmitButton
                    loading={loading}
                    label="Войти"
                    loadingLabel="Проверка..."
                />

                {/* Resend */}
                <div style={{ textAlign: "center" }}>
                    {cooldown > 0 ? (
                        <span
                            style={{
                                fontSize: 13,
                                color: "var(--color-text-secondary)",
                            }}
                        >
                            Повторить через {cooldown}с
                        </span>
                    ) : (
                        <button
                            type="button"
                            onClick={onResend}
                            disabled={loading}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: loading ? "not-allowed" : "pointer",
                                color: loading
                                    ? "var(--color-text-secondary)"
                                    : "var(--color-primary)",
                                fontSize: 13,
                                fontWeight: 500,
                                textDecoration: "underline",
                                textDecorationStyle: "dashed",
                                textUnderlineOffset: 3,
                            }}
                        >
                            Отправить код повторно
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function ErrorBox({ message }) {
    if (!message) return null;
    return (
        <div
            style={{
                padding: "10px 14px",
                background: "#fff5f5",
                border: "1px solid #fed7d7",
                borderRadius: "var(--radius-md)",
                color: "var(--color-danger)",
                fontSize: 13,
            }}
        >
            {message}
        </div>
    );
}

function SubmitButton({ loading, label, loadingLabel }) {
    return (
        <button
            type="submit"
            disabled={loading}
            style={{
                width: "100%",
                padding: "11px 20px",
                background: loading ? "#93b4e8" : "var(--color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
                marginTop: 4,
                letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
                if (!loading)
                    e.currentTarget.style.background =
                        "var(--color-primary-hover)";
            }}
            onMouseLeave={(e) => {
                if (!loading)
                    e.currentTarget.style.background = "var(--color-primary)";
            }}
        >
            {loading ? loadingLabel : label}
        </button>
    );
}

const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    marginBottom: 6,
};
