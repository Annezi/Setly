"use client";

import { memo, useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth } from "@/app/lib/auth-storage";
import { apiFetch } from "@/app/lib/api";
import { useLikedChecklists } from "@/app/lib/liked-checklists-context";
import { formatLikesCompact } from "./create-checkplan-utils";
import { useMobileFloatingToolbar } from "./use-mobile-floating-toolbar";
import { copyCheckplanLink } from "./copy-checkplan-link";
import styles from "./create-checkplan.module.css";

/** Тулбар для гостя (не владелец): «Использовать чек-план» / «Войти, чтобы использовать», лайк, ссылка, жалоба */
export const GuestViewToolbar = memo(function GuestViewToolbar({ planIdStr, isAuthenticated, initialLikes = 0, onCopyLink }) {
	const router = useRouter();
	const { isLiked, toggle, getLikeCount, setInitialLikeCounts } = useLikedChecklists();
	const [alertMenuOpen, setAlertMenuOpen] = useState(false);
	const [alertMenuPosition, setAlertMenuPosition] = useState({ bottom: 0, left: 0 });
	const [useLoading, setUseLoading] = useState(false);
	const alertWrapRef = useRef(null);
	const alertTriggerRef = useRef(null);
	const toolbarRef = useRef(null);
	const anchorRef = useRef(null);
	const isFloatingOnMobile = useMobileFloatingToolbar(anchorRef, toolbarRef);

	const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
	const liked = isLiked(planIdStr);
	const likes = getLikeCount(planIdStr);

	useEffect(() => {
		if (planIdStr && typeof initialLikes === "number") {
			setInitialLikeCounts({ [planIdStr]: initialLikes });
		}
	}, [planIdStr, initialLikes, setInitialLikeCounts]);

	const handleUseClick = useCallback(() => {
		if (isAuthenticated) {
			setUseLoading(true);
			const token = getAuth()?.token;
			apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}/copy`, { method: "POST", token })
				.then((r) => (r.ok ? r.json() : null))
				.then((data) => {
					if (data?.id_str) {
						router.push(`/create-checkplan/${encodeURIComponent(data.id_str)}`);
					}
				})
				.finally(() => setUseLoading(false));
		} else {
			router.push("/login");
		}
	}, [isAuthenticated, planIdStr, router]);

	const handleLikeClick = useCallback(() => {
		if (isAuthenticated) {
			toggle(planIdStr);
		} else if (typeof window !== "undefined" && window.dispatchEvent) {
			window.dispatchEvent(new CustomEvent("setly:guest-show-login-to-like"));
		}
	}, [isAuthenticated, planIdStr, toggle]);

	const handleCopyLink = useCallback(() => {
		copyCheckplanLink(planIdStr, onCopyLink);
	}, [planIdStr, onCopyLink]);

	const updateAlertPosition = useCallback(() => {
		const triggerEl = alertTriggerRef.current;
		const toolbarEl = toolbarRef.current;
		if (isNarrow && typeof window !== "undefined") {
			const bottom = toolbarEl ? window.innerHeight - toolbarEl.getBoundingClientRect().top + 12 : 120;
			setAlertMenuPosition({
				bottom,
				left: window.innerWidth / 2,
			});
		} else if (triggerEl) {
			const rect = triggerEl.getBoundingClientRect();
			setAlertMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		}
	}, [isNarrow]);

	const handleAlertClick = useCallback(() => {
		if (!alertMenuOpen) updateAlertPosition();
		setAlertMenuOpen((prev) => !prev);
	}, [alertMenuOpen, updateAlertPosition]);

	useEffect(() => {
		if (!alertMenuOpen) return;
		const h = (e) => {
			const inWrap = alertWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.guestAlertMenuPortal}`);
			if (!inWrap && !menuEl?.contains(e.target)) setAlertMenuOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, [alertMenuOpen]);

	const alertMenuContent = alertMenuOpen && (
		<div
			className={`component-blur ${styles.moreMenu} ${styles.moreMenuOpen} ${styles.guestAlertMenuPortal}`}
			role="menu"
			style={{ bottom: alertMenuPosition.bottom, left: alertMenuPosition.left }}
		>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem} ${styles.moreMenuItemDanger}`}
				role="menuitem"
				onClick={() => {
					setAlertMenuOpen(false);
					if (typeof window !== "undefined" && window.dispatchEvent) {
						window.dispatchEvent(new CustomEvent("setly:guest-show-report-sent"));
					}
				}}
			>
				Пожаловаться
			</button>
		</div>
	);

	const toolbarWidthClass = !isAuthenticated ? styles.guestToolbarWide : "";

	return (
		<div className={`${styles.bottomBar} ${styles.bottomBarGuest} ${isFloatingOnMobile ? styles.bottomBarMobileFloating : ""}`}>
			<div ref={anchorRef} className={styles.bottomBarMobileAnchor} aria-hidden />
			<div className={`${styles.guestToolbar} ${toolbarWidthClass}`} ref={toolbarRef}>
				<button type="button" className={styles.guestToolbarUseButton} onClick={handleUseClick} disabled={useLoading}>
					{isAuthenticated ? (useLoading ? "Создание копии…" : "Использовать чек-план") : "Войти, чтобы использовать"}
				</button>
				<div className={styles.guestToolbarIcons}>
					<button type="button" className={styles.toolbarButtonTransparent} aria-label="Поделиться ссылкой" onClick={handleCopyLink}>
						<Image src="/icons/system/Link.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
					</button>
					<button type="button" className={styles.guestLikesRow} onClick={handleLikeClick} aria-pressed={liked}>
						<Image
							src={liked ? "/icons/images/HeartFull.svg" : "/icons/images/Heart.svg"}
							alt=""
							width={20}
							height={20}
							className={styles.guestLikesIcon}
						/>
						<span className={`label ${styles.guestLikesCount}`}>{formatLikesCompact(likes)}</span>
					</button>
					<div ref={alertWrapRef} className={styles.toolbarMoreWrap}>
						<button
							ref={alertTriggerRef}
							type="button"
							className={styles.toolbarButtonTransparent}
							aria-label="Пожаловаться"
							aria-expanded={alertMenuOpen}
							aria-haspopup="menu"
							onClick={handleAlertClick}
						>
							<Image src="/icons/system/Alert.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
						</button>
					</div>
				</div>
			</div>
			{typeof document !== "undefined" && alertMenuOpen && createPortal(alertMenuContent, document.body)}
		</div>
	);
});
