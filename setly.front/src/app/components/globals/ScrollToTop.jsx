'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * При переходе на другую страницу сразу прокручивает окно вверх без анимации.
 * Использует behavior: 'auto', чтобы переопределить глобальный scroll-behavior: smooth.
 */
export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    return null;
}
