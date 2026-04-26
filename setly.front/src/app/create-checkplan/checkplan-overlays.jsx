"use client";

import { memo } from "react";
import { createPortal } from "react-dom";
import {
	DeleteBlockConfirmPopup,
	DeleteRowConfirmPopup,
	DuplicateSuccessPopup,
	DeleteCheckplanConfirmPopup,
	LoginToLikePopup,
	ReportSentPopup,
} from "./checkplan-dialog-popups";
import { OnboardingPopup } from "./checkplan-onboarding-popup";

export const CheckplanOverlays = memo(function CheckplanOverlays({
	showOnboardingPopup,
	onboardingPopupClosing,
	onboardingStep,
	closeOnboardingPopup,
	goOnboardingNextStep,
	goOnboardingPrevStep,
	deleteBlockTarget,
	deleteConfirmClosing,
	closeDeleteConfirm,
	confirmDeleteBlock,
	deleteRowTarget,
	deleteRowConfirmClosing,
	closeDeleteRowConfirm,
	confirmDeleteRow,
	showDuplicateSuccessPopup,
	duplicateSuccessClosing,
	closeDuplicateSuccessPopup,
	handleDuplicateSuccessGoToCopy,
	showDeleteCheckplanPopup,
	deleteCheckplanClosing,
	closeDeleteCheckplanPopup,
	confirmDeleteCheckplan,
	deleteCheckplanInProgress,
	showLoginToLikePopup,
	loginToLikeClosing,
	closeLoginToLikePopup,
	loginFromLoginToLikePopup,
	showReportSentPopup,
	reportSentClosing,
	closeReportSentPopup,
}) {
	if (typeof document === "undefined") return null;

	return (
		<>
			{showOnboardingPopup &&
				createPortal(
					<OnboardingPopup
						isClosing={onboardingPopupClosing}
						step={onboardingStep}
						onClose={closeOnboardingPopup}
						onNextStep={goOnboardingNextStep}
						onPrevStep={goOnboardingPrevStep}
					/>,
					document.body
				)}
			{deleteBlockTarget != null &&
				createPortal(
					<DeleteBlockConfirmPopup
						isClosing={deleteConfirmClosing}
						onClose={closeDeleteConfirm}
						onConfirm={confirmDeleteBlock}
						blockType={deleteBlockTarget.type}
					/>,
					document.body
				)}
			{deleteRowTarget != null &&
				createPortal(
					<DeleteRowConfirmPopup
						isClosing={deleteRowConfirmClosing}
						onClose={closeDeleteRowConfirm}
						onConfirm={confirmDeleteRow}
					/>,
					document.body
				)}
			{showDuplicateSuccessPopup &&
				createPortal(
					<DuplicateSuccessPopup
						isClosing={duplicateSuccessClosing}
						onClose={closeDuplicateSuccessPopup}
						onGoToCopy={handleDuplicateSuccessGoToCopy}
					/>,
					document.body
				)}
			{showDeleteCheckplanPopup &&
				createPortal(
					<DeleteCheckplanConfirmPopup
						isClosing={deleteCheckplanClosing}
						onClose={closeDeleteCheckplanPopup}
						onConfirm={confirmDeleteCheckplan}
						loading={deleteCheckplanInProgress}
					/>,
					document.body
				)}
			{showLoginToLikePopup &&
				createPortal(
					<LoginToLikePopup
						isClosing={loginToLikeClosing}
						onClose={closeLoginToLikePopup}
						onLogin={loginFromLoginToLikePopup}
					/>,
					document.body
				)}
			{showReportSentPopup &&
				createPortal(
					<ReportSentPopup
						isClosing={reportSentClosing}
						onClose={closeReportSentPopup}
					/>,
					document.body
				)}
		</>
	);
});
