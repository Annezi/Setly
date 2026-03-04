'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import ProfilePhoto from '@/app/components/atomic/atoms/profile-photo/profile-photo';
import { getAuth } from '@/app/lib/auth-storage';
import styles from './header.module.css';

const NAV_ITEMS = [
  { id: 'check-plans', label: 'Чек-планы', href: '/check-plans' },
  { id: 'articles', label: 'Статьи', href: '#' },
  { id: 'tests', label: 'Тесты', href: '#' },
  { id: 'about', label: 'О нас', href: '#' },
];

export function Header({ isLoggedIn: isLoggedInProp, user: userProp, hideNavigation = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [storageAuth, setStorageAuth] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setStorageAuth(getAuth());
  }, [pathname]);
  useEffect(() => {
    const onAuthUpdate = () => setStorageAuth(getAuth());
    window.addEventListener('setly:auth-update', onAuthUpdate);
    return () => window.removeEventListener('setly:auth-update', onAuthUpdate);
  }, []);

  const isLoggedIn = isLoggedInProp ?? Boolean(storageAuth?.user);
  const user = userProp ?? storageAuth?.user ?? null;

  const activeNavId =
    NAV_ITEMS.find((item) => item.href && (pathname === item.href || pathname.startsWith(item.href + '/')))?.id ?? null;

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((v) => !v), []);

  const handleLoginClick = useCallback(() => {
    closeMobileMenu();
    router.push('/login');
  }, [closeMobileMenu, router]);

  const handleProfileClick = useCallback(() => {
    closeMobileMenu();
    router.push('/account');
  }, [closeMobileMenu, router]);

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
          />
          <Image
            src="/icons/system/logo-mobile.svg"
            alt="Setly"
            width={56}
            height={30}
            className={styles.logoMobile}
          />
        </Link>

        {!hideNavigation && (
          <div className={styles.navWrap}>
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
              <ProfilePhoto
                src={user?.profile_photo_url ?? user?.avatarPath}
                href="/account"
                hideUploadOnHover
                size={44}
                className={styles.headerProfilePhoto}
              />
            )}
          </span>

          <button
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
              />
            ) : (
              <Image
                src="/icons/system/Burger.svg"
                alt=""
                width={15}
                height={15}
                aria-hidden
              />
            )}
          </button>
        </div>
      </div>

      {/* Оверлей и боковое меню — рендер в body, чтобы перекрывать весь viewport без зазоров */}
      {mounted &&
        createPortal(
          <>
            <div
              className={`${styles.overlay} ${mobileMenuOpen ? styles.isOpen : ''}`}
              onClick={closeMobileMenu}
              aria-hidden
            />
            <aside
              className={`${styles.sidePanel} ${mobileMenuOpen ? styles.isOpen : ''}`}
              aria-label="Боковое меню"
              aria-hidden={!mobileMenuOpen}
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
                            {renderNavLink(item, styles.sidePanelNavLink, closeMobileMenu)}
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
