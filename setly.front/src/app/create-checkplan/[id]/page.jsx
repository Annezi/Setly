"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import { getApiUrl } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import styles from "../create-checkplan-edit-phantom.module.css";

const CreateCheckplan = dynamic(
  () => import("@/app/create-checkplan/create-checkplan").then((m) => m.default),
  { ssr: false, loading: () => null }
);

/** Фантомная прогрузка страницы редактирования чекплана — раскладка как у CreateCheckplan. */
function EditCheckplanPhantom() {
	return (
		<div className={styles.wrapper} aria-busy="true" aria-label="Загрузка чек-плана">
			<div className={styles.backRow}>
				<div className={styles.backButton} aria-hidden />
				<div className={styles.backLabel} aria-hidden />
			</div>
			<div className={styles.contentSection}>
				<div className={styles.topRow}>
					<div className={styles.card}>
						<div className={styles.cardTitle} aria-hidden />
						<div className={styles.cardDesc} aria-hidden />
						<div className={styles.cardDesc} aria-hidden />
						<div className={styles.cardDesc} aria-hidden />
						<div className={styles.dropdownRow}>
							<div className={styles.dropdownLabel} aria-hidden />
							<div className={styles.dropdownValue} aria-hidden />
						</div>
						<div className={styles.dropdownRow}>
							<div className={styles.dropdownLabel} aria-hidden />
							<div className={styles.dropdownValue} aria-hidden />
						</div>
					</div>
					<div className={styles.imageBlock} aria-hidden />
				</div>
				<div className={styles.secondRow}>
					<div className={styles.secondRowLeft} aria-hidden />
					<div className={styles.secondRowRight} aria-hidden />
				</div>
			</div>
			<div className={styles.creationDateLine} aria-hidden />
		</div>
	);
}

export default function EditCheckplanPage() {
	const params = useParams();
	const router = useRouter();
	const searchParams = useSearchParams();
	const idStr = params?.id ? decodeURIComponent(String(params.id)) : null;
	const fromAccount = searchParams?.get("from") === "account";
	const showOnboardingInitially = searchParams?.get("onboarding") === "1";
	const [plan, setPlan] = useState(null);
	const [planData, setPlanData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!idStr) {
			setLoading(false);
			setError("Не указан план");
			return;
		}
		let cancelled = false;
		const base = getApiUrl();
		const apiBase = base || "";

		async function load() {
			try {
				const headers = {};
				try {
					const auth = getAuth();
					if (auth?.token && typeof auth.token === "string") {
						headers.Authorization = `Bearer ${auth.token.trim()}`;
					}
				} catch (_) {}
				const planRes = await fetch(
					`${apiBase}/api/check-plans/${encodeURIComponent(idStr)}`,
					{ headers }
				);
				if (cancelled) return;
				if (!planRes.ok) {
					if (planRes.status === 404) {
						setError("Чек-план не найден");
					} else {
						setError("Не удалось загрузить план");
					}
					setLoading(false);
					return;
				}
				const planJson = await planRes.json();
				setPlan(planJson);

				const dataId = planJson?.check_plan_data_id;
				if (dataId && Number.isInteger(dataId) && dataId > 0) {
					const dataRes = await fetch(
						`${apiBase}/api/checkplan-data/${dataId}`,
						{ headers }
					);
					if (!cancelled && dataRes.ok) {
						const dataJson = await dataRes.json();
						setPlanData(dataJson?.data ?? null);
					}
				}
			} catch (e) {
				if (!cancelled) {
					setError("Ошибка загрузки");
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => { cancelled = true; };
	}, [idStr]);

	if (loading) {
		return (
			<div className="container createCheckplanPage">
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "0ms" }}>
					<Header />
				</div>
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
					<EditCheckplanPhantom />
				</div>
				<div className="createCheckplanPageFooterWrap main-page-reveal__item" style={{ "--reveal-delay": "120ms" }}>
					<Footer />
				</div>
			</div>
		);
	}

	if (error || !plan) {
		return (
			<div className="container createCheckplanPage">
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "0ms" }}>
					<Header />
				</div>
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms", padding: "2rem", textAlign: "center" }}>
					<p>{error || "План не найден"}</p>
					<button
						type="button"
						onClick={() => router.push(fromAccount ? "/account" : "/check-plans")}
						className="subinfo"
						style={{ marginTop: "1rem", textDecoration: "underline" }}
					>
						{fromAccount ? "В личный кабинет" : "Вернуться к чек-планам"}
					</button>
				</div>
				<div className="createCheckplanPageFooterWrap main-page-reveal__item" style={{ "--reveal-delay": "120ms" }}>
					<Footer />
				</div>
			</div>
		);
	}

	return (
		<div className="container createCheckplanPage">
			<div className="main-page-reveal__item" style={{ "--reveal-delay": "0ms" }}>
				<Header />
			</div>
			<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
				<CreateCheckplan
					planIdStr={idStr}
					initialPlan={plan}
					initialPlanData={planData}
					fromAccount={fromAccount}
					showOnboardingInitially={showOnboardingInitially}
				/>
			</div>
			<div className="createCheckplanPageFooterWrap main-page-reveal__item" style={{ "--reveal-delay": "120ms" }}>
				<Footer />
			</div>
		</div>
	);
}
