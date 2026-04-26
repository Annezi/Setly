"use client";

import { useState, useCallback } from "react";
import { useAnimatedClosing } from "./use-animated-closing";

export function useCheckplanGuestFeedbackPopups() {
	const [showLoginToLikePopup, setShowLoginToLikePopup] = useState(false);
	const [loginToLikeClosing, setLoginToLikeClosing] = useState(false);
	const [showReportSentPopup, setShowReportSentPopup] = useState(false);
	const [reportSentClosing, setReportSentClosing] = useState(false);

	const openLoginToLikePopup = useCallback(() => {
		setShowLoginToLikePopup(true);
	}, []);

	const openReportSentPopup = useCallback(() => {
		setShowReportSentPopup(true);
	}, []);

	const closeLoginToLikePopup = useAnimatedClosing(
		setLoginToLikeClosing,
		useCallback(() => {
			setShowLoginToLikePopup(false);
		}, [])
	);

	const closeReportSentPopup = useAnimatedClosing(
		setReportSentClosing,
		useCallback(() => {
			setShowReportSentPopup(false);
		}, [])
	);

	return {
		showLoginToLikePopup,
		loginToLikeClosing,
		showReportSentPopup,
		reportSentClosing,
		openLoginToLikePopup,
		openReportSentPopup,
		closeLoginToLikePopup,
		closeReportSentPopup,
	};
}
