"use client";

import { memo } from "react";
import Image from "next/image";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import styles from "./create-checkplan.module.css";

/** Попап «Знакомство с сервисом»: шаги 1–4, по центру экрана с затенением */
export const OnboardingPopup = memo(function OnboardingPopup({ isClosing, step, onClose, onNextStep, onPrevStep }) {
	const isStep2 = step === 2;
	const isStep3 = step === 3;
	const isStep4 = step === 4;
	const popupStepClass =
		isStep2 ? styles.onboardingPopupStep2
		: isStep3 ? styles.onboardingPopupStep3
		: isStep4 ? styles.onboardingPopupStep4
		: "";
	return (
		<div
			className={`${styles.onboardingOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="onboarding-title"
		>
			<div
				className={`${styles.onboardingPopup} ${popupStepClass} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.onboardingHeader}>
					<h1 id="onboarding-title" className="title_1" style={{ color: "var(--grayscale-dark-gray)" }}>
						Знакомство с сервисом
					</h1>
					<RoundButton
						variant="white"
						icon={<Image src="/icons/system/Cross.svg" alt="" width={20} height={20} style={{ color: "var(--grayscale-gray)" }} />}
						aria-label="Закрыть"
						onClick={onClose}
					/>
				</div>
				<div className={styles.onboardingCenter} />
				<div className={styles.onboardingBottom}>
					<div key={step} className={styles.onboardingStepContent}>
						{isStep2 && (
							<>
								<h2 className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
									Редактируйте пункты
								</h2>
								<p className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>
									Удаляйте ненужное, добавляйте своё
								</p>
								<div className={styles.onboardingBottomButtons}>
									<Button Text="Назад" color="outline" type="button" onClick={onPrevStep} />
									<Button Text="Дальше" color="blue" type="button" onClick={onNextStep} />
								</div>
							</>
						)}
						{isStep3 && (
							<>
								<h2 className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
									Делитесь с другими
								</h2>
								<p className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>
									Поделитесь чек-планом публично или по ссылке
								</p>
								<div className={styles.onboardingBottomButtons}>
									<Button Text="Назад" color="outline" type="button" onClick={onPrevStep} />
									<Button Text="Дальше" color="blue" type="button" onClick={onNextStep} />
								</div>
							</>
						)}
						{isStep4 && (
							<>
								<h2 className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
									Когда все готово...
								</h2>
								<p className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>
									Останется только сохранить чек-план!
								</p>
								<Button Text="Я готов!" color="blue" type="button" onClick={onClose} />
							</>
						)}
						{step === 1 && (
							<>
								<h2 className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
									Кастомизируйте ваш опыт
								</h2>
								<p className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>
									Выберите нужный блок из предложенных вариантов
								</p>
								<Button Text="Дальше" color="blue" type="button" onClick={onNextStep} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
