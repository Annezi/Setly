const TOKEN_KEY = "admin_token";

// ── Token helpers ────────────────────────────────────────────────────────────

export function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
}

// ── Core fetch wrapper ───────────────────────────────────────────────────────

export async function apiRequest(path, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(path, {
        ...options,
        headers,
    });

    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const body = await res.json();
            message = body.detail || body.message || message;
        } catch {
            // ignore parse errors
        }
        const err = new Error(message);
        err.status = res.status;
        throw err;
    }

    // 204 No Content
    if (res.status === 204) return null;

    return res.json();
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function requestAdminOtp(email, password) {
    const res = await fetch("/api/admin/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const b = await res.json();
            message = b.detail || b.message || message;
        } catch {}
        throw Object.assign(new Error(message), { status: res.status });
    }
    return res.json(); // { ok: true, user_id: number }
}

export async function verifyAdminOtp(userId, otp) {
    const res = await fetch("/api/admin/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, otp }),
    });
    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const b = await res.json();
            message = b.detail || b.message || message;
        } catch {}
        throw Object.assign(new Error(message), { status: res.status });
    }
    return res.json(); // { access_token, expires_in, token_type }
}

// ── Analytics ────────────────────────────────────────────────────────────────

export function fetchAnalytics() {
    return apiRequest("/api/admin/analytics");
}

// ── Users ────────────────────────────────────────────────────────────────────

export function fetchUsers(page = 1, limit = 20, search = "") {
    const params = new URLSearchParams({ page, limit });
    if (search) params.set("search", search);
    return apiRequest(`/api/admin/users?${params}`);
}

export function blockUser(userId, isBlocked) {
    return apiRequest(`/api/admin/users/${userId}/block`, {
        method: "PATCH",
        body: JSON.stringify({ is_blocked: isBlocked }),
    });
}

export function updateUserRole(userId, isAdmin) {
    return apiRequest(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ is_admin: isAdmin }),
    });
}

export function deleteUser(userId) {
    return apiRequest(`/api/admin/users/${userId}`, {
        method: "DELETE",
    });
}

// ── Content / CheckPlans ─────────────────────────────────────────────────────

export function fetchCheckPlans(
    page = 1,
    limit = 20,
    search = "",
    moderationStatus = "",
    visibility = "",
) {
    const params = new URLSearchParams({ page, limit });
    if (search) params.set("search", search);
    if (moderationStatus) params.set("moderation_status", moderationStatus);
    if (visibility) params.set("visibility", visibility);
    return apiRequest(`/api/admin/content/checkplans?${params}`);
}

export function moderateCheckPlan(idStr, moderationStatus, isHiddenByAdmin) {
    return apiRequest(`/api/admin/content/checkplans/${idStr}/moderation`, {
        method: "PATCH",
        body: JSON.stringify({
            moderation_status: moderationStatus,
            is_hidden_by_admin: isHiddenByAdmin,
        }),
    });
}

export function deleteCheckPlan(idStr) {
    return apiRequest(`/api/admin/content/checkplans/${idStr}`, {
        method: "DELETE",
    });
}

// ── Settings ─────────────────────────────────────────────────────────────────

export function fetchSettings() {
    return apiRequest("/api/admin/settings");
}

export function upsertSetting(key, value) {
    return apiRequest(`/api/admin/settings/${encodeURIComponent(key)}`, {
        method: "PUT",
        body: JSON.stringify({ value }),
    });
}
