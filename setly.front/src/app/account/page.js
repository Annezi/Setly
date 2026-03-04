'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/globals/header/Header';
import { Footer } from '@/app/components/globals/footer/Footer';
import PersonalHeader from '@/app/components/blocks/personal-account/personal-header/personal-header';
import ProfileInfo from '@/app/components/blocks/personal-account/profile-info/profile-info';
import PersonalCheckPlans from '@/app/components/blocks/personal-account/personal-check-plans/personal-check-plans';
import { getAuth, updateAuthUser, clearAuth } from '@/app/lib/auth-storage';
import { apiFetch } from '@/app/lib/api';

const API_PREFIX = '/api/user';

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
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.user?.id || !auth?.token) {
      router.replace('/login');
      return;
    }
    setAuthChecked(true);
    setUser(auth.user);
    refreshUser(auth.token, setUser, router);
  }, [router]);

  if (!authChecked) return null;

  const userId = user?.id;
  const token = getAuth()?.token;

  return (
    <>
      <Header />
      <main>
        <PersonalHeaderWrapper
          user={user}
          userId={userId}
          token={token}
          router={router}
          onUserChange={() => refreshUser(token, setUser, router)}
        />
      </main>
      <Footer />
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
