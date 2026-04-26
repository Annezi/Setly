"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Запускает анимированное закрытие попапа:
 * 1) включает флаг closing,
 * 2) ждёт duration,
 * 3) выполняет onFinish и optional afterClose,
 * 4) сбрасывает флаг closing.
 */
export function useAnimatedClosing(setClosing, onFinish, duration = 280) {
	const timerRef = useRef(null);

	useEffect(() => () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
	}, []);

	return useCallback((afterClose) => {
		setClosing(true);
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			onFinish?.();
			setClosing(false);
			/* onClose из попапов передаёт SyntheticEvent первым аргументом — ?.() не спасает от «не функции». */
			if (typeof afterClose === "function") afterClose();
		}, duration);
	}, [duration, onFinish, setClosing]);
}
