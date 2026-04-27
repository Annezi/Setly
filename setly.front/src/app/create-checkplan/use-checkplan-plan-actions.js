"use client";

import { useState, useCallback } from "react";
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

	return {
		showDuplicateSuccessPopup,
		duplicateSuccessClosing,
		duplicateInProgress,
		showDeleteCheckplanPopup,
		deleteCheckplanClosing,
		deleteCheckplanInProgress,
		handleDuplicatePlan,
		handleDuplicateSuccessGoToCopy,
		openDeleteCheckplanPopup,
		closeDeleteCheckplanPopup,
		confirmDeleteCheckplan,
	};
}
