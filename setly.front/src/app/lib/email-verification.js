/**
 * Подтверждение почты после регистрации: флаг в storage и хелперы для редиректов.
 */

import { getAuth } from "@/app/lib/auth-storage";

export const PENDING_EMAIL_VERIFICATION_KEY = "setly_pending_email_verify";

function storage() {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function isEmailVerified(user) {
  if (!user || typeof user !== "object") return false;
  return user.email_is_verified === true || user.emailIsVerified === true;
}

export function setPendingEmailVerification(pending) {
  const s = storage();
  if (!s) return;
  try {
    if (pending) s.setItem(PENDING_EMAIL_VERIFICATION_KEY, "1");
    else s.removeItem(PENDING_EMAIL_VERIFICATION_KEY);
  } catch (_) {}
}

export function hasPendingEmailVerification() {
  const s = storage();
  if (!s) return false;
  try {
    return s.getItem(PENDING_EMAIL_VERIFICATION_KEY) === "1";
  } catch {
    return false;
  }
}

/** Куда вести после входа / при блокировке профиля. */
export function getEmailVerificationPath() {
  return "/registration";
}

export function needsEmailVerification(user) {
  const auth = getAuth();
  const u = user ?? auth?.user;
  if (!auth?.token || !u?.id) return false;
  return !isEmailVerified(u);
}
