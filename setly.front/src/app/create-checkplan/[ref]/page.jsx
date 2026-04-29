"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import { getApiUrl } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import {
	buildCheckplanPublicSegment,
	parseCheckplanUrlSegment,
} from "@/app/lib/slug";
import styles from "../create-checkplan-edit-phantom.module.css";
import ErrorStateSection from "@/app/components/globals/error-state/error-state-section";

/** Редактировать план может только автор (совпадение author_id и id в сессии). */
function isCheckplanOwner(plan, authUserId) {
	return (
		authUserId != null &&
		plan?.author_id != null &&
		String(plan.author_id) === String(authUserId)
	);
}

const CreateCheckplan = dynamic(
  () => import("@/app/create-checkplan/create-checkplan").then((m) => m.default),
  { ssr: false, loading: () => <EditCheckplanPhantom /> }
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
	const urlSegment = params?.ref ? decodeURIComponent(String(params.ref)) : null;
	const apiRef = urlSegment ? parseCheckplanUrlSegment(urlSegment) : "";
	const fromAccount = searchParams?.get("from") === "account";
	const showOnboardingInitially = searchParams?.get("onboarding") === "1";
	const [plan, setPlan] = useState(null);
	const [planData, setPlanData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!apiRef) {
			setLoading(false);
			setError("Не указан план");
			return;
		}
		setPlan(null);
		setPlanData(null);
		setError(null);
		setLoading(true);
		let cancelled = false;
		const base = getApiUrl();
		const apiBase = base || "";

		async function load() {
			let redirectedToPreview = false;
			try {
				const headers = {};
				try {
					const auth = getAuth();
					if (auth?.token && typeof auth.token === "string") {
						headers.Authorization = `Bearer ${auth.token.trim()}`;
					}
				} catch (_) {}
				const planRes = await fetch(
					`${apiBase}/api/check-plans/${encodeURIComponent(apiRef)}`,
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
				const authAfter = getAuth();
				const authUserId = authAfter?.user?.id;
				if (!isCheckplanOwner(planJson, authUserId)) {
					redirectedToPreview = true;
					const qs = searchParams?.toString?.() ?? "";
					const previewSeg = buildCheckplanPublicSegment(planJson);
					const previewPath = `/preview-checkplan/${encodeURIComponent(previewSeg)}${qs ? `?${qs}` : ""}`;
					router.replace(previewPath);
					return;
				}
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
				if (!cancelled && !redirectedToPreview) setLoading(false);
			}
		}
		load();
		return () => { cancelled = true; };
	}, [apiRef, router, searchParams]);

	useEffect(() => {
		if (!plan?.id_str || typeof window === "undefined") return;
		try {
			const seg = buildCheckplanPublicSegment(plan);
			const pathSeg = window.location.pathname.replace(/^\/+|\/+$/g, "").split("/").pop();
			const curSeg = pathSeg ? decodeURIComponent(pathSeg) : "";
			if (!seg || curSeg === seg) return;
			const qs = window.location.search || "";
			window.history.replaceState({}, "", `/create-checkplan/${encodeURIComponent(seg)}${qs}`);
		} catch (_) {}
	}, [plan]);

	if (loading) {
		return (
			<div className="container createCheckplanPage">
				<Header />
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
				<Header />
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
					<ErrorStateSection
						title={error || "План не найден"}
						buttonText="Вернуться к чек-планам"
						onButtonClick={() => router.push("/check-plans")}
						titleId="checkplan-not-found-title"
					/>
				</div>
				<div className="createCheckplanPageFooterWrap main-page-reveal__item" style={{ "--reveal-delay": "120ms" }}>
					<Footer />
				</div>
			</div>
		);
	}

	return (
		<div className="container createCheckplanPage">
			<Header />
			<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
				<CreateCheckplan
					planIdStr={plan.id_str}
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
