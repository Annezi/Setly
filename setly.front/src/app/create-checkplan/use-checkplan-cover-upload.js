"use client";

import { useState, useRef, useCallback } from "react";
import { apiFetch, getApiUrl } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import { DEFAULT_COVER_IMAGE, UPLOAD_COVER_API } from "./create-checkplan-utils";

function resolveInitialCoverSrc(initialPlan) {
	const src = initialPlan?.image_src;
	if (!src) return DEFAULT_COVER_IMAGE;
	if (src.startsWith("http") || src.startsWith("/")) return src;
	return `/storage/${src}`;
}

export function useCheckplanCoverUpload(initialPlan) {
	const [coverImage, setCoverImage] = useState(() => resolveInitialCoverSrc(initialPlan));
	const [coverLoading, setCoverLoading] = useState(false);
	const [coverError, setCoverError] = useState(null);
	const [coverFileToCrop, setCoverFileToCrop] = useState(null);
	const coverInputRef = useRef(null);

	const uploadCoverFile = useCallback(async (file) => {
		if (!file) return;
		setCoverError(null);
		setCoverLoading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);

			let token = null;
			try {
				const auth = getAuth();
				if (auth?.token && typeof auth.token === "string") {
					token = auth.token.trim();
				}
			} catch (_) {}

			const res = await apiFetch(UPLOAD_COVER_API, {
				method: "POST",
				token,
				body: formData,
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				const detail = data?.detail;
				const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
				throw new Error(msg || data?.message || "Ошибка загрузки");
			}
			const base = getApiUrl();
			const imageUrl =
				data.url ||
				(base && data.path ? `${base.replace(/\/$/, "")}${data.path}` : null) ||
				data.path ||
				data.coverImagePath;
			if (imageUrl) {
				setCoverImage(imageUrl);
			}
		} catch (err) {
			setCoverError(err.message || "Не удалось загрузить изображение");
		} finally {
			setCoverLoading(false);
		}
	}, []);

	const handleCoverFileChange = useCallback(async (e) => {
		const file = e.target?.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setCoverError("Выберите изображение (JPG, PNG и т.д.)");
			return;
		}
		setCoverFileToCrop(file);
		if (coverInputRef.current) coverInputRef.current.value = "";
	}, []);

	const handleCoverClick = useCallback(() => {
		coverInputRef.current?.click();
	}, []);

	return {
		coverImage,
		coverLoading,
		coverError,
		coverFileToCrop,
		coverInputRef,
		setCoverFileToCrop,
		uploadCoverFile,
		handleCoverFileChange,
		handleCoverClick,
	};
}
