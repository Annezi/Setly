'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/app/components/globals/header/Header';
import { Footer } from '@/app/components/globals/footer/Footer';
import { getAuth, updateAuthUser, clearAuth } from '@/app/lib/auth-storage';
import { apiFetch } from '@/app/lib/api';
import { buildProfilePublicPath } from '@/app/lib/slug';
import { parseProfilePublicRef } from '@/app/lib/slug';

const API_PREFIX = '/api/user';
const CREATED_PLANS_COUNT_CACHE_PREFIX = 'setly:created-plans-count:';

function readCachedCreatedPlansCount(userId) {
  if (!userId || typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(`${CREATED_PLANS_COUNT_CACHE_PREFIX}${userId}`);
    if (raw == null) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  } catch (_) {
    return null;
  }
}

function writeCachedCreatedPlansCount(userId, count) {
  if (!userId || typeof window === 'undefined') return;
  if (!Number.isFinite(Number(count)) || Number(count) < 0) return;
  try {
    window.localStorage.setItem(`${CREATED_PLANS_COUNT_CACHE_PREFIX}${userId}`, String(Number(count)));
  } catch (_) {}
}
const PersonalHeader = dynamic(
  () => import('@/app/components/blocks/personal-account/personal-header/personal-header').then((m) => m.default),
  { ssr: false, loading: () => <div style={{ minHeight: 200 }} aria-busy="true" aria-label="Загрузка профиля" /> }
);
const ProfileInfo = dynamic(
  () => import('@/app/components/blocks/personal-account/profile-info/profile-info').then((m) => m.default),
  { ssr: false, loading: () => <div style={{ minHeight: 120 }} aria-busy="true" aria-label="Загрузка профиля" /> }
);
const PersonalCheckPlans = dynamic(
  () => import('@/app/components/blocks/personal-account/personal-check-plans/personal-check-plans').then((m) => m.default),
  { ssr: false, loading: () => <div style={{ minHeight: 420 }} aria-busy="true" aria-label="Загрузка чек-планов" /> }
);

function refreshUser(token, setUser, router) {
  if (!token) return;
  apiFetch(`${API_PREFIX}/me`, { method: 'GET', token })
    .then((r) => {
      if (r.status === 401) {
        clearAuth();
        router?.replace?.('/login');
        return null;
      }
      return r.ok ? r.json() : null;
    })
    .then((user) => {
      setUser(user);
      if (user) updateAuthUser(user);
    })
    .catch(() => setUser(null));
}

export default function AccountPageClient() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [createdPlansCount, setCreatedPlansCount] = useState(0);
  /** Не читать localStorage в initial state — на SSR getAuth() всегда null, иначе ломается гидрация. */
  const [authChecked, setAuthChecked] = useState(false);
  const userRef = typeof params?.userRef === 'string' ? params.userRef : '';
  const isPublicProfileRoute = userRef.trim() !== '';
  const { userId: profileUserId } = parseProfilePublicRef(userRef);

  useEffect(() => {
    const auth = getAuth();
    const authUserId = auth?.user?.id;
    const isOwnPublicProfile =
      isPublicProfileRoute &&
      profileUserId != null &&
      authUserId != null &&
      String(profileUserId) === String(authUserId);

    if (!isPublicProfileRoute) {
      if (!auth?.user?.id || !auth?.token) {
        router.replace('/login');
        return;
      }
      const rafId = requestAnimationFrame(() => {
        setUser(auth.user);
        setAuthChecked(true);
        refreshUser(auth.token, setUser, router);
      });
      return () => cancelAnimationFrame(rafId);
    }

    if (!profileUserId) {
      router.replace('/account');
      return;
    }

    const rafId = requestAnimationFrame(() => {
      setAuthChecked(true);
    });

    if (isOwnPublicProfile && auth?.token) {
      setUser(auth.user);
      refreshUser(auth.token, setUser, router);
      return () => cancelAnimationFrame(rafId);
    }

    apiFetch(`/api/user/public-profile/${encodeURIComponent(profileUserId)}/full`, {
      method: 'GET',
      token: auth?.token,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((publicUser) => {
        if (!publicUser) {
          router.replace('/account');
          return;
        }
        const initialCreatedPlansCount = Number(publicUser.created_plans_count);
        if (Number.isFinite(initialCreatedPlansCount) && initialCreatedPlansCount >= 0) {
          setCreatedPlansCount(initialCreatedPlansCount);
          writeCachedCreatedPlansCount(publicUser.id, initialCreatedPlansCount);
        }
        setUser({
          id: publicUser.id,
          nickname: publicUser.nickname ?? '',
          profile_photo_url: publicUser.profile_photo_url ?? '',
          profile_bg_url: publicUser.profile_bg_url ?? '',
          email: '',
          is_official_setly: Boolean(publicUser.is_official_setly),
        });
      })
      .catch(() => router.replace('/account'));

    return () => cancelAnimationFrame(rafId);
  }, [router, isPublicProfileRoute, profileUserId]);

  useEffect(() => {
    const uid = user?.id;
    if (!uid) return;
    let cancelled = false;
    apiFetch(`/api/user/public-profile/${encodeURIComponent(uid)}/full`, {
      method: 'GET',
      token: getAuth()?.token,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((publicUser) => {
        if (cancelled || !publicUser) return;
        const official = Boolean(publicUser.is_official_setly);
        const publicCreatedPlansCount = Number(publicUser.created_plans_count);
        if (Number.isFinite(publicCreatedPlansCount) && publicCreatedPlansCount >= 0) {
          setCreatedPlansCount((prev) => (prev === publicCreatedPlansCount ? prev : publicCreatedPlansCount));
          writeCachedCreatedPlansCount(uid, publicCreatedPlansCount);
        }
        setUser((prev) => {
          if (!prev) return prev;
          if (Boolean(prev.is_official_setly) === official) return prev;
          return { ...prev, is_official_setly: official };
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  /** Канонический адрес профиля: /u/{slug}-{id} (ник в транслите + числовой id без двусмысленности). */
  useEffect(() => {
    if (!user?.id || typeof window === 'undefined') return;
    try {
      const canonicalPath = buildProfilePublicPath(user.id, user?.nickname);
      const u = new URL(window.location.href);
      u.searchParams.delete('uid');
      u.searchParams.delete('user');
      const next = `${canonicalPath}${u.search}${u.hash}`;
      const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (next !== cur) window.history.replaceState({}, '', next);
    } catch (_) {}
  }, [user?.id, user?.nickname]);

  const auth = getAuth();
  const authUserId = auth?.user?.id ?? null;
  const token = auth?.token;
  const profileOwnerId = user?.id ?? profileUserId ?? null;
  const isGuestView = profileOwnerId != null && authUserId != null
    ? String(profileOwnerId) !== String(authUserId)
    : isPublicProfileRoute;
  const canEditProfile = !isGuestView;
  const isOfficialSetlyProfile =
    Boolean(user?.is_official_setly) ||
    String(user?.email ?? '').trim().toLowerCase() === 'setly@setly.com';

  useEffect(() => {
    if (!authChecked || !profileOwnerId) return;
    const cachedCount = readCachedCreatedPlansCount(profileOwnerId);
    if (cachedCount != null) setCreatedPlansCount(cachedCount);
    if (isGuestView) return;
    const endpoint = `${API_PREFIX}/me/checkplans`;
    apiFetch(endpoint, { method: 'GET', token })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const count = Array.isArray(data?.id_strs) ? data.id_strs.length : 0;
        setCreatedPlansCount(count);
        writeCachedCreatedPlansCount(profileOwnerId, count);
      })
      .catch(() => setCreatedPlansCount(0));
  }, [authChecked, profileOwnerId, isGuestView, token]);

  if (!authChecked) return null;

  return (
    <>
      <Header />
      <main>
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
          <PersonalHeaderWrapper
            user={user}
            userId={profileOwnerId}
            token={token}
            router={router}
            canEditProfile={canEditProfile}
            isGuestView={isGuestView}
            createdPlansCount={createdPlansCount}
            isOfficialSetlyProfile={isOfficialSetlyProfile}
            onUserChange={() => refreshUser(token, setUser, router)}
          />
        </div>
      </main>
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "120ms" }}>
        <Footer />
      </div>
    </>
  );
}

function PersonalHeaderWrapper({ user, userId, token, router, onUserChange, canEditProfile, isGuestView, createdPlansCount, isOfficialSetlyProfile }) {
  return (
    <>
        <PersonalHeader
          userId={user?.id ?? userId}
          profileBgUrl={user?.profile_bg_url}
          token={token}
          canEdit={canEditProfile}
          onHeaderImageChange={onUserChange}
        />
        <ProfileInfo
          user={user}
          token={token}
          canEdit={canEditProfile}
          createdPlansCount={createdPlansCount}
          isOfficialSetlyProfile={isOfficialSetlyProfile}
          onUserChange={onUserChange}
        />
      <PersonalCheckPlans userId={user?.id ?? userId} token={token} router={router} isGuestView={isGuestView} />
    </>
  );
}
