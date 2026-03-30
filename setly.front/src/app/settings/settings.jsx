"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import Input from "@/app/components/atomic/molecules/input/input";
import { getAuth, setAuth, clearAuth } from "@/app/lib/auth-storage";
import { apiFetch } from "@/app/lib/api";
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

  const [passwordError, setPasswordError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [newEmailExistsError, setNewEmailExistsError] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const [saveConfirmPassword, setSaveConfirmPassword] = useState("");
  const [saveConfirmPasswordError, setSaveConfirmPasswordError] = useState(null);
  const [saveConfirmEmailTakenError, setSaveConfirmEmailTakenError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const pendingPayloadRef = useRef(null);

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

  const wantPasswordChange =
    newPassword.length > 0 || newPasswordAgain.length > 0;

  const passwordFieldsFilled =
    newPassword.length > 0 && newPasswordAgain.length > 0;

  const buildChangedPayload = useCallback(() => {
    if (!user?.id) return null;

    const nicknameTrimmed = nickname.trim().replace(/\s+/g, " ");
    const payload = {};

    if (nicknameTrimmed !== (user.nickname ?? "")) {
      payload.nickname = nicknameTrimmed;
    }

    const newEmailTrimmed = newEmail.trim();
    const wantEmailChange =
      newEmailTrimmed.length > 0 &&
      newEmailTrimmed.toLowerCase() !== (user.email ?? "").toLowerCase();

    if (wantEmailChange) {
      payload.email = newEmailTrimmed.toLowerCase();
    }

    if (wantPasswordChange && passwordFieldsFilled) {
      payload.newPassword = newPassword;
    }

    if (Object.keys(payload).length === 0) return null;
    return payload;
  }, [
    user,
    nickname,
    newEmail,
    newPassword,
    wantPasswordChange,
    passwordFieldsFilled,
  ]);

  const openSaveConfirm = useCallback(() => {
    setSaveConfirmPassword("");
    setSaveConfirmPasswordError(null);
    setSaveConfirmEmailTakenError(null);
    setSaveError(null);
    setNewEmailExistsError(false);
    const payload = buildChangedPayload();
    if (!payload) return;
    pendingPayloadRef.current = payload;
    setSaveConfirmOpen(true);
  }, [buildChangedPayload]);

  const handlePrepareSave = useCallback(
    (e) => {
      e?.preventDefault?.();
      if (!user?.id) return;

      setSaveError(null);
      setPasswordError(null);
      setNewEmailExistsError(false);

      if (getNicknameError(nickname)) return;

      if (wantPasswordChange) {
        if (!passwordFieldsFilled) {
          setPasswordError("Спокойно! Введите пароль в обоих полях");
          return;
        }
        const pwdErr = getPasswordError(newPassword);
        if (pwdErr) {
          setPasswordError(pwdErr);
          return;
        }
        if (newPassword !== newPasswordAgain) {
          return;
        }
      }

      const newEmailTrimmed = newEmail.trim();
      const wantEmailChange =
        newEmailTrimmed.length > 0 &&
        newEmailTrimmed.toLowerCase() !== (user.email ?? "").toLowerCase();

      if (wantEmailChange) {
        if (!EMAIL_PATTERN.test(newEmailTrimmed)) {
          setSaveError("Укажите корректный адрес почты");
          return;
        }
      }

      const payload = buildChangedPayload();
      if (!payload) return;

      const runCheckEmail = async () => {
        if (wantEmailChange) {
          try {
            const checkRes = await apiFetch(
              `/api/user/check-email?email=${encodeURIComponent(newEmailTrimmed.toLowerCase())}`
            );
            const checkData = await checkRes.json().catch(() => ({}));
            if (checkData.exists) {
              setNewEmailExistsError(true);
              return;
            }
          } catch {
            setSaveError("Не удалось проверить почту");
            return;
          }
        }
        openSaveConfirm();
      };

      void runCheckEmail();
    },
    [
      user,
      nickname,
      newEmail,
      newPassword,
      newPasswordAgain,
      wantPasswordChange,
      passwordFieldsFilled,
      buildChangedPayload,
      openSaveConfirm,
    ]
  );

  const handleConfirmSave = useCallback(async () => {
    if (!user?.id) return;
    const pending = pendingPayloadRef.current;
    if (!pending) {
      setSaveConfirmOpen(false);
      return;
    }

    setSaveConfirmPasswordError(null);
    setSaveConfirmEmailTakenError(null);
    const currentPwd = normalizePassword(saveConfirmPassword);
    if (!currentPwd) {
      setSaveConfirmPasswordError("Введите пароль");
      return;
    }

    if (pending.newPassword && pending.newPassword === currentPwd) {
      setSaveConfirmPasswordError(
        "Новый пароль должен отличаться от текущего"
      );
      return;
    }

    const body = {
      ...pending,
      current_password: currentPwd,
      new_password: pending.newPassword ?? undefined,
    };
    delete body.newPassword;

    setIsSaving(true);
    try {
      const res = await apiFetch(`/api/user/me`, {
        method: "PATCH",
        body,
      });
      const data = await res.json().catch(() => ({}));
      const errText = data?.detail || data?.message || "Ошибка сохранения";

      if (!res.ok) {
        if (res.status === 400) {
          if (errText === "Спокойно. Пароли не совпадают") {
            setSaveConfirmPasswordError(errText);
          } else if (
            errText === "Новый пароль должен отличаться от текущего"
          ) {
            setSaveConfirmPasswordError(errText);
          } else if (
            typeof errText === "string" &&
            errText.includes("почт")
          ) {
            if (errText.toLowerCase().includes("уже зарегистрирован")) {
              setSaveConfirmEmailTakenError("Введённая новая почта уже занята");
            } else {
              setSaveError(errText);
              setSaveConfirmOpen(false);
            }
          } else {
            setSaveError(errText);
            setSaveConfirmOpen(false);
          }
        } else {
          setSaveError(errText);
          setSaveConfirmOpen(false);
        }
        setIsSaving(false);
        return;
      }

      setAuth({ user: data });
      setUser(data);
      setNewPassword("");
      setNewPasswordAgain("");
      setSaveConfirmPassword("");
      pendingPayloadRef.current = null;
      setSaveConfirmOpen(false);
      if (data.email) setCurrentEmail(data.email);
      if (pending.email) setNewEmail("");
      setSuccessPopupOpen(true);
    } catch {
      setSaveError("Ошибка сохранения");
      setSaveConfirmOpen(false);
    } finally {
      setIsSaving(false);
    }
  }, [user?.id, saveConfirmPassword]);

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

  const closeSaveConfirm = () => {
    if (isSaving) return;
    setSaveConfirmOpen(false);
    setSaveConfirmPassword("");
    setSaveConfirmPasswordError(null);
    setSaveConfirmEmailTakenError(null);
    pendingPayloadRef.current = null;
  };

  const saveConfirmPopup =
    saveConfirmOpen && typeof document !== "undefined"
      ? createPortal(
      <div
        className={styles.deleteConfirmOverlay}
        onClick={closeSaveConfirm}
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-confirm-title"
      >
        <div
          className={styles.deleteConfirmPopup}
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id="save-confirm-title"
            className="title_2"
            style={{ color: "var(--grayscale-dark-gray)" }}
          >
            Введите Ваш текущий пароль
          </h2>
          <p className={`paragraph ${styles.saveConfirmDesc}`}>
            Чтобы сохранить изменения введите ваш старый пароль
          </p>
          <div className={styles.saveConfirmInputWrap}>
            <Input
              typeOfInput="password"
              placeholder="Пароль"
              value={saveConfirmPassword}
              onChange={(e) => {
                setSaveConfirmPassword(normalizePassword(e.target.value));
                setSaveConfirmPasswordError(null);
                setSaveConfirmEmailTakenError(null);
              }}
              errorMessage={saveConfirmPasswordError ?? undefined}
              autoComplete="current-password"
            />
          </div>
          {saveConfirmEmailTakenError && (
            <p
              className="label"
              style={{
                color: "var(--system-red)",
                marginTop: 8,
                textAlign: "center",
              }}
              role="alert"
            >
              {saveConfirmEmailTakenError}
            </p>
          )}
          <div className={styles.deleteConfirmButtons}>
            <Button
              Text={isSaving ? "Подтверждение..." : "Подтвердить"}
              color="blue"
              type="button"
              onClick={handleConfirmSave}
              disabled={isSaving}
            />
          </div>
        </div>
      </div>,
      document.body
    )
      : null;

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

      <form onSubmit={handlePrepareSave} noValidate>
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
                    setNewEmailExistsError(false);
                  }}
                  errorMessage={
                    newEmailExistsError
                      ? "Спокойно! Пользователь с данной почтой уже зарегистрирован, используйте другую почту"
                      : undefined
                  }
                  autoComplete="email"
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
            Text="Сохранить изменения"
            type="submit"
            disabled={isSaving}
          />
          <Button
            color="outline"
            Text="Выйти из аккаунта"
            type="button"
            onClick={() => setLogoutPopupOpen(true)}
          />
          {/* <Button
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
          /> */}
        </div>
      </form>

      {saveConfirmPopup}

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
      {/* {deletePopupOpen && (
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
      )} */}
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
