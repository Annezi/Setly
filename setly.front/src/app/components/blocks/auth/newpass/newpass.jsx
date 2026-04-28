"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../../../atomic/atoms/buttons/buttons";
import Input from "../../../atomic/molecules/input/input";
import { apiFetch } from "@/app/lib/api";
import styles from "./newpass.module.css";

const API_PREFIX = "/api/user";
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_ALLOWED = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;':",./<>?`~\\]*$/;

function toErrorText(detail, fallback) {
  if (!detail) return fallback;
  const translate = (text) => {
    const msg = String(text || "").trim();
    const low = msg.toLowerCase();
    if (low.includes("not a valid email")) return "Спокойно! Введите корректную почту";
    if (low.includes("field required")) return "Спокойно! Заполните все обязательные поля";
    if (low.includes("string should have at least")) return "Спокойно! Пароль должен быть не менее 6 символов";
    if (low.includes("valid")) return fallback;
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

export default function NewPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => (searchParams.get("token") || "").trim(), [searchParams]);

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordMismatch =
    password.length > 0 && passwordAgain.length > 0 && password !== passwordAgain;

  const handleLoginClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.();
      setFormError(null);
      setSuccessMessage(null);
      setPasswordError(null);

      if (!token) {
        setFormError("Ссылка недействительна или истекла");
        return;
      }

      const pwdError = getPasswordError(password);
      if (pwdError) {
        setPasswordError(pwdError);
        return;
      }
      if (passwordMismatch) return;

      setIsSubmitting(true);
      try {
        const res = await apiFetch(`${API_PREFIX}/recovery/confirm`, {
          method: "POST",
          body: { token, password },
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setFormError(toErrorText(data.detail, "Не удалось обновить пароль"));
          return;
        }

        setSuccessMessage("Пароль успешно обновлен. Теперь вы можете войти.");
        setPassword("");
        setPasswordAgain("");
      } catch {
        setFormError("Не удалось обновить пароль");
      } finally {
        setIsSubmitting(false);
      }
    },
    [password, passwordMismatch, token]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={`${styles.title} title_1`}>Новый пароль</h1>
        <p className={`${styles.description} paragraph`}>
          Придумайте новый пароль для вашего аккаунта
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <div className={`${styles.fieldLabel} subtitle_2`}>Пароль</div>
            <div className={styles.fieldInput}>
              <Input
                typeOfInput="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(normalizePassword(e.target.value));
                  if (passwordError) setPasswordError(null);
                  if (formError) setFormError(null);
                }}
                errorMessage={passwordError ?? undefined}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={`${styles.fieldLabel} subtitle_2`}>Пароль ещё раз</div>
            <div className={styles.fieldInput}>
              <Input
                typeOfInput="password"
                placeholder="Пароль"
                value={passwordAgain}
                onChange={(e) => {
                  setPasswordAgain(normalizePassword(e.target.value));
                  if (formError) setFormError(null);
                }}
                errorMessage={passwordMismatch ? "Похоже, пароли не совпадают..." : formError ?? undefined}
                autoComplete="new-password"
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
              Text={isSubmitting ? "Сохранение..." : "Сохранить пароль"}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>

        <div className={styles.bottomRow}>
          <span className="subinfo">Вернуться ко входу</span>
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
