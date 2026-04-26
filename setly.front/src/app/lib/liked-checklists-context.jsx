"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getAuth, clearAuth } from "@/app/lib/auth-storage";
import { apiFetch } from "@/app/lib/api";

const LIKED_STORAGE_KEY = "setly_liked_checklist_ids";
const API_PREFIX = "/api/user";

/** @type {React.Context<{ isLiked: (id: string) => boolean; toggle: (id: string) => void; getLikeCount: (id: string) => number; setInitialLikeCounts: (counts: Record<string, number>) => void } | null>} */
const LikedChecklistsContext = createContext(null);

function loadFromStorage(userId) {
  if (typeof window === "undefined") return [];
  try {
    const key = userId ? `${LIKED_STORAGE_KEY}_${userId}` : LIKED_STORAGE_KEY;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function saveToStorage(userId, ids) {
  if (typeof window === "undefined") return;
  try {
    const key = userId ? `${LIKED_STORAGE_KEY}_${userId}` : LIKED_STORAGE_KEY;
    localStorage.setItem(key, JSON.stringify(ids));
  } catch (_) {}
}

export function LikedChecklistsProvider({ children }) {
  const [likedSet, setLikedSet] = useState(() => new Set());
  const [likesCounts, setLikesCounts] = useState(() => ({}));
  const tokenRef = useRef(null);
  const likedSetRef = useRef(likedSet);

  useEffect(() => {
    likedSetRef.current = likedSet;
  }, [likedSet]);

  /** Загрузить лайки: с бэкенда для авторизованного пользователя, иначе из localStorage. */
  const loadLikes = useCallback(() => {
    const auth = getAuth();
    const userId = auth?.user?.id ?? null;
    const token = auth?.token ?? null;
    tokenRef.current = token;

    if (userId && token) {
      apiFetch(`${API_PREFIX}/me/likes`, { method: "GET", token })
        .then((r) => {
          if (r.status === 401) clearAuth();
          return r.ok ? r.json() : null;
        })
        .then((data) => {
          const ids = Array.isArray(data?.checklist_ids) ? data.checklist_ids : [];
          setLikedSet(new Set(ids.map(String)));
          saveToStorage(userId, ids);
        })
        .catch(() => {
          setLikedSet(new Set(loadFromStorage(userId)));
        });
    } else {
      setLikedSet(new Set(loadFromStorage(null)));
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      loadLikes();
    });
    return () => cancelAnimationFrame(id);
  }, [loadLikes]);

  useEffect(() => {
    const onAuthUpdate = () => {
      loadLikes();
    };
    if (typeof window === "undefined") return;
    window.addEventListener("setly:auth-update", onAuthUpdate);
    return () => window.removeEventListener("setly:auth-update", onAuthUpdate);
  }, [loadLikes]);

  /** Подставить счётчики лайков из API (например GET /api/check-plans). Вызывать после загрузки карточек. */
  const setInitialLikeCounts = useCallback((counts) => {
    if (typeof counts === "object" && counts !== null) {
      setLikesCounts((prev) => ({ ...prev, ...counts }));
    }
  }, []);

  const isLiked = useCallback(
    (id) => (id ? likedSet.has(String(id).trim()) : false),
    [likedSet]
  );

  const toggle = useCallback((id) => {
    const sid = id ? String(id).trim() : "";
    if (!sid) return;
    const wasLiked = likedSetRef.current.has(sid);
    setLikedSet((prev) => {
      const next = new Set(prev);
      if (next.has(sid)) next.delete(sid);
      else next.add(sid);
      return next;
    });
    // Оптимистичное обновление счётчика из БД
    setLikesCounts((prev) => ({
      ...prev,
      [sid]: Math.max(0, (prev[sid] ?? 0) + (wasLiked ? -1 : 1)),
    }));

    const token = tokenRef.current;
    if (token) {
      if (wasLiked) {
        apiFetch(`${API_PREFIX}/me/likes/${encodeURIComponent(sid)}`, {
          method: "DELETE",
          token,
        }).catch(() => {
          setLikedSet((prev) => new Set(prev).add(sid));
          setLikesCounts((prev) => ({ ...prev, [sid]: (prev[sid] ?? 0) + 1 }));
        });
      } else {
        apiFetch(`${API_PREFIX}/me/likes`, {
          method: "POST",
          body: { checklist_id: sid },
          token,
        }).catch(() => {
          setLikedSet((prev) => {
            const next = new Set(prev);
            next.delete(sid);
            return next;
          });
          setLikesCounts((prev) => ({ ...prev, [sid]: Math.max(0, (prev[sid] ?? 0) - 1) }));
        });
      }
    }
  }, []);

  const getLikeCount = useCallback(
    (id) => (id ? (likesCounts[String(id).trim()] ?? 0) : 0),
    [likesCounts]
  );

  const value = { isLiked, toggle, getLikeCount, setInitialLikeCounts };

  return (
    <LikedChecklistsContext.Provider value={value}>
      {children}
    </LikedChecklistsContext.Provider>
  );
}

export function useLikedChecklists() {
  const ctx = useContext(LikedChecklistsContext);
  return ctx ?? { isLiked: () => false, toggle: () => {}, getLikeCount: () => 0, setInitialLikeCounts: () => {} };
}
