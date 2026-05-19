"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import useAdminGuard from "@/lib/useAdminGuard";
import {
  fetchMe,
  updateMe,
  setup2FA,
  enable2FA,
  disable2FA,
} from "@/lib/api";

// ── Shared style atoms ────────────────────────────────────────────────────────

const S = {
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    border: "1.5px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    fontSize: 14,
    color: "var(--color-text)",
    background: "#fff",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  },
  field: { marginBottom: 16 },
  btnPrimary: {
    background: "var(--color-primary)",
    color: "#fff",
    border: "none",
    padding: "9px 18px",
    borderRadius: "var(--radius-md)",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
  btnDanger: {
    background: "var(--color-danger)",
    color: "#fff",
    border: "none",
    padding: "9px 18px",
    borderRadius: "var(--radius-md)",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
  btnSecondary: {
    background: "transparent",
    color: "var(--color-text)",
    border: "1.5px solid var(--color-border)",
    padding: "9px 18px",
    borderRadius: "var(--radius-md)",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
  ok: {
    color: "var(--color-success)",
    fontSize: 13,
    marginTop: 8,
  },
  err: {
    color: "var(--color-danger)",
    fontSize: 13,
    marginTop: 8,
  },
  card: {
    background: "#fff",
    borderRadius: "var(--radius-lg)",
    padding: 28,
    boxShadow: "var(--shadow-sm)",
    border: "1px solid var(--color-border)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "var(--color-text)",
    marginBottom: 20,
    borderLeft: "3px solid var(--color-primary)",
    paddingLeft: 12,
  },
};

// ── Input with focus-border highlight ────────────────────────────────────────

function Field({ label, id, value, onChange, type = "text", placeholder, maxLength, inputMode }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={S.field}>
      {label && <label htmlFor={id} style={S.label}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        autoComplete="off"
        style={{
          ...S.input,
          borderColor: focused ? "var(--color-primary)" : "var(--color-border)",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────

function Divider() {
  return (
    <div style={{
      borderTop: "1px solid var(--color-border)",
      margin: "24px 0",
    }} />
  );
}

// ── Account card ─────────────────────────────────────────────────────────────

function AccountCard({ user, onUserUpdated }) {
  // Email form
  const [newEmail, setNewEmail]         = useState("");
  const [emailPass, setEmailPass]       = useState("");
  const [emailOk, setEmailOk]           = useState("");
  const [emailErr, setEmailErr]         = useState("");
  const [emailBusy, setEmailBusy]       = useState(false);

  // Password form
  const [curPass, setCurPass]           = useState("");
  const [newPass, setNewPass]           = useState("");
  const [newPass2, setNewPass2]         = useState("");
  const [passOk, setPassOk]             = useState("");
  const [passErr, setPassErr]           = useState("");
  const [passBusy, setPassBusy]         = useState(false);

  async function handleEmailSave(e) {
    e.preventDefault();
    setEmailOk(""); setEmailErr("");
    if (!newEmail.trim()) { setEmailErr("Введите новую почту."); return; }
    if (!emailPass)       { setEmailErr("Введите текущий пароль."); return; }
    setEmailBusy(true);
    try {
      const updated = await updateMe({ email: newEmail.trim(), current_password: emailPass });
      onUserUpdated(updated);
      setEmailOk("Почта успешно обновлена.");
      setNewEmail(""); setEmailPass("");
    } catch (err) {
      setEmailErr(err.message || "Ошибка при сохранении.");
    } finally {
      setEmailBusy(false);
    }
  }

  async function handlePassSave(e) {
    e.preventDefault();
    setPassOk(""); setPassErr("");
    if (!curPass)          { setPassErr("Введите текущий пароль."); return; }
    if (!newPass)          { setPassErr("Введите новый пароль."); return; }
    if (newPass !== newPass2) { setPassErr("Пароли не совпадают."); return; }
    setPassBusy(true);
    try {
      await updateMe({ new_password: newPass, current_password: curPass });
      setPassOk("Пароль успешно изменён.");
      setCurPass(""); setNewPass(""); setNewPass2("");
    } catch (err) {
      setPassErr(err.message || "Ошибка при смене пароля.");
    } finally {
      setPassBusy(false);
    }
  }

  return (
    <div style={S.card}>
      <div style={S.cardTitle}>Аккаунт</div>

      {/* Current email display */}
      <div style={{ marginBottom: 20 }}>
        <div style={S.label}>Текущая почта</div>
        <div style={{
          padding: "9px 12px",
          background: "var(--color-bg)",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--color-border)",
          fontSize: 14,
          color: "var(--color-text)",
          wordBreak: "break-all",
        }}>
          {user ? user.email : "—"}
        </div>
      </div>

      {/* Change email */}
      <form onSubmit={handleEmailSave}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", marginBottom: 14 }}>
          Изменить почту
        </div>
        <Field
          label="Новая почта"
          id="new-email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="new@example.com"
        />
        <Field
          label="Текущий пароль"
          id="email-cur-pass"
          type="password"
          value={emailPass}
          onChange={(e) => setEmailPass(e.target.value)}
        />
        <button
          type="submit"
          disabled={emailBusy}
          style={{ ...S.btnPrimary, opacity: emailBusy ? 0.65 : 1 }}
        >
          {emailBusy ? "Сохранение…" : "Сохранить"}
        </button>
        {emailOk  && <div style={S.ok}>{emailOk}</div>}
        {emailErr && <div style={S.err}>{emailErr}</div>}
      </form>

      <Divider />

      {/* Change password */}
      <form onSubmit={handlePassSave}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)", marginBottom: 14 }}>
          Изменить пароль
        </div>
        <Field
          label="Текущий пароль"
          id="cur-pass"
          type="password"
          value={curPass}
          onChange={(e) => setCurPass(e.target.value)}
        />
        <Field
          label="Новый пароль"
          id="new-pass"
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <Field
          label="Новый пароль ещё раз"
          id="new-pass-2"
          type="password"
          value={newPass2}
          onChange={(e) => setNewPass2(e.target.value)}
        />
        <button
          type="submit"
          disabled={passBusy}
          style={{ ...S.btnPrimary, opacity: passBusy ? 0.65 : 1 }}
        >
          {passBusy ? "Сохранение…" : "Сохранить"}
        </button>
        {passOk  && <div style={S.ok}>{passOk}</div>}
        {passErr && <div style={S.err}>{passErr}</div>}
      </form>
    </div>
  );
}

// ── 2FA card ──────────────────────────────────────────────────────────────────

function TwoFACard({ user, onUserUpdated }) {
  // "idle" | "scan" | "verify" | "disabling"
  const [flow, setFlow]           = useState("idle");
  const [setupData, setSetupData] = useState(null); // { secret, otpauth_uri, backup_codes }
  const [setupErr, setSetupErr]   = useState("");
  const [setupBusy, setSetupBusy] = useState(false);

  // verify step
  const [verifyPass, setVerifyPass]   = useState("");
  const [verifyCode, setVerifyCode]   = useState("");
  const [verifyErr, setVerifyErr]     = useState("");
  const [verifyBusy, setVerifyBusy]   = useState(false);

  // disable form
  const [disPass, setDisPass]     = useState("");
  const [disCode, setDisCode]     = useState("");
  const [disErr, setDisErr]       = useState("");
  const [disBusy, setDisBusy]     = useState(false);

  // copy feedback
  const [copiedSecret, setCopiedSecret]   = useState(false);
  const [copiedCodes, setCopiedCodes]     = useState(false);

  const totpEnabled = user?.totp_enabled ?? false;

  // Reset flow whenever the underlying user state flips
  useEffect(() => {
    setFlow("idle");
    setSetupData(null);
    setSetupErr("");
    setVerifyPass(""); setVerifyCode(""); setVerifyErr("");
    setDisPass(""); setDisCode(""); setDisErr("");
  }, [totpEnabled]);

  async function handleStartSetup() {
    setSetupErr(""); setSetupBusy(true);
    try {
      const data = await setup2FA();
      setSetupData(data);
      setFlow("scan");
    } catch (err) {
      setSetupErr(err.message || "Не удалось начать настройку 2FA.");
    } finally {
      setSetupBusy(false);
    }
  }

  async function handleEnable(e) {
    e.preventDefault();
    setVerifyErr("");
    if (!verifyPass)       { setVerifyErr("Введите текущий пароль."); return; }
    if (verifyCode.length !== 6) { setVerifyErr("Код должен быть 6 цифр."); return; }
    setVerifyBusy(true);
    try {
      await enable2FA(verifyPass, verifyCode);
      const updated = await fetchMe();
      onUserUpdated(updated);
      // flow resets via useEffect
    } catch (err) {
      setVerifyErr(err.message || "Неверный код или пароль.");
    } finally {
      setVerifyBusy(false);
    }
  }

  async function handleDisable(e) {
    e.preventDefault();
    setDisErr("");
    if (!disPass) { setDisErr("Введите текущий пароль."); return; }
    if (!disCode) { setDisErr("Введите код из приложения."); return; }
    setDisBusy(true);
    try {
      await disable2FA(disPass, disCode);
      const updated = await fetchMe();
      onUserUpdated(updated);
      // flow resets via useEffect
    } catch (err) {
      setDisErr(err.message || "Неверный код или пароль.");
    } finally {
      setDisBusy(false);
    }
  }

  function copyText(text, setFlag) {
    navigator.clipboard.writeText(text).then(() => {
      setFlag(true);
      setTimeout(() => setFlag(false), 2000);
    });
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  function renderDisabled() {
    return (
      <>
        <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          TOTP-аутентификация отключена. Рекомендуем включить для защиты аккаунта.
        </div>
        <button
          onClick={handleStartSetup}
          disabled={setupBusy}
          style={{ ...S.btnPrimary, opacity: setupBusy ? 0.65 : 1 }}
        >
          {setupBusy ? "Подготовка…" : "Настроить 2FA"}
        </button>
        {setupErr && <div style={S.err}>{setupErr}</div>}
      </>
    );
  }

  function renderScan() {
    const { secret, otpauth_uri, backup_codes } = setupData;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauth_uri)}`;

    return (
      <>
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <StepBadge n={1} active />
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>Отсканируйте QR-код</div>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)", margin: "0 4px" }} />
          <StepBadge n={2} active={false} />
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Подтверждение</div>
        </div>

        {/* QR code */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <img
            src={qrUrl}
            alt="QR code"
            width={200}
            height={200}
            style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}
          />
        </div>

        {/* Manual secret */}
        <div style={{ marginBottom: 20 }}>
          <div style={S.label}>Или введите вручную:</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <code style={{
              flex: 1,
              fontFamily: "monospace",
              fontSize: 14,
              background: "var(--color-bg)",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "8px 12px",
              letterSpacing: "0.12em",
              wordBreak: "break-all",
              color: "var(--color-text)",
            }}>
              {secret}
            </code>
            <button
              type="button"
              onClick={() => copyText(secret, setCopiedSecret)}
              style={{
                ...S.btnSecondary,
                padding: "8px 12px",
                flexShrink: 0,
                fontSize: 13,
                whiteSpace: "nowrap",
              }}
            >
              {copiedSecret ? "Скопировано ✓" : "Копировать"}
            </button>
          </div>
        </div>

        {/* Backup codes */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...S.label, marginBottom: 10 }}>
            Резервные коды <span style={{ color: "var(--color-danger)", fontWeight: 600 }}>(сохраните в надёжном месте)</span>:
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            background: "#f8f9fa",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
          }}>
            {backup_codes.map((code, i) => (
              <div key={i} style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: "#1a202c",
                padding: "4px 0",
              }}>
                {code}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => copyText(backup_codes.join("\n"), setCopiedCodes)}
            style={{ ...S.btnSecondary, fontSize: 13 }}
          >
            {copiedCodes ? "Скопировано ✓" : "Скопировать все коды"}
          </button>
        </div>

        {/* Next */}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button
            type="button"
            onClick={() => { setFlow("idle"); setSetupData(null); }}
            style={S.btnSecondary}
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={() => { setVerifyErr(""); setFlow("verify"); }}
            style={S.btnPrimary}
          >
            Далее →
          </button>
        </div>
      </>
    );
  }

  function renderVerify() {
    return (
      <>
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <StepBadge n={1} active={false} done />
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>QR-код</div>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)", margin: "0 4px" }} />
          <StepBadge n={2} active />
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text)" }}>Подтверждение</div>
        </div>

        <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Отсканируйте QR-код в приложении (Google Authenticator, Authy) и введите код для подтверждения.
        </div>

        <form onSubmit={handleEnable}>
          <Field
            label="Текущий пароль"
            id="verify-pass"
            type="password"
            value={verifyPass}
            onChange={(e) => setVerifyPass(e.target.value)}
          />
          <Field
            label="Код из приложения"
            id="verify-totp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
          />
          {verifyErr && <div style={{ ...S.err, marginTop: 0, marginBottom: 14 }}>{verifyErr}</div>}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={() => setFlow("scan")}
              style={S.btnSecondary}
            >
              ← Назад
            </button>
            <button
              type="submit"
              disabled={verifyBusy}
              style={{ ...S.btnPrimary, opacity: verifyBusy ? 0.65 : 1 }}
            >
              {verifyBusy ? "Включение…" : "Включить 2FA"}
            </button>
          </div>
        </form>
      </>
    );
  }

  function renderEnabled() {
    return (
      <>
        {/* Status badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            background: "rgba(56,161,105,0.12)",
            borderRadius: 20,
            color: "var(--color-success)",
            fontSize: 13,
            fontWeight: 600,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            TOTP активна
          </div>
        </div>

        <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Двухфакторная аутентификация включена. Ваш аккаунт защищён.
        </div>

        {flow !== "disabling" ? (
          <button
            type="button"
            onClick={() => { setDisErr(""); setFlow("disabling"); }}
            style={S.btnDanger}
          >
            Отключить 2FA
          </button>
        ) : (
          <form onSubmit={handleDisable}>
            <div style={{
              background: "rgba(229,62,62,0.06)",
              border: "1px solid rgba(229,62,62,0.2)",
              borderRadius: "var(--radius-md)",
              padding: "16px 16px 4px",
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-danger)", marginBottom: 14 }}>
                Подтвердите отключение 2FA
              </div>
              <Field
                label="Текущий пароль"
                id="dis-pass"
                type="password"
                value={disPass}
                onChange={(e) => setDisPass(e.target.value)}
              />
              <Field
                label="Код из приложения"
                id="dis-totp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={disCode}
                onChange={(e) => setDisCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
              />
            </div>
            {disErr && <div style={{ ...S.err, marginTop: 0, marginBottom: 14 }}>{disErr}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={() => { setFlow("idle"); setDisPass(""); setDisCode(""); setDisErr(""); }}
                style={S.btnSecondary}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={disBusy}
                style={{ ...S.btnDanger, opacity: disBusy ? 0.65 : 1 }}
              >
                {disBusy ? "Отключение…" : "Подтвердить отключение"}
              </button>
            </div>
          </form>
        )}
      </>
    );
  }

  return (
    <div style={S.card}>
      <div style={S.cardTitle}>Двухфакторная аутентификация</div>

      {!user ? (
        <div style={{ color: "var(--color-text-muted)", fontSize: 14 }}>Загрузка…</div>
      ) : totpEnabled ? (
        renderEnabled()
      ) : flow === "scan" ? (
        renderScan()
      ) : flow === "verify" ? (
        renderVerify()
      ) : (
        renderDisabled()
      )}
    </div>
  );
}

// ── Step badge helper ─────────────────────────────────────────────────────────

function StepBadge({ n, active, done }) {
  const bg = done
    ? "var(--color-success)"
    : active
    ? "var(--color-primary)"
    : "var(--color-border)";
  const color = done || active ? "#fff" : "var(--color-text-secondary)";
  return (
    <div style={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: bg,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 700,
      flexShrink: 0,
      transition: "background 0.2s",
    }}>
      {done ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : n}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
  const { loading: guardLoading } = useAdminGuard();
  const [user, setUser]           = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userErr, setUserErr]     = useState("");

  const loadUser = useCallback(() => {
    setUserErr("");
    fetchMe()
      .then((u) => { setUser(u); })
      .catch((err) => { setUserErr(err.message || "Не удалось загрузить данные пользователя."); })
      .finally(() => { setUserLoading(false); });
  }, []);

  useEffect(() => {
    if (!guardLoading) loadUser();
  }, [guardLoading, loadUser]);

  if (guardLoading) {
    return (
      <AdminLayout>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: "var(--color-text-muted)", fontSize: 14 }}>
          Проверка доступа…
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100 }}>
        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
            Безопасность
          </h2>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            Управление аккаунтом и двухфакторной аутентификацией
          </div>
        </div>

        {userErr && (
          <div style={{
            padding: "12px 16px",
            background: "rgba(229,62,62,0.08)",
            border: "1px solid rgba(229,62,62,0.25)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-danger)",
            fontSize: 14,
            marginBottom: 24,
          }}>
            {userErr}
          </div>
        )}

        {userLoading && !userErr ? (
          <div style={{ color: "var(--color-text-muted)", fontSize: 14 }}>Загрузка данных…</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: 24,
            alignItems: "start",
          }}>
            <AccountCard user={user} onUserUpdated={setUser} />
            <TwoFACard   user={user} onUserUpdated={setUser} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
