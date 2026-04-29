'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import ProfilePhoto from '@/app/components/atomic/atoms/profile-photo/profile-photo';
import Button from '@/app/components/atomic/atoms/buttons/buttons';
import { getAuth, clearAuth } from '@/app/lib/auth-storage';
import styles from './header.module.css';

const NAV_ITEMS = [
  { id: 'check-plans', label: 'Чек-планы', href: '/check-plans' },
  { id: 'articles', label: 'Статьи', href: '/articles' },
  { id: 'tests', label: 'Тесты', href: '/tests' },
  { id: 'about', label: 'О нас', href: '/about' },
];

export function Header({ isLoggedIn: isLoggedInProp, user: userProp, hideNavigation = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storageAuth, setStorageAuth] = useState(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [accountMenuPosition, setAccountMenuPosition] = useState({ top: 0, left: 0 });
  const accountMenuWrapRef = useRef(null);
  const accountMenuCloseTimeoutRef = useRef(null);
  const mobileMenuTriggerRef = useRef(null);
  const sidePanelRef = useRef(null);
  const [portalsReady, setPortalsReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => setPortalsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const syncAuth = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setStorageAuth(getAuth());
        setAuthResolved(true);
      });
    };
    syncAuth();
    window.addEventListener('setly:auth-update', syncAuth);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('setly:auth-update', syncAuth);
    };
  }, []);

  const isLoggedIn = isLoggedInProp ?? (authResolved ? Boolean(storageAuth?.user) : false);
  const user = userProp ?? (authResolved ? (storageAuth?.user ?? null) : null);

  const activeNavId =
    NAV_ITEMS.find((item) => item.href && (pathname === item.href || pathname.startsWith(item.href + '/')))?.id ?? null;

  const closeMobileMenu = useCallback(() => {
    if (sidePanelRef.current?.contains(document.activeElement)) {
      mobileMenuTriggerRef.current?.focus({ preventScroll: true });
    }
    setMobileMenuOpen(false);
  }, []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((v) => !v), []);

  const handleLoginClick = useCallback(() => {
    closeMobileMenu();
    router.push('/login');
  }, [closeMobileMenu, router]);

  const handleProfileClick = useCallback(() => {
    closeMobileMenu();
    router.push('/account');
  }, [closeMobileMenu, router]);

  const closeMobileMenuSimple = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const updateAccountMenuPosition = useCallback(() => {
    const el = accountMenuWrapRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setAccountMenuPosition({
        top: rect.bottom + 12,
        left: rect.left + rect.width / 2,
      });
    }
  }, []);

  const clearAccountMenuCloseTimeout = useCallback(() => {
    if (accountMenuCloseTimeoutRef.current) {
      clearTimeout(accountMenuCloseTimeoutRef.current);
      accountMenuCloseTimeoutRef.current = null;
    }
  }, []);

  const handleAccountMenuHoverStart = useCallback(() => {
    clearAccountMenuCloseTimeout();
    updateAccountMenuPosition();
    setAccountMenuOpen(true);
  }, [clearAccountMenuCloseTimeout, updateAccountMenuPosition]);

  const handleAccountMenuHoverEnd = useCallback(() => {
    clearAccountMenuCloseTimeout();
    accountMenuCloseTimeoutRef.current = setTimeout(() => {
      setAccountMenuOpen(false);
      accountMenuCloseTimeoutRef.current = null;
    }, 180);
  }, [clearAccountMenuCloseTimeout]);

  const handleLogoutFromMenu = useCallback(() => {
    setAccountMenuOpen(false);
    setLogoutPopupOpen(true);
  }, []);

  const handleLogoutConfirm = useCallback(() => {
    clearAuth();
    setLogoutPopupOpen(false);
    router.push('/');
  }, [router]);

  useEffect(() => {
    if (!accountMenuOpen) return;
    const h = (e) => {
      const inWrap = accountMenuWrapRef.current?.contains(e.target);
      const menuEl = document.querySelector(`.${styles.accountDropdownMenuPortal}`);
      if (!inWrap && !menuEl?.contains(e.target)) setAccountMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [accountMenuOpen]);

  useEffect(() => {
    if (!accountMenuOpen) return;
    const syncPosition = () => updateAccountMenuPosition();
    window.addEventListener('resize', syncPosition);
    window.addEventListener('scroll', syncPosition, true);
    return () => {
      window.removeEventListener('resize', syncPosition);
      window.removeEventListener('scroll', syncPosition, true);
    };
  }, [accountMenuOpen, updateAccountMenuPosition]);

  useEffect(() => {
    return () => clearAccountMenuCloseTimeout();
  }, [clearAccountMenuCloseTimeout]);

  const renderNavLink = (item, buttonClass, onClick) => {
    const isActive = item.id === activeNavId;
    const content = <span className={`${styles.headerNavLabel} subinfo`}>{item.label}</span>;
    if (item.href) {
      return (
        <Link
          href={item.href}
          className={buttonClass}
          data-active={isActive}
          aria-current={isActive ? 'page' : undefined}
          onClick={onClick}
        >
          {content}
        </Link>
      );
    }
    return (
      <button
        type="button"
        className={buttonClass}
        data-active={isActive}
        aria-current={isActive ? 'page' : undefined}
        onClick={onClick}
      >
        {content}
      </button>
    );
  };

  return (
    <header className={`${styles.wrapper}`} role="banner">
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink} aria-label="На главную">
          <Image
            src="/icons/system/logo-desktop.svg"
            alt="Setly"
            width={100}
            height={24}
            priority
            className={styles.logoDesktop}
            draggable={false}
          />
          <Image
            src="/icons/system/logo-mobile.svg"
            alt="Setly"
            width={56}
            height={30}
            className={styles.logoMobile}
            draggable={false}
          />
        </Link>

        {!hideNavigation && (
          <div className={`${styles.navWrap} ${!isLoggedIn ? styles.navWrapUnauth : ''}`}>
            <nav className={`component-blur ${styles.headerNav}`} role="navigation" aria-label="Навигация по разделам">
              <ul className={styles.headerNavList}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.id} className={styles.headerNavItem}>
                    {renderNavLink(item, styles.headerNavButton)}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <div className={styles.rightSlot}>
          <span className={styles.headerDesktopAuth}>
            {!isLoggedIn ? (
              <button
                type="button"
                className={styles.headerAuthButton}
                onClick={() => router.push('/login')}
              >
                <span className={styles.headerAuthButtonText}>Войти</span>
              </button>
            ) : (
              <span ref={accountMenuWrapRef} className={styles.accountMenuWrap}>
                <ProfilePhoto
                  src={user?.profile_photo_url ?? user?.avatarPath}
                  href={undefined}
                  hideUploadOnHover
                  size={44}
                  className={styles.headerProfilePhoto}
                  onClick={handleProfileClick}
                  onMouseEnter={handleAccountMenuHoverStart}
                  onMouseLeave={handleAccountMenuHoverEnd}
                  aria-label="Меню аккаунта"
                  aria-haspopup="menu"
                  aria-expanded={accountMenuOpen}
                />
              </span>
            )}
          </span>

          <button
            ref={mobileMenuTriggerRef}
            type="button"
            className={styles.mobileMenuTrigger}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <Image
                src="/icons/system/Cross.svg"
                alt=""
                width={15}
                height={15}
                aria-hidden
                draggable={false}
              />
            ) : (
              <Image
                src="/icons/system/Burger.svg"
                alt=""
                width={15}
                height={15}
                aria-hidden
                draggable={false}
              />
            )}
          </button>
        </div>
      </div>

      {/* Выпадающее меню аккаунта */}
      {portalsReady && isLoggedIn &&
        createPortal(
          <div
            className={`component-blur ${styles.accountDropdownMenu} ${styles.accountDropdownMenuPortal} ${accountMenuOpen ? styles.accountDropdownMenuOpen : ''}`}
            role="menu"
            style={{ top: accountMenuPosition.top, left: accountMenuPosition.left }}
            onMouseEnter={handleAccountMenuHoverStart}
            onMouseLeave={handleAccountMenuHoverEnd}
            aria-hidden={!accountMenuOpen}
          >
            <button
              type="button"
              className={`subinfo ${styles.accountDropdownMenuItem}`}
              role="menuitem"
              onClick={handleLogoutFromMenu}
            >
              Выйти из аккаунта
            </button>
          </div>,
          document.body
        )}

      {/* Попап выхода из аккаунта (как на странице настроек) */}
      {portalsReady && logoutPopupOpen &&
        createPortal(
          <div className={styles.logoutPopupOverlay} onClick={() => setLogoutPopupOpen(false)}>
            <div
              className={styles.logoutPopupBox}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="header-logout-popup-title"
            >
              <p id="header-logout-popup-title" className={`subtitle_1 ${styles.logoutPopupText}`}>
                Вы уверены? Перед выходом не забудьте свой драгоценный пароль
              </p>
              <div className={styles.logoutPopupButtons}>
                <Button
                  color="blue"
                  Text="Помню, выйти"
                  type="button"
                  onClick={handleLogoutConfirm}
                />
                <Button
                  color="white"
                  Text="Пойду вспоминать"
                  type="button"
                  onClick={() => setLogoutPopupOpen(false)}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Оверлей и боковое меню — рендер в body, чтобы перекрывать весь viewport без зазоров */}
      {portalsReady &&
        createPortal(
          <>
            <div
              className={`${styles.overlay} ${mobileMenuOpen ? styles.isOpen : ''}`}
              onClick={closeMobileMenu}
              aria-hidden
            />
            <aside
              ref={sidePanelRef}
              className={`${styles.sidePanel} ${mobileMenuOpen ? styles.isOpen : ''}`}
              aria-label="Боковое меню"
              aria-hidden={!mobileMenuOpen}
              inert={!mobileMenuOpen}
            >
              <div className={`${styles.sidePanelContent} ${mobileMenuOpen ? styles.isOpen : ''}`}>
                <div className={styles.sidePanelHeader}>
                  <Link href="/" className={styles.logoLink} onClick={closeMobileMenu}>
                    <Image
                      src="/icons/system/logo-mobile.svg"
                      alt="Setly"
                      width={56}
                      height={30}
                      className={styles.logoMobile}
                      draggable={false}
                    />
                  </Link>
                  <button
                    type="button"
                    className={styles.mobileMenuTrigger}
                    onClick={closeMobileMenu}
                    aria-label="Закрыть меню"
                  >
                    <Image
                      src="/icons/system/Cross.svg"
                      alt=""
                      width={15}
                      height={15}
                      aria-hidden
                      draggable={false}
                    />
                  </button>
                </div>

                <div className={styles.sidePanelLoginWrap}>
                  <div className={styles.sidePanelLoginButton}>
                    {!isLoggedIn ? (
                      <button
                        type="button"
                        className={styles.headerAuthButton}
                        onClick={handleLoginClick}
                      >
                        <span className={styles.headerAuthButtonText}>Войти</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.headerAuthButton}
                        onClick={handleProfileClick}
                      >
                        <span className={styles.headerAuthButtonText}>Профиль</span>
                      </button>
                    )}
                  </div>
                </div>

                {!hideNavigation && (
                  <nav className={styles.sidePanelNav} aria-label="Разделы">
                    <nav className={styles.sidePanelNavInner} role="navigation" aria-label="Навигация по разделам">
                      <ul className={styles.sidePanelNavList}>
                        {NAV_ITEMS.map((item) => (
                          <li key={item.id} className={styles.sidePanelNavItem}>
                            {renderNavLink(item, styles.sidePanelNavLink, closeMobileMenuSimple)}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </nav>
                )}

                <div className={styles.sidePanelFooter}>
                  <div className={styles.sidePanelFooterLinks}>
                    <Link href="/privacy" onClick={closeMobileMenu}>
                      Политика конфиденциальности
                    </Link>
                    <Link href="/terms" onClick={closeMobileMenu}>
                      Пользовательское соглашение
                    </Link>
                  </div>
                  <div className={styles.sidePanelFooterBottom}>
                    <p className={styles.sidePanelCopyright}>© 2025 Setly.</p>
                    <p className={styles.sidePanelSlogan}>
                      Когда подготовка исчезает — остаётся только предвкушение
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </header>
  );
}
