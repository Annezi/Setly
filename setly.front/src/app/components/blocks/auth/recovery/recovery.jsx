"use client";

import { useCallback, useMemo, useState } from "react";
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
    if (low.includes("not a valid email")) return "Спокойно! Введите корректную почту";
    if (low.includes("email address")) return "Спокойно! Введите корректную почту";
    if (low.includes("field required")) return "Спокойно! Введите вашу почту";
    return msg || fallback;
  };
  if (typeof detail === "string") return translate(detail);
  if (Array.isArray(detail)) {
    const first = detail[0];
    if (typeof first === "string") return translate(first);
    if (first && typeof first === "object" && typeof first.msg === "string") return translate(first.msg);
    return fallback;
  }
  if (typeof detail === "object" && typeof detail.msg === "string") return translate(detail.msg);
  return fallback;
}

function formatExpiry(expiresAt) {
  const parsed = new Date(expiresAt);
  if (Number.isNaN(parsed.getTime())) return null;
  const formatted = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
  return formatted;
}

export default function Recovery() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailTrimmed = useMemo(() => email.trim(), [email]);

  const handleLoginClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.();
      setErrorMessage(null);
      setSuccessMessage(null);

      if (!emailTrimmed || !EMAIL_PATTERN.test(emailTrimmed)) {
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await apiFetch(`${API_PREFIX}/recovery/request`, {
          method: "POST",
          body: { email: emailTrimmed.toLowerCase() },
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          if (res.status === 404) {
            setErrorMessage("Спокойно! Данная почта не зарегистрирована на Setly");
            return;
          }
          setErrorMessage(toErrorText(data.detail, "Не удалось отправить письмо. Попробуйте позже."));
          return;
        }

        const expiryText = formatExpiry(data.expires_at);
        if (expiryText) {
          setSuccessMessage(
            `Письмо с ссылкой для сброса пароля отправлено, оно будет действовать до ${expiryText}`
          );
        } else {
          setSuccessMessage("Письмо с ссылкой для сброса пароля отправлено.");
        }
      } catch {
        setErrorMessage("Не удалось отправить письмо. Попробуйте позже.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [emailTrimmed]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={`${styles.title} title_1`}>Восстановление пароля</h1>
        <p className={`${styles.description} paragraph`}>
          Укажите почту, и мы отправим ссылку для смены пароля
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <div className={`${styles.fieldLabel} subtitle_2`}>Введите вашу почту</div>
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

          {successMessage && (
            <span className={`${styles.success} label`} role="status">
              {successMessage}
            </span>
          )}

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
