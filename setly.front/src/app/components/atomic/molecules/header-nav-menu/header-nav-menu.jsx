'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './header-nav-menu.module.css';

const DEFAULT_ITEMS = [
  { id: 'check-plans', label: 'Чек-планы', href: '/docs/organisms' },
  { id: 'articles', label: 'Статьи', href: '/docs/molecules' },
  { id: 'tests', label: 'Тесты', href: '/tests' },
  { id: 'about', label: 'О нас', href: '/about' },
];

export function HeaderNavMenu({ items = DEFAULT_ITEMS, activeId: activeIdProp, onLinkClick, linkClassName }) {
  const pathname = usePathname();
  const activeId =
    activeIdProp ??
    items.find((item) => item.href && (pathname === item.href || pathname.startsWith(item.href + '/')))?.id;
  const buttonClass = linkClassName ? `${styles.button} ${linkClassName}` : styles.button;

  return (
    <nav className={styles.nav} role="navigation" aria-label="Навигация по разделам">
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const content = <span className={`${styles.label} subinfo`}>{item.label}</span>;

          if (item.href) {
            return (
              <li key={item.id} className={styles.item}>
                <Link
                  href={item.href}
                  className={buttonClass}
                  data-active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={onLinkClick}
                >
                  {content}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.id} className={styles.item}>
              <button
                type="button"
                className={buttonClass}
                data-active={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={onLinkClick}
              >
                {content}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
