"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, delay = 0, className = "" }) {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef(null);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (reducedMotionQuery.matches) {
			setIsVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (!entry?.isIntersecting) return;

				setIsVisible(true);
				observer.unobserve(entry.target);
			},
			{
				root: null,
				threshold: 0.12,
				rootMargin: "0px 0px -10% 0px",
			}
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={elementRef}
			className={`main-page-scroll-reveal__item${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
			style={{ "--reveal-delay": `${delay}ms` }}
		>
			{children}
		</div>
	);
}
