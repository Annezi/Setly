/** Ключ sessionStorage для токена сброса пароля (не передаём в URL). */
export const PASSWORD_RESET_TOKEN_KEY = "setly_password_reset_token";

export function readPasswordResetToken(searchParams) {
	if (typeof window === "undefined") return "";
	const fromStorage = sessionStorage.getItem(PASSWORD_RESET_TOKEN_KEY) || "";
	const fromQuery = searchParams?.get?.("token") || "";
	const token = (fromStorage || fromQuery).trim();
	if (fromQuery && fromQuery !== fromStorage) {
		sessionStorage.setItem(PASSWORD_RESET_TOKEN_KEY, fromQuery);
	}
	return token;
}

export function clearPasswordResetToken() {
	if (typeof window !== "undefined") {
		sessionStorage.removeItem(PASSWORD_RESET_TOKEN_KEY);
	}
}
