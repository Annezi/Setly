"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../atomic/atoms/buttons/buttons";
import Input from "../../../atomic/molecules/input/input";
import { setAuth } from "@/app/lib/auth-storage";
import { apiFetch } from "@/app/lib/api";
import styles from "./login.module.css";

const API_PREFIX = "/api/user";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState(null); // 'wrong_password' | 'email_not_found' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterClick = useCallback(() => {
    router.push("/registration");
  }, [router]);

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
          if (detail.includes("password") || "incorrect" in loginData) {
            setErrorType("wrong_password");
          } else {
            setErrorType("email_not_found");
          }
          return;
        }

        const access_token = loginData.access_token;
        const expires_in = loginData.expires_in ?? 3600;
        let user = loginData.user;
        if (!access_token) {
          setErrorType("email_not_found");
          return;
        }
        if (!user) {
          const meRes = await apiFetch(`${API_PREFIX}/me`, {
            method: "GET",
            token: access_token,
          });
          if (meRes.ok) user = await meRes.json();
        }
        if (!user) {
          user = {
            id: 0,
            email: emailTrimmed,
            nickname: null,
            email_is_verified: false,
            profile_photo_url: "",
          };
        }
        setAuth(user, access_token, expires_in);
        router.push("/account");
      } catch {
        setErrorType("email_not_found");
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, password, router]
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
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={`${styles.title} title_1`}>Войти в аккаунт</h1>
        <p className={`${styles.description} paragraph`}>
          Сохраняйте планы, редактируйте свои наработки
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <div className={`${styles.fieldLabel} subtitle_2`}>Почта</div>
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
            <div className={`${styles.fieldLabel} subtitle_2`}>Пароль</div>
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
            <span className="subtitle_2 linkStub" role="button" tabIndex={0}>
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
  );
}
