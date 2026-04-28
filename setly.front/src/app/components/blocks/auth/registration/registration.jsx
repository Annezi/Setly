"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../../atomic/atoms/buttons/buttons";
import Input from "../../../atomic/molecules/input/input";
import Checkbox from "../../../atomic/atoms/checkbox/checkbox";
import { setAuth } from "@/app/lib/auth-storage";
import { apiFetch } from "@/app/lib/api";
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

export default function Registration() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showAgreeError, setShowAgreeError] = useState(false);
  const [showEmailExistsError, setShowEmailExistsError] = useState(false);
  const [showNicknameExistsError, setShowNicknameExistsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const nicknameError = getNicknameError(nickname);
  const nicknameDisplayError = nicknameError ?? (showNicknameExistsError ? "Спокойно! Данный никнейм уже используется, попробуйте другой" : null);
  const passwordMismatch =
    password.length > 0 &&
    passwordAgain.length > 0 &&
    password !== passwordAgain;

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
          if (token != null) {
            setAuth(data.user, token, expiresIn);
          } else {
            setAuth(data.user, "", 7 * 24 * 60 * 60);
          }
          router.push("/account");
          return;
        }

        const detail = (data.detail || "").toLowerCase();
        if (detail.includes("email") || data.error === "email_exists") {
          setShowEmailExistsError(true);
        }
        if (detail.includes("nickname") || data.error === "nickname_exists") {
          setShowNicknameExistsError(true);
        }
      } catch {
        setShowEmailExistsError(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [agreed, nickname, email, password, passwordAgain, router]
  );

  const handleAgreeChange = useCallback((value) => {
    setAgreed(value);
    if (value) setShowAgreeError(false);
  }, []);

  return (
    <div className={`${styles.wrapper} main-page-reveal__item`} style={{ "--reveal-delay": "60ms" }}>
      <div className={styles.content}>
        <h1 className={`${styles.title} title_1`}>Регистрация</h1>
        <p className={`${styles.description} paragraph`}>
          Сохраняйте планы, редактируйте свои наработки
        </p>

        <form onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <div className={`${styles.fieldLabel} subtitle_2`}>Никнейм</div>
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
          <div className={`${styles.fieldLabel} subtitle_2`}>Почта</div>
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
          <div className={`${styles.fieldLabel} subtitle_2`}>Пароль</div>
          <div className={styles.fieldInput}>
            <Input
              typeOfInput="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => {
                setPassword(normalizePassword(e.target.value));
                setPasswordError(null);
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
              onChange={(e) => setPasswordAgain(normalizePassword(e.target.value))}
              errorMessage={
                passwordMismatch ? "Похоже, пароли не совпадают..." : undefined
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
            <Link href="/terms" className={`subtitle_2 linkStub label ${styles.policyLink}`}>
              [Пользовательским соглашением]
            </Link>{" "}
            и даю согласие на обработку персональных данных в соответствии с{" "}
            <Link href="/privacy" className={`subtitle_2 linkStub label ${styles.policyLink}`}>
              [Политикой конфиденциальности]
            </Link>
            .
          </span>
        </div>
        {showAgreeError && (
          <span className={`${styles.policyError} label`} role="alert">
            Спокойно! Поставьте галочку вот здесь...
          </span>
        )}

        <div className={styles.submitButton}>
          <Button
            color="white"
              Text={isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
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
