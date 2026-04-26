"use client";

import { memo, useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import { ADD_BLOCK_ITEMS } from "./create-checkplan-data";
import { useMobileFloatingToolbar } from "./use-mobile-floating-toolbar";
import styles from "./create-checkplan.module.css";

export const BottomBarSection = memo(function BottomBarSection({
	hasChanges,
	onQuestionClick,
	onAddTextBlock,
	canAddTextBlock,
	onAddWhereToGoBlock,
	canAddWhereToGoBlock,
	onAddUsefulContactsBlock,
	canAddUsefulContactsBlock,
	onAddBudgetTableBlock,
	canAddBudgetTableBlock,
	onSave,
	saveLoading,
	onDuplicatePlan,
	onDeletePlan,
	duplicateInProgress = false,
}) {
	const [addBlockMenuOpen, setAddBlockMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0 });
	const [moreMenuOpen, setMoreMenuOpen] = useState(false);
	const [moreMenuPosition, setMoreMenuPosition] = useState({ bottom: 0, left: 0 });
	const toolbarAddWrapRef = useRef(null);
	const triggerButtonRef = useRef(null);
	const moreMenuWrapRef = useRef(null);
	const moreMenuTriggerRef = useRef(null);
	const toolbarRef = useRef(null);
	const anchorRef = useRef(null);
	const isFloatingOnMobile = useMobileFloatingToolbar(anchorRef, toolbarRef);

	const handleAddButtonClick = useCallback(() => {
		if (!addBlockMenuOpen) {
			const toolbarEl = toolbarRef.current;
			const triggerEl = triggerButtonRef.current;
			const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
			if (isNarrow && toolbarEl) {
				const rect = toolbarEl.getBoundingClientRect();
				setMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			} else if (triggerEl) {
				const rect = triggerEl.getBoundingClientRect();
				setMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			}
		}
		setAddBlockMenuOpen((prev) => !prev);
	}, [addBlockMenuOpen]);

	const handleMoreButtonClick = useCallback(() => {
		if (!moreMenuOpen) {
			const toolbarEl = toolbarRef.current;
			const triggerEl = moreMenuTriggerRef.current;
			const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
			if (isNarrow && toolbarEl) {
				const rect = toolbarEl.getBoundingClientRect();
				setMoreMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			} else if (triggerEl) {
				const rect = triggerEl.getBoundingClientRect();
				setMoreMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			}
		}
		setMoreMenuOpen((prev) => !prev);
	}, [moreMenuOpen]);

	const handleAddBlockSelect = useCallback(
		(item) => {
			setAddBlockMenuOpen(false);
			if (item.text === "Текстовый блок" && canAddTextBlock) {
				onAddTextBlock?.();
			}
			if (item.text === "Блок \"Куда сходить\"" && canAddWhereToGoBlock) {
				onAddWhereToGoBlock?.();
			}
			if (item.text === "Блок \"Полезные контакты\"" && canAddUsefulContactsBlock) {
				onAddUsefulContactsBlock?.();
			}
			if (item.text === "Блок \"Таблица Бюджета\"" && canAddBudgetTableBlock) {
				onAddBudgetTableBlock?.();
			}
		},
		[
			onAddTextBlock,
			canAddTextBlock,
			onAddWhereToGoBlock,
			canAddWhereToGoBlock,
			onAddUsefulContactsBlock,
			canAddUsefulContactsBlock,
			onAddBudgetTableBlock,
			canAddBudgetTableBlock,
		]
	);

	useEffect(() => {
		if (!addBlockMenuOpen) return;
		const handleClickOutside = (e) => {
			const inWrap = toolbarAddWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.addBlockMenuPortal}`);
			const inMenu = menuEl?.contains(e.target);
			if (!inWrap && !inMenu) setAddBlockMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [addBlockMenuOpen]);

	useEffect(() => {
		if (!moreMenuOpen) return;
		const handleClickOutside = (e) => {
			const inWrap = moreMenuWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.moreMenuPortal}`);
			const inMenu = menuEl?.contains(e.target);
			if (!inWrap && !inMenu) setMoreMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [moreMenuOpen]);

	const handleMoreMenuDuplicate = useCallback(() => {
		setMoreMenuOpen(false);
		onDuplicatePlan?.();
	}, [onDuplicatePlan]);

	const handleMoreMenuDelete = useCallback(() => {
		setMoreMenuOpen(false);
		onDeletePlan?.();
	}, [onDeletePlan]);

	const menuContent = addBlockMenuOpen && (
		<div
			className={`component-blur ${styles.addBlockMenu} ${styles.addBlockMenuOpen} ${styles.addBlockMenuPortal}`}
			role="menu"
			style={{
				bottom: menuPosition.bottom,
				left: menuPosition.left,
			}}
		>
			{ADD_BLOCK_ITEMS.map((item, index) => {
				const isTextBlock = item.text === "Текстовый блок";
				const isWhereToGoBlock = item.text === "Блок \"Куда сходить\"";
				const isUsefulContactsBlock = item.text === "Блок \"Полезные контакты\"";
				const isBudgetTableBlock = item.text === "Блок \"Таблица Бюджета\"";
				const disabled =
					(isTextBlock && !canAddTextBlock) ||
					(isWhereToGoBlock && !canAddWhereToGoBlock) ||
					(isUsefulContactsBlock && !canAddUsefulContactsBlock) ||
					(isBudgetTableBlock && !canAddBudgetTableBlock);
				return (
					<button
						key={index}
						type="button"
						className={`subinfo ${styles.addBlockMenuItem}`}
						role="menuitem"
						disabled={disabled}
						onClick={() => handleAddBlockSelect(item)}
					>
						<Image src={item.icon} alt="" width={20} height={20} className={styles.addBlockMenuIcon} />
						<span>{item.text}</span>
					</button>
				);
			})}
		</div>
	);

	return (
		<div className={`${styles.bottomBar} ${isFloatingOnMobile ? styles.bottomBarMobileFloating : ""}`}>
			<div ref={anchorRef} className={styles.bottomBarMobileAnchor} aria-hidden />
			<div className={styles.toolbar} ref={toolbarRef}>
				<div className={styles.toolbarIconsRow}>
					<button type="button" className={`${styles.toolbarButtonQuestion} `} aria-label="Помощь" onClick={onQuestionClick}>
						<Image src="/icons/system/QuestionSign.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
					</button>
					<div className={`${styles.toolbarGroup} `}>
						<div ref={toolbarAddWrapRef} className={styles.toolbarAddWrap}>
							<button
								ref={triggerButtonRef}
								type="button"
								className={styles.toolbarButtonTransparent}
								aria-label="Добавить блок"
								aria-expanded={addBlockMenuOpen}
								aria-haspopup="menu"
								onClick={handleAddButtonClick}
							>
								<Image src="/icons/system/CrossMiniDark.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
							</button>
						</div>
						<div ref={moreMenuWrapRef} className={styles.toolbarMoreWrap}>
							<button
								ref={moreMenuTriggerRef}
								type="button"
								className={styles.toolbarButtonTransparent}
								aria-label="Ещё"
								aria-expanded={moreMenuOpen}
								aria-haspopup="menu"
								onClick={handleMoreButtonClick}
							>
								<Image src="/icons/system/Vector.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
							</button>
						</div>
					</div>
				</div>
				<div className={styles.toolbarSaveWrap}>
					<Button
						Text={saveLoading ? "Сохранение…" : "Сохранить и выйти"}
						color={hasChanges ? "blue" : "inactive"}
						size="small"
						type="button"
						disabled={!hasChanges || saveLoading}
						title={!hasChanges && !saveLoading ? "Внесите изменения, чтобы сохранить" : undefined}
						onClick={onSave}
					/>
				</div>
			</div>
			{typeof document !== "undefined" && addBlockMenuOpen && createPortal(menuContent, document.body)}
			{typeof document !== "undefined" &&
				moreMenuOpen &&
				createPortal(
					<div
						className={`component-blur ${styles.moreMenu} ${styles.moreMenuOpen} ${styles.moreMenuPortal}`}
						role="menu"
						style={{
							bottom: moreMenuPosition.bottom,
							left: moreMenuPosition.left,
						}}
					>
						<button
							type="button"
							className={`subinfo ${styles.moreMenuItem}`}
							role="menuitem"
							disabled={duplicateInProgress}
							onClick={handleMoreMenuDuplicate}
						>
							{duplicateInProgress ? "Дублирование…" : "Дублировать чек-план"}
						</button>
						<button
							type="button"
							className={`subinfo ${styles.moreMenuItem} ${styles.moreMenuItemDanger}`}
							role="menuitem"
							onClick={handleMoreMenuDelete}
						>
							Удалить чек-план
						</button>
					</div>,
					document.body
				)}
		</div>
	);
});
