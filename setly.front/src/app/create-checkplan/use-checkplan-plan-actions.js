"use client";

import { useState, useCallback, useEffect } from "react";
import { apiFetch } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import { useAnimatedClosing } from "./use-animated-closing";
import { buildCheckplanPublicSegment } from "@/app/lib/slug";

export function useCheckplanPlanActions({ planIdStr, fromAccount, router }) {
	const [showDuplicateSuccessPopup, setShowDuplicateSuccessPopup] = useState(false);
	const [duplicateSuccessClosing, setDuplicateSuccessClosing] = useState(false);
	const [duplicatedNavSegment, setDuplicatedNavSegment] = useState(null);
	const [duplicateInProgress, setDuplicateInProgress] = useState(false);

	const [showDeleteCheckplanPopup, setShowDeleteCheckplanPopup] = useState(false);
	const [deleteCheckplanClosing, setDeleteCheckplanClosing] = useState(false);
	const [deleteCheckplanInProgress, setDeleteCheckplanInProgress] = useState(false);
	const [isPinned, setIsPinned] = useState(false);
	const [pinInProgress, setPinInProgress] = useState(false);
	const [showPinLimitReachedPopup, setShowPinLimitReachedPopup] = useState(false);
	const [pinLimitReachedClosing, setPinLimitReachedClosing] = useState(false);

	const closeDuplicateSuccessPopup = useAnimatedClosing(
		setDuplicateSuccessClosing,
		useCallback(() => {
			setShowDuplicateSuccessPopup(false);
			setDuplicatedNavSegment(null);
		}, [])
	);

	const handleDuplicatePlan = useCallback(async () => {
		if (!planIdStr || duplicateInProgress) return;
		setDuplicateInProgress(true);
		try {
			const token = getAuth()?.token;
			const res = await apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}/copy`, {
				method: "POST",
				token,
			});
			const data = res.ok ? await res.json().catch(() => null) : null;
			if (data?.id_str) {
				setDuplicatedNavSegment(
					buildCheckplanPublicSegment({
						id_str: data.id_str,
						title: data?.title,
						id: typeof data?.id === "number" ? data.id : undefined,
					})
				);
				setShowDuplicateSuccessPopup(true);
			}
		} finally {
			setDuplicateInProgress(false);
		}
	}, [planIdStr, duplicateInProgress]);

	const handleDuplicateSuccessGoToCopy = useCallback(() => {
		closeDuplicateSuccessPopup(() => {
			if (duplicatedNavSegment) {
				router.push(`/create-checkplan/${encodeURIComponent(duplicatedNavSegment)}`);
			}
		});
	}, [closeDuplicateSuccessPopup, duplicatedNavSegment, router]);

	const openDeleteCheckplanPopup = useCallback(() => setShowDeleteCheckplanPopup(true), []);

	const closeDeleteCheckplanPopup = useAnimatedClosing(
		setDeleteCheckplanClosing,
		useCallback(() => {
			setShowDeleteCheckplanPopup(false);
		}, [])
	);

	const closePinLimitReachedPopup = useAnimatedClosing(
		setPinLimitReachedClosing,
		useCallback(() => {
			setShowPinLimitReachedPopup(false);
		}, [])
	);

	const loadPinnedState = useCallback(async () => {
		if (!planIdStr) {
			setIsPinned(false);
			return;
		}
		try {
			const token = getAuth()?.token;
			if (!token) {
				setIsPinned(false);
				return;
			}
			const res = await apiFetch("/api/user/me/checkplans", { method: "GET", token });
			if (!res.ok) return;
			const data = await res.json().catch(() => null);
			const pinnedIds = Array.isArray(data?.pinned_id_strs) ? data.pinned_id_strs.map(String) : [];
			setIsPinned(pinnedIds.includes(String(planIdStr)));
		} catch (_) {}
	}, [planIdStr]);

	const confirmDeleteCheckplan = useCallback(async () => {
		if (deleteCheckplanInProgress) return;
		if (planIdStr) {
			setDeleteCheckplanInProgress(true);
			try {
				const token = getAuth()?.token;
				const res = await apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}`, {
					method: "DELETE",
					token,
				});
				if (!res.ok) {
					setDeleteCheckplanInProgress(false);
					return;
				}
			} catch (_) {
				setDeleteCheckplanInProgress(false);
				return;
			}
		}
		setDeleteCheckplanInProgress(false);
		closeDeleteCheckplanPopup(() => {
			router.push(fromAccount ? "/account" : "/check-plans");
		});
	}, [planIdStr, fromAccount, router, deleteCheckplanInProgress, closeDeleteCheckplanPopup]);

	const handleTogglePin = useCallback(async () => {
		if (!planIdStr || pinInProgress) return;
		setPinInProgress(true);
		try {
			const token = getAuth()?.token;
			if (!token) return;
			if (isPinned) {
				const res = await apiFetch(`/api/user/me/checkplans/${encodeURIComponent(planIdStr)}/pin`, {
					method: "DELETE",
					token,
				});
				if (res.ok) {
					setIsPinned(false);
				}
				return;
			}
			const res = await apiFetch(`/api/user/me/checkplans/${encodeURIComponent(planIdStr)}/pin`, {
				method: "POST",
				token,
			});
			if (res.ok) {
				setIsPinned(true);
				return;
			}
			let message = "";
			try {
				const data = await res.json();
				message = typeof data?.detail === "string" ? data.detail : "";
			} catch (_) {}
			if (message.includes("Достигнут максимум закреплённых чек-планов")) {
				setShowPinLimitReachedPopup(true);
			}
		} finally {
			setPinInProgress(false);
		}
	}, [planIdStr, pinInProgress, isPinned]);

	useEffect(() => {
		loadPinnedState();
	}, [loadPinnedState]);

	return {
		showDuplicateSuccessPopup,
		duplicateSuccessClosing,
		duplicateInProgress,
		showDeleteCheckplanPopup,
		deleteCheckplanClosing,
		deleteCheckplanInProgress,
		isPinned,
		pinInProgress,
		showPinLimitReachedPopup,
		pinLimitReachedClosing,
		handleDuplicatePlan,
		handleDuplicateSuccessGoToCopy,
		openDeleteCheckplanPopup,
		closeDeleteCheckplanPopup,
		confirmDeleteCheckplan,
		handleTogglePin,
		closePinLimitReachedPopup,
		loadPinnedState,
	};
}
