"use client";

import { memo } from "react";
import styles from "./create-checkplan.module.css";

/** Общая оболочка центрированных диалогов (удаление, дублирование, вход и т.д.) */
export const CheckplanCenterDialog = memo(function CheckplanCenterDialog({
	isClosing,
	onOverlayClick,
	titleId,
	title,
	middle = null,
	children,
}) {
	return (
		<div
			className={`${styles.deleteConfirmOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={onOverlayClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
		>
			<div
				className={`${styles.deleteConfirmPopup} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id={titleId} className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					{title}
				</h2>
				{middle}
				<div className={styles.deleteConfirmButtons}>{children}</div>
			</div>
		</div>
	);
});
