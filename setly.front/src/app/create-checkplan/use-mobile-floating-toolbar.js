import { useState, useEffect } from "react";
import { MOBILE_TOOLBAR_BOTTOM_OFFSET } from "./create-checkplan-data";

export function useMobileFloatingToolbar(anchorRef, toolbarRef) {
	const [isFloating, setIsFloating] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return undefined;
		const updateFloating = () => {
			const anchorEl = anchorRef.current;
			const toolbarEl = toolbarRef.current;
			if (!anchorEl || !toolbarEl) return;
			if (window.innerWidth > 768) {
				setIsFloating(false);
				return;
			}
			const anchorRect = anchorEl.getBoundingClientRect();
			const toolbarHeight = toolbarEl.offsetHeight || 100;
			const threshold = window.innerHeight - toolbarHeight - MOBILE_TOOLBAR_BOTTOM_OFFSET;
			setIsFloating(anchorRect.top > threshold);
		};
		updateFloating();
		window.addEventListener("scroll", updateFloating, { passive: true });
		window.addEventListener("resize", updateFloating);
		return () => {
			window.removeEventListener("scroll", updateFloating);
			window.removeEventListener("resize", updateFloating);
		};
	}, [anchorRef, toolbarRef]);

	return isFloating;
}
