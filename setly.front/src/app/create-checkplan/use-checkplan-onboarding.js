"use client";

import { useState, useCallback } from "react";
import { useAnimatedClosing } from "./use-animated-closing";

export function useCheckplanOnboarding(showOnboardingInitially) {
	const [showOnboardingPopup, setShowOnboardingPopup] = useState(() => Boolean(showOnboardingInitially));
	const [onboardingPopupClosing, setOnboardingPopupClosing] = useState(false);
	const [onboardingStep, setOnboardingStep] = useState(1);

	const openOnboardingPopup = useCallback(() => {
		setShowOnboardingPopup(true);
		setOnboardingPopupClosing(false);
		setOnboardingStep(1);
	}, []);

	const closeOnboardingPopup = useAnimatedClosing(
		setOnboardingPopupClosing,
		useCallback(() => {
			setShowOnboardingPopup(false);
		}, [])
	);

	const goOnboardingNextStep = useCallback(() => {
		setOnboardingStep((s) => (s < 4 ? s + 1 : s));
	}, []);

	const goOnboardingPrevStep = useCallback(() => {
		setOnboardingStep((s) => Math.max(1, s - 1));
	}, []);

	return {
		showOnboardingPopup,
		onboardingPopupClosing,
		onboardingStep,
		openOnboardingPopup,
		closeOnboardingPopup,
		goOnboardingNextStep,
		goOnboardingPrevStep,
	};
}
