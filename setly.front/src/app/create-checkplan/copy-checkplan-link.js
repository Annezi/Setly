"use client";

import { buildCheckplanPublicSegment } from "@/app/lib/slug";

/** @param {{ id_str?: string, title?: string } | string} planLike id_str + title для короткой ссылки или legacy — только строка id_str */
export async function copyCheckplanLink(planLike, onCopied) {
	const segment =
		typeof planLike === "object" && planLike != null && planLike.id_str
			? buildCheckplanPublicSegment(planLike)
			: String(planLike ?? "");
	const url =
		typeof window !== "undefined"
			? `${window.location.origin}/preview-checkplan/${encodeURIComponent(segment)}`
			: "";
	if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(url);
	}
	onCopied?.();
}
