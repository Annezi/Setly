"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page-back-link.module.css";

/**
 * Кнопка «Назад»: круглая иконка + подпись.
 * На десктопе — position: fixed под логотипом; на мобильных — в потоке документа.
 */
export default function PageBackLink({
	href,
	onClick,
	ariaLabel = "Назад",
	label = "Назад",
	className = "",
}) {
	const rootClassName = [styles.root, className].filter(Boolean).join(" ");

	const content = (
		<>
			<span className={styles.icon} aria-hidden>
				<Image
					src="/icons/system/ArrowLeft.svg"
					alt=""
					width={20}
					height={20}
					className={styles.iconImg}
				/>
			</span>
			<span className={`${styles.label} subinfo`}>{label}</span>
		</>
	);

	if (href) {
		return (
			<Link href={href} className={rootClassName} aria-label={ariaLabel}>
				{content}
			</Link>
		);
	}

	return (
		<button type="button" className={rootClassName} onClick={onClick} aria-label={ariaLabel}>
			{content}
		</button>
	);
}
