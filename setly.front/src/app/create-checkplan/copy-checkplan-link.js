"use client";

export async function copyCheckplanLink(planIdStr, onCopied) {
	const url =
		typeof window !== "undefined"
			? `${window.location.origin}/preview-checkplan/${encodeURIComponent(planIdStr)}`
			: "";
	if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(url);
	}
	onCopied?.();
}
