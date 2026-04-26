"use client";
/* eslint-disable @next/next/no-img-element -- иконка удаления в строке списка */

import { memo } from "react";
import DecoratedInput from "@/app/components/atomic/molecules/decorated-input/decorated-input";
import styles from "./create-checkplan.module.css";

/** Строка чеклиста «ручная кладь / багаж» с чекбоксом и опциональным удалением пустой */
export const CheckplanChecklistCheckboxRow = memo(function CheckplanChecklistCheckboxRow({
	item,
	readOnly,
	canToggleCheckboxesOnly,
	maxLength,
	placeholder = "Введите...",
	showDelete,
	onTextChange,
	onCheckboxToggle,
	onRemove,
}) {
	const showPlainReadonly = readOnly && !canToggleCheckboxesOnly;
	return (
		<div className={styles.checklistItemWrap}>
			<div className={styles.checklistItemRow}>
				{showPlainReadonly ? (
					<span className={`paragraph ${styles.checklistDecoratedInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						{item.text || "—"}
					</span>
				) : (
					<DecoratedInput
						decorator="checkbox"
						placeholder={placeholder}
						className={`paragraph ${styles.checklistDecoratedInput}`}
						value={item.text}
						onChange={readOnly ? undefined : onTextChange}
						checkboxChecked={item.checked}
						onCheckboxChange={onCheckboxToggle}
						readOnly={readOnly}
						multiline
						maxLength={maxLength}
					/>
				)}
				{showDelete && (
					<button
						type="button"
						className={styles.checklistItemDelete}
						aria-label="Удалить пункт"
						onClick={(e) => {
							e.preventDefault();
							onRemove?.();
						}}
					>
						<img src="/icons/system/Cross.svg" alt="" width={16} height={16} className={styles.checklistItemDeleteIcon} />
					</button>
				)}
			</div>
		</div>
	);
});

/** Строка «личные заметки» с маркером-пулей */
export const CheckplanPersonalNoteRow = memo(function CheckplanPersonalNoteRow({
	item,
	readOnly,
	showDelete,
	onTextChange,
	onRemove,
}) {
	return (
		<div className={styles.notesItemWrap}>
			<div className={styles.notesItemRow}>
				{readOnly ? (
					<span className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>
						{item.text || "—"}
					</span>
				) : (
					<DecoratedInput
						decorator="bullet"
						placeholder="Введите текст..."
						value={item.text}
						onChange={onTextChange}
					/>
				)}
				{showDelete && (
					<button
						type="button"
						className={styles.notesItemDelete}
						aria-label="Удалить пункт"
						onClick={(e) => {
							e.preventDefault();
							onRemove?.();
						}}
					>
						<img src="/icons/system/Cross.svg" alt="" width={16} height={16} className={styles.notesItemDeleteIcon} />
					</button>
				)}
			</div>
		</div>
	);
});
