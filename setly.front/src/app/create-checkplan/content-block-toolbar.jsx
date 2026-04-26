"use client";
/* eslint-disable @next/next/no-img-element -- иконки тулбара блока контента */

import { memo } from "react";
import styles from "./create-checkplan.module.css";

/** Вверх / вниз / удалить блок — одинаковый UI для текстового и специальных блоков редактора */
export const ContentBlockToolbar = memo(function ContentBlockToolbar({
	readOnly,
	canMoveUp,
	canMoveDown,
	onMoveUp,
	onMoveDown,
	onRemove,
}) {
	if (readOnly) return null;
	return (
		<div className={styles.textBlockToolbar}>
			<button
				type="button"
				className={styles.textBlockToolbarBtn}
				aria-label="Поднять блок выше"
				disabled={!canMoveUp}
				onClick={(e) => {
					e.preventDefault();
					canMoveUp && onMoveUp?.();
				}}
			>
				<img src="/icons/system/ArrowUp.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
			</button>
			<button
				type="button"
				className={styles.textBlockToolbarBtn}
				aria-label="Опустить блок ниже"
				disabled={!canMoveDown}
				onClick={(e) => {
					e.preventDefault();
					canMoveDown && onMoveDown?.();
				}}
			>
				<img src="/icons/system/ArrowDown.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
			</button>
			<button
				type="button"
				className={styles.textBlockToolbarBtn}
				aria-label="Удалить блок"
				onClick={(e) => {
					e.preventDefault();
					onRemove?.();
				}}
			>
				<img src="/icons/system/Cross.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
			</button>
		</div>
	);
});
