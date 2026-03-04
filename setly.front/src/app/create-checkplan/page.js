"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import styles from "./create-checkplan-phantom.module.css";

const STEPS = [1, 2, 3, 4];

/** Фантомная прогрузка: раскладка страницы создания чекплана со скелетонами (как на check-plans и account). */
function CreateCheckplanPhantom() {
	return (
		<div className={styles.wrapper} aria-busy="true" aria-label="Загрузка страницы создания чекплана">
			<div className={styles.backRow}>
				<div className={styles.backButton} aria-hidden />
				<div className={styles.backLabel} aria-hidden />
			</div>
			<div className={styles.titleBlock}>
				<div className={styles.titleLine} aria-hidden />
			</div>
			<div className={styles.mainBlock}>
				<div className={styles.stepsRowSlider}>
					<div className={styles.stepsRow}>
						{STEPS.map((step, index) => (
							<div key={step} className={styles.stepsRowInner}>
								<div className={styles.stepCell}>
									<div className={styles.stepCircle} aria-hidden />
									<div className={styles.stepLabel} aria-hidden />
								</div>
								{index < STEPS.length - 1 && (
									<div className={styles.connector} aria-hidden />
								)}
							</div>
						))}
					</div>
				</div>
				<div className={styles.stepContent}>
					<div className={styles.contentSkeleton}>
						<div className={styles.contentLine1} aria-hidden />
						<div className={styles.contentLine2} aria-hidden />
						<div className={styles.contentBlock} aria-hidden />
					</div>
				</div>
				<div className={styles.actionsRow}>
					<div className={styles.actionBtn} aria-hidden />
					<div className={styles.actionBtn} aria-hidden />
				</div>
			</div>
		</div>
	);
}

export default function CreateCheckplanPage() {
	const router = useRouter();
	useEffect(() => {
		router.replace("/creating");
	}, [router]);
	return (
		<div className="container createCheckplanPage">
			<Header />
			<CreateCheckplanPhantom />
			<div className="createCheckplanPageFooterWrap">
				<Footer />
			</div>
		</div>
	);
}
