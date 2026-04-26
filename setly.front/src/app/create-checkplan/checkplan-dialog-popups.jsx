"use client";

import { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import { CheckplanCenterDialog } from "./checkplan-center-dialog";
import styles from "./create-checkplan.module.css";

/** Попап подтверждения удаления блока */
export const DeleteBlockConfirmPopup = memo(function DeleteBlockConfirmPopup({ isClosing, onClose, onConfirm, blockType }) {
	const label =
		blockType === "whereToGo"
			? "Заметки куда сходить"
			: blockType === "usefulContacts"
				? "Полезные контакты"
				: blockType === "budgetTable"
					? "Таблица бюджета"
					: "Текстовый блок";
	return (
		<CheckplanCenterDialog
			isClosing={isClosing}
			onOverlayClick={onClose}
			titleId="delete-confirm-title"
			title={`Вы действительно хотите удалить «${label}»?`}
		>
			<Button Text="Удалить" color="dangerFilled" type="button" onClick={onConfirm} />
			<Button Text="Оставить" color="outline" type="button" onClick={onClose} />
		</CheckplanCenterDialog>
	);
});

export const DeleteRowConfirmPopup = memo(function DeleteRowConfirmPopup({ isClosing, onClose, onConfirm }) {
	return (
		<CheckplanCenterDialog
			isClosing={isClosing}
			onOverlayClick={onClose}
			titleId="delete-row-confirm-title"
			title="Удалить этот ряд?"
		>
			<Button Text="Удалить" color="dangerFilled" type="button" onClick={onConfirm} />
			<Button Text="Оставить" color="outline" type="button" onClick={onClose} />
		</CheckplanCenterDialog>
	);
});

export const DuplicateSuccessPopup = memo(function DuplicateSuccessPopup({ isClosing, onClose, onGoToCopy }) {
	return (
		<CheckplanCenterDialog
			isClosing={isClosing}
			onOverlayClick={onClose}
			titleId="duplicate-success-title"
			title="Успешно дублировано"
		>
			<Button Text="Перейти в копию" color="blue" type="button" onClick={onGoToCopy} />
			<Button Text="Остаться тут" color="outline" type="button" onClick={onClose} />
		</CheckplanCenterDialog>
	);
});

export const DeleteCheckplanConfirmPopup = memo(function DeleteCheckplanConfirmPopup({ isClosing, onClose, onConfirm, loading = false }) {
	return (
		<CheckplanCenterDialog
			isClosing={isClosing}
			onOverlayClick={loading ? undefined : onClose}
			titleId="delete-checkplan-confirm-title"
			title="Вы действительно хотите удалить чек-план?"
		>
			<Button
				Text={loading ? "Удаление…" : "Да, удалить"}
				color="dangerFilled"
				type="button"
				onClick={onConfirm}
				disabled={loading}
			/>
			<Button Text="Оставить" color="blue" type="button" onClick={onClose} disabled={loading} />
		</CheckplanCenterDialog>
	);
});

/** Тостер «Ссылка на Чек-план скопирована» */
export const CopyLinkToast = memo(function CopyLinkToast({ show, onExited }) {
	useEffect(() => {
		if (!show) return;
		const t = setTimeout(() => {
			onExited?.();
		}, 2000);
		return () => clearTimeout(t);
	}, [show, onExited]);
	if (!show || typeof document === "undefined") return null;
	return createPortal(
		<div className={styles.copyLinkToast} role="status" aria-live="polite">
			Ссылка на Чек-план скопирована
		</div>,
		document.body
	);
});

export const LoginToLikePopup = memo(function LoginToLikePopup({ isClosing, onClose, onLogin }) {
	return (
		<CheckplanCenterDialog
			isClosing={isClosing}
			onOverlayClick={onClose}
			titleId="login-to-like-title"
			title="Войдите, чтобы поставить Лайк"
		>
			<Button Text="Войти" color="blue" type="button" onClick={onLogin} />
		</CheckplanCenterDialog>
	);
});

export const ReportSentPopup = memo(function ReportSentPopup({ isClosing, onClose }) {
	return (
		<CheckplanCenterDialog
			isClosing={isClosing}
			onOverlayClick={onClose}
			titleId="report-sent-title"
			title="Жалоба отправлена"
			middle={
				<p className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>
					Если данный чек-план нарушает{" "}
					<a href="/__not_found__" className={styles.reportPopupLink}>Политику конфиденциальности</a>
					{" и/или "}
					<a href="/__not_found__" className={styles.reportPopupLink}>Пользовательское соглашение</a>
					, будут приняты меры в отношении данного чек-плана и его создателя.
				</p>
			}
		>
			<Button Text="Хорошо" color="blue" type="button" onClick={onClose} />
		</CheckplanCenterDialog>
	);
});
