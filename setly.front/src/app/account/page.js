'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/globals/header/Header';
import { Footer } from '@/app/components/globals/footer/Footer';
import { getAuth, updateAuthUser, clearAuth } from '@/app/lib/auth-storage';
import { apiFetch } from '@/app/lib/api';

const API_PREFIX = '/api/user';
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

export default function PersonalAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  /** Не читать localStorage в initial state — на SSR getAuth() всегда null, иначе ломается гидрация. */
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
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
  }, [router]);

  if (!authChecked) return null;

  const userId = user?.id;
  const token = getAuth()?.token;

  return (
    <>
      <Header />
      <main>
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
          <PersonalHeaderWrapper
            user={user}
            userId={userId}
            token={token}
            router={router}
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

function PersonalHeaderWrapper({ user, userId, token, router, onUserChange }) {
  return (
    <>
        <PersonalHeader
          userId={user?.id ?? userId}
          profileBgUrl={user?.profile_bg_url}
          token={token}
          onHeaderImageChange={onUserChange}
        />
        <ProfileInfo user={user} token={token} onUserChange={onUserChange} />
      <PersonalCheckPlans userId={user?.id ?? userId} token={token} router={router} />
    </>
  );
}
