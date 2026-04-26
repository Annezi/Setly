"use client";
/* eslint-disable @next/next/no-img-element */

import styles from "./create-checkplan.module.css";

/** Кнопка удаления секции в заголовке («Куда сходить» / «Полезные контакты») */
export function CheckplanSectionHeadingDelete({ sectionTitle, onRemove }) {
	return (
		<button
			type="button"
			className={styles.whereToGoSectionDeleteBtn}
			aria-label={`Удалить секцию «${sectionTitle}»`}
			onClick={(e) => {
				e.preventDefault();
				onRemove();
			}}
		>
			<img src="/icons/system/Cross.svg" alt="" width={16} height={16} />
		</button>
	);
}
