"use client";

import { memo, useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import { getAuth } from "@/app/lib/auth-storage";
import { apiFetch } from "@/app/lib/api";
import { useMobileFloatingToolbar } from "./use-mobile-floating-toolbar";
import { copyCheckplanLink } from "./copy-checkplan-link";
import styles from "./create-checkplan.module.css";

/** Тулбар режима просмотра: кнопка «Редактировать чек-план», Share, More */
export const ViewModeToolbar = memo(function ViewModeToolbar({
	planIdStr,
	fromAccount = false,
	visibility = "private",
	onVisibilityChange,
	onCopyLink,
	onDuplicatePlan,
	onDeletePlan,
	duplicateInProgress = false,
}) {
	const [shareMenuOpen, setShareMenuOpen] = useState(false);
	const [moreMenuOpen, setMoreMenuOpen] = useState(false);
	const [shareMenuPosition, setShareMenuPosition] = useState({ bottom: 0, left: 0 });
	const [moreMenuPosition, setMoreMenuPosition] = useState({ bottom: 0, left: 0 });
	const [visibilityLoading, setVisibilityLoading] = useState(false);
	const shareWrapRef = useRef(null);
	const moreWrapRef = useRef(null);
	const shareTriggerRef = useRef(null);
	const moreTriggerRef = useRef(null);
	const toolbarRef = useRef(null);
	const anchorRef = useRef(null);
	const isFloatingOnMobile = useMobileFloatingToolbar(anchorRef, toolbarRef);

	const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
	const isPublic = visibility === "public";

	const updateSharePosition = useCallback(() => {
		const triggerEl = shareTriggerRef.current;
		const toolbarEl = toolbarRef.current;
		if (isNarrow && toolbarEl) {
			const rect = toolbarEl.getBoundingClientRect();
			setShareMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		} else if (triggerEl) {
			const rect = triggerEl.getBoundingClientRect();
			setShareMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		}
	}, [isNarrow]);

	const updateMorePosition = useCallback(() => {
		const triggerEl = moreTriggerRef.current;
		const toolbarEl = toolbarRef.current;
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
	}, [isNarrow]);

	const handleShareClick = useCallback(() => {
		if (!shareMenuOpen) {
			updateSharePosition();
		}
		setShareMenuOpen((prev) => !prev);
	}, [shareMenuOpen, updateSharePosition]);

	const handleMoreClick = useCallback(() => {
		if (!moreMenuOpen) {
			updateMorePosition();
		}
		setMoreMenuOpen((prev) => !prev);
	}, [moreMenuOpen, updateMorePosition]);

	const handlePublishOrPrivate = useCallback(async () => {
		const newVisibility = isPublic ? "private" : "public";
		setVisibilityLoading(true);
		try {
			const token = getAuth()?.token;
			const res = await apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}`, {
				method: "PATCH",
				body: { visibility: newVisibility },
				token,
			});
			if (res.ok) {
				onVisibilityChange?.(newVisibility);
			}
		} finally {
			setVisibilityLoading(false);
		}
		setShareMenuOpen(false);
	}, [planIdStr, isPublic, onVisibilityChange]);

	const handleCopyLink = useCallback(() => {
		copyCheckplanLink(planIdStr, onCopyLink).finally(() => {
			setShareMenuOpen(false);
		});
	}, [planIdStr, onCopyLink]);

	useEffect(() => {
		if (!shareMenuOpen) return;
		const h = (e) => {
			const inWrap = shareWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.viewModeShareMenuPortal}`);
			if (!inWrap && !menuEl?.contains(e.target)) setShareMenuOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, [shareMenuOpen]);

	useEffect(() => {
		if (!moreMenuOpen) return;
		const h = (e) => {
			const inWrap = moreWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.viewModeMoreMenuPortal}`);
			if (!inWrap && !menuEl?.contains(e.target)) setMoreMenuOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, [moreMenuOpen]);

	const shareMenuContent = shareMenuOpen && (
		<div
			className={`component-blur ${styles.viewModeShareMenu} ${styles.moreMenuOpen} ${styles.viewModeShareMenuPortal}`}
			role="menu"
			style={{ bottom: shareMenuPosition.bottom, left: shareMenuPosition.left }}
		>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem}`}
				role="menuitem"
				onClick={handlePublishOrPrivate}
				disabled={visibilityLoading}
			>
				{isPublic ? "Сделать приватным" : "Опубликовать чек-план"}
			</button>
			<button type="button" className={`subinfo ${styles.moreMenuItem}`} role="menuitem" onClick={handleCopyLink}>
				Поделиться по ссылке
			</button>
		</div>
	);

	const moreMenuContent = moreMenuOpen && (
		<div
			className={`component-blur ${styles.moreMenu} ${styles.moreMenuOpen} ${styles.viewModeMoreMenuPortal}`}
			role="menu"
			style={{ bottom: moreMenuPosition.bottom, left: moreMenuPosition.left }}
		>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem}`}
				role="menuitem"
				disabled={duplicateInProgress}
				onClick={() => {
					setMoreMenuOpen(false);
					onDuplicatePlan?.();
				}}
			>
				{duplicateInProgress ? "Дублирование…" : "Дублировать чек-план"}
			</button>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem} ${styles.moreMenuItemDanger}`}
				role="menuitem"
				onClick={() => {
					setMoreMenuOpen(false);
					onDeletePlan?.();
				}}
			>
				Удалить чек-план
			</button>
		</div>
	);

	return (
		<div className={`${styles.bottomBar} ${styles.bottomBarViewMode} ${isFloatingOnMobile ? styles.bottomBarMobileFloating : ""}`}>
			<div ref={anchorRef} className={styles.bottomBarMobileAnchor} aria-hidden />
			<div className={styles.viewModeToolbar} ref={toolbarRef}>
				<Link href={`/create-checkplan/${encodeURIComponent(planIdStr)}${fromAccount ? "?from=account" : ""}`} className={styles.viewModeEditWrap} aria-label="Редактировать чек-план">
					<Button Text="Редактировать чек-план" color="blue" size="small" type="button" />
				</Link>
				<div className={styles.viewModeToolbarIcons}>
					<div ref={shareWrapRef} className={styles.toolbarMoreWrap}>
						<button
							ref={shareTriggerRef}
							type="button"
							className={styles.toolbarButtonTransparent}
							aria-label="Поделиться"
							aria-expanded={shareMenuOpen}
							aria-haspopup="menu"
							onClick={handleShareClick}
						>
							<Image src="/icons/system/Share.svg" alt="" width={20} height={20} className={styles.viewModeShareIcon} />
						</button>
					</div>
					<div ref={moreWrapRef} className={styles.toolbarMoreWrap}>
						<button
							ref={moreTriggerRef}
							type="button"
							className={styles.toolbarButtonTransparent}
							aria-label="Ещё"
							aria-expanded={moreMenuOpen}
							aria-haspopup="menu"
							onClick={handleMoreClick}
						>
							<Image src="/icons/system/Vector.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
						</button>
					</div>
				</div>
			</div>
			{typeof document !== "undefined" && shareMenuOpen && createPortal(shareMenuContent, document.body)}
			{typeof document !== "undefined" && moreMenuOpen && createPortal(moreMenuContent, document.body)}
		</div>
	);
});
