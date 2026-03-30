'use client';

import { useEffect } from 'react';

/**
 * Отключает перетаскивание для всех img и svg на странице.
 * Дополняет глобальные CSS-стили для полной поддержки во всех браузерах.
 */
export default function DisableImageDrag() {
    useEffect(() => {
        const onDragStart = (event) => {
            const target = event.target;
            if (target instanceof HTMLElement && (target.tagName === 'IMG' || target.tagName === 'SVG')) {
                event.preventDefault();
            }
        };

        document.addEventListener('dragstart', onDragStart, { capture: true });
        return () => document.removeEventListener('dragstart', onDragStart, { capture: true });
    }, []);

    return null;
}
