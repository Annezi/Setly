'use client';

import { useEffect } from 'react';

/**
 * Отключает перетаскивание для всех img и svg на странице.
 * Дополняет глобальные CSS-стили для полной поддержки во всех браузерах.
 */
export default function DisableImageDrag() {
    useEffect(() => {
        const disableDrag = () => {
            document.querySelectorAll('img, svg').forEach((el) => {
                el.setAttribute('draggable', 'false');
            });
        };

        disableDrag();

        const observer = new MutationObserver(() => {
            disableDrag();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    return null;
}
