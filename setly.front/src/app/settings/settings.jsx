"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import Input from "@/app/components/atomic/molecules/input/input";
import { getAuth, setAuth, clearAuth } from "@/app/lib/auth-storage";
import styles from "./settings.module.css";

const NICKNAME_MAX_LENGTH = 40;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_ALLOWED = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;':",./<>?`~\\]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

function normalizeNickname(value) {
  return value.replace(/[^a-zA-Z\u0400-\u04FF0-9_\-\s]/g, "").slice(0, NICKNAME_MAX_LENGTH);
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

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [nickname, setNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  const [passwordError, setPasswordError] = useState(null);
  const [emailPasswordError, setEmailPasswordError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.user?.id) {
      router.replace("/login");
      return;
    }
    setAuthChecked(true);
    setUser(auth.user);
    setNickname(auth.user.nickname ?? "");
    setCurrentEmail(auth.user.email ?? "");
  }, [router]);

  const nicknameError = getNicknameError(nickname);
  const passwordMismatch =
    newPassword.length > 0 &&
    newPasswordAgain.length > 0 &&
    newPassword !== newPasswordAgain;

  const handleSave = useCallback(
    async (e) => {
      e?.preventDefault?.();
      if (!user?.id) return;

      setSaveError(null);
      setPasswordError(null);
      setEmailPasswordError(null);

      const nicknameTrimmed = nickname.trim().replace(/\s+/g, " ");
      if (getNicknameError(nickname)) return;

      const payload = {};
      if (nicknameTrimmed !== (user.nickname ?? "")) {
        payload.nickname = nicknameTrimmed;
      }

      const wantEmailChange =
        newEmail.trim().length > 0 && newEmail.trim() !== (user.email ?? "");
      const wantPasswordChange =
        newPassword.length > 0 || newPasswordAgain.length > 0;

      if (wantPasswordChange) {
        const pwdErr = getPasswordError(newPassword);
        if (pwdErr) {
          setPasswordError(pwdErr);
          return;
        }
        if (newPassword !== newPasswordAgain) return;
        payload.newPassword = newPassword;
        if (wantEmailChange) {
          payload.currentPassword = emailPassword;
        }
      }

      if (wantEmailChange) {
        if (!EMAIL_PATTERN.test(newEmail.trim())) return;
        setEmailPasswordError(null);
        payload.email = newEmail.trim().toLowerCase();
        payload.currentPassword = payload.currentPassword ?? emailPassword;
      }

      if (Object.keys(payload).length === 0) return;

      setIsSaving(true);
      try {
        const res = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          if (res.status === 400 && data.message) {
            if (
              data.message.includes("пароль") &&
              data.message.includes("почт")
            ) {
              setEmailPasswordError(data.message);
            } else if (data.message.includes("Пароль не верный")) {
              setEmailPasswordError(data.message);
            } else {
              setSaveError(data.message);
            }
          } else {
            setSaveError(data.message || "Ошибка сохранения");
          }
          setIsSaving(false);
          return;
        }

        setAuth({ user: data });
        setUser(data);
        setNewPassword("");
        setNewPasswordAgain("");
        setEmailPassword("");
        if (data.email) setCurrentEmail(data.email);
        if (payload.email) setNewEmail("");
        setSuccessPopupOpen(true);
      } catch {
        setSaveError("Ошибка сохранения");
      } finally {
        setIsSaving(false);
      }
    },
    [
      user,
      nickname,
      newPassword,
      newPasswordAgain,
      newEmail,
      emailPassword,
    ]
  );

  const handleDeleteAccount = useCallback(async () => {
    if (!user?.id) return;
    setDeletePasswordError(null);
    if (!deletePassword.trim()) {
      setDeletePasswordError("Спокойно! Введите пароль");
      return;
    }
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: deletePassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setDeletePasswordError(data.message || "Ошибка удаления");
        setIsDeleting(false);
        return;
      }
      setDeletePopupOpen(false);
      setDeletePassword("");
      clearAuth();
      router.push("/");
    } catch {
      setDeletePasswordError("Ошибка удаления");
    } finally {
      setIsDeleting(false);
    }
  }, [user?.id, deletePassword, router]);

  if (!authChecked) return null;

  const goBack = () => router.push("/account");

  const handleLogout = () => {
    clearAuth();
    setLogoutPopupOpen(false);
    router.push("/");
  };

  const handleOpenDeletePopup = () => {
    setDeletePopupOpen(true);
    setDeletePassword("");
    setDeletePasswordError(null);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.backRow}
        role="button"
        tabIndex={0}
        onClick={goBack}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goBack();
          }
        }}
        aria-label="Назад"
      >
        <RoundButton
          variant="white"
          icon={
            <img
              src="/icons/system/ArrowLeft.svg"
              alt=""
              width={12}
              height={12}
              style={{ color: "var(--grayscale-dark-gray)" }}
            />
          }
          aria-hidden
        />
        <span className="subinfo" style={{ color: "var(--grayscale-dark-gray)" }}>
          Назад
        </span>
      </div>

      <div className={styles.titleBlock}>
        <h1 className="title_1" style={{ color: "var(--grayscale-dark-gray)" }}>
          Настройки аккаунта
        </h1>
      </div>

      <form onSubmit={handleSave} noValidate>
        <div className={styles.fieldsBlock}>
          <div className={styles.section}>
            <h2 className={`subtitle_1 ${styles.sectionTitle}`}>Никнейм</h2>
            <div className={styles.fieldLabelToInput}>
              <p className={`subtitle_2 ${styles.sectionDesc}`}>
                Не больше 40 символов
              </p>
              <div className={styles.nicknameInput}>
              <Input
                typeOfInput="text"
                placeholder="Введите..."
                value={nickname}
                onChange={(e) => setNickname(normalizeNickname(e.target.value))}
                maxLength={NICKNAME_MAX_LENGTH}
                errorMessage={nicknameError ?? undefined}
                autoComplete="username"
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={`subtitle_1 ${styles.sectionTitle}`}>Пароль</h2>
            <div className={styles.passwordRow}>
              <div className={styles.passwordField}>
                <p className={`subtitle_2 ${styles.sectionDesc}`}>
                  Новый пароль
                </p>
                <Input
                  typeOfInput="password"
                  placeholder="Пароль"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(normalizePassword(e.target.value));
                    setPasswordError(null);
                  }}
                  errorMessage={passwordError ?? undefined}
                  autoComplete="new-password"
                />
              </div>
              <div className={styles.passwordField}>
                <p className={`subtitle_2 ${styles.sectionDesc}`}>
                  Новый пароль еще раз
                </p>
                <Input
                  typeOfInput="password"
                  placeholder="Пароль"
                  value={newPasswordAgain}
                  onChange={(e) =>
                    setNewPasswordAgain(normalizePassword(e.target.value))
                  }
                  errorMessage={
                    passwordMismatch
                      ? "Спокойно! Пароли не совпадают"
                      : undefined
                  }
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={`subtitle_1 ${styles.sectionTitle}`}>Почта</h2>
            <div className={styles.emailRow}>
              <div className={styles.emailField}>
                <p className={`subtitle_2 ${styles.sectionDesc}`}>
                  Текущая почта
                </p>
                <Input
                  typeOfInput="email"
                  placeholder="Введите..."
                  value={currentEmail}
                  readOnly
                  disabled
                />
              </div>
              <div className={styles.emailField}>
                <p className={`subtitle_2 ${styles.sectionDesc}`}>
                  Новая почта
                </p>
                <Input
                  typeOfInput="email"
                  placeholder="Введите..."
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    setEmailPasswordError(null);
                  }}
                  autoComplete="email"
                />
              </div>
              <div className={styles.emailField}>
                <p className={`subtitle_2 ${styles.sectionDesc}`}>Пароль</p>
                <Input
                  typeOfInput="password"
                  placeholder="Пароль"
                  value={emailPassword}
                  onChange={(e) => {
                    setEmailPassword(normalizePassword(e.target.value));
                    setEmailPasswordError(null);
                  }}
                  errorMessage={emailPasswordError ?? undefined}
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>
        </div>

        {saveError && (
          <p className="label" style={{ color: "var(--system-red)", marginTop: 8 }}>
            {saveError}
          </p>
        )}

        <div className={styles.buttonsBlock}>
          <Button
            color="blue"
            Text={isSaving ? "Сохранение..." : "Сохранить изменения"}
            type="submit"
            disabled={isSaving}
          />
          <Button
            color="outline"
            Text="Выйти из аккаунта"
            type="button"
            onClick={() => setLogoutPopupOpen(true)}
          />
          <Button
            color="dangerFilled"
            Text="Удалить аккаунт"
            type="button"
            icon={
              <img
                src="/icons/system/Trash-red.svg"
                alt=""
                width={16}
                height={16}
              />
            }
            hoverIcon={
              <img
                src="/icons/system/Trash-white.svg"
                alt=""
                width={16}
                height={16}
              />
            }
            aria-label="Удалить аккаунт"
            onClick={handleOpenDeletePopup}
          />
        </div>
      </form>

      {logoutPopupOpen && (
        <div className={styles.popupOverlay} onClick={() => setLogoutPopupOpen(false)}>
          <div
            className={styles.popupBox}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-popup-title"
          >
            <p id="logout-popup-title" className={`subtitle_1 ${styles.popupText}`}>
              Вы уверены? Перед выходом не забудьте свой драгоценный пароль
            </p>
            <div className={styles.popupButtons}>
              <Button
                color="blue"
                Text="Помню, выйти"
                type="button"
                onClick={handleLogout}
              />
              <Button
                color="white"
                Text="Пойду вспоминать"
                type="button"
                onClick={() => setLogoutPopupOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
      {deletePopupOpen && (
        <div className={styles.popupOverlay} onClick={() => !isDeleting && setDeletePopupOpen(false)}>
          <div
            className={styles.popupBox}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-popup-title"
          >
            <p id="delete-popup-title" className={`subtitle_1 ${styles.popupText}`}>
              Вы уверены, что хотите удалить аккаунт? Введите Ваш пароль ниже, чтобы завершить удаление
            </p>
            <div className={styles.popupDeletePassword}>
              <Input
                typeOfInput="password"
                placeholder="Пароль"
                value={deletePassword}
                onChange={(e) => {
                  setDeletePassword(normalizePassword(e.target.value));
                  setDeletePasswordError(null);
                }}
                errorMessage={deletePasswordError ?? undefined}
                autoComplete="current-password"
              />
            </div>
            <div className={styles.popupButtons}>
              <Button
                color="dangerFilled"
                Text={isDeleting ? "Удаление..." : "Уверен, удалить"}
                type="button"
                icon={
                  <img
                    src="/icons/system/Trash-red.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                }
                hoverIcon={
                  <img
                    src="/icons/system/Trash-white.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                }
                disabled={isDeleting}
                onClick={handleDeleteAccount}
              />
              <Button
                color="blue"
                Text="Пожалуй, просто выйду"
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletePopupOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
      {successPopupOpen && (
        <div className={styles.popupOverlay} onClick={() => setSuccessPopupOpen(false)}>
          <div
            className={styles.popupBox}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-popup-title"
          >
            <p id="success-popup-title" className={`subtitle_1 ${styles.popupText}`}>
              Данные успешно обновлены!
            </p>
            <div className={styles.popupButtonsCenter}>
              <Button
                color="blue"
                Text="Спасибо"
                type="button"
                onClick={() => setSuccessPopupOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
