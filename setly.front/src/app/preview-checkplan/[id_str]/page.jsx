"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import { getApiUrl } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import { applyTypograf } from "@/app/lib/typograf";
import articleCtaStyles from "@/app/components/blocks/articles/article/article.module.css";
import styles from "../../create-checkplan/create-checkplan-edit-phantom.module.css";

const CreateCheckplan = dynamic(
  () => import("../../create-checkplan/create-checkplan").then((m) => m.default),
  { ssr: false, loading: () => <PreviewCheckplanPhantom /> }
);
const PopularCheckplansCarousel = dynamic(
  () => import("@/app/components/blocks/preview-checkplan/popular-checkplans-carousel").then((m) => m.default),
  { ssr: false, loading: () => <div style={{ minHeight: 240 }} aria-busy="true" aria-label="Загрузка рекомендаций" /> }
);

/** Фантомная прогрузка страницы просмотра чекплана. */
function PreviewCheckplanPhantom() {
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

export default function PreviewCheckplanPage() {
	const params = useParams();
	const router = useRouter();
	const searchParams = useSearchParams();
	const idStr = params?.id_str ? decodeURIComponent(String(params.id_str)) : null;
	const fromAccount = searchParams?.get("from") === "account";
	const [plan, setPlan] = useState(null);
	const [planData, setPlanData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	/** После загрузки API: один кадр только фантом без футера/блока «тест», чтобы не мигали ветки owner и не было пустоты до чанка. */
	const [shellReady, setShellReady] = useState(false);

	useEffect(() => {
		if (loading || error || !plan) {
			setShellReady(false);
			return;
		}
		const id = requestAnimationFrame(() => setShellReady(true));
		return () => cancelAnimationFrame(id);
	}, [loading, error, plan, idStr]);

	useEffect(() => {
		if (!idStr) {
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
				<Header />
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
					<PreviewCheckplanPhantom />
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

	if (!shellReady) {
		return (
			<div className="container createCheckplanPage">
				<Header />
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
					<PreviewCheckplanPhantom />
				</div>
			</div>
		);
	}

	const authUserId = getAuth()?.user?.id;
	const isOwner =
		authUserId != null &&
		plan?.author_id != null &&
		String(plan.author_id) === String(authUserId);
	const readOnly = true;

	return (
		<div className="container createCheckplanPage">
			<Header />
			<div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
				<CreateCheckplan
					planIdStr={idStr}
					initialPlan={plan}
					initialPlanData={planData}
					readOnly={readOnly}
					allowChecklistToggleInPreview={isOwner}
					fromAccount={fromAccount}
					isOwner={isOwner}
					isPreview
				/>
			</div>
			{isOwner ? (
				<section
					className={`${articleCtaStyles.templatesBlock} main-page-reveal__item`}
					style={{ "--reveal-delay": "100ms" }}
					aria-labelledby="preview-traveler-test-heading"
					id="preview-templates-boundary"
				>
					<div className={articleCtaStyles.templatesLeft}>
						<Image
							src="/img/main/travelertype.png"
							alt=""
							width={572}
							height={572}
							className={articleCtaStyles.templatesImage}
						/>
					</div>
					<div className={articleCtaStyles.templatesRight}>
						<h2
							id="preview-traveler-test-heading"
							className={`${articleCtaStyles.templatesTitle} title_1`}
						>
							{applyTypograf("Уже собрался? Пройди тест")}
						</h2>
						<div className={articleCtaStyles.templatesDescriptionWrap}>
							<p className={`${articleCtaStyles.templatesDescription} paragraph`}>
								{applyTypograf(
									"Узнай какой ты путешественник из нашего маленького теста"
								)}
							</p>
							<Button
								Text="Пройти тест"
								color="white"
								onClick={() => router.push("/tests")}
							/>
						</div>
					</div>
				</section>
			) : (
				<div className="main-page-reveal__item" style={{ "--reveal-delay": "100ms" }}>
					<PopularCheckplansCarousel excludeIdStr={idStr} />
				</div>
			)}
			<div className="createCheckplanPageFooterWrap main-page-reveal__item" style={{ "--reveal-delay": "140ms" }}>
				<Footer />
			</div>
		</div>
	);
}
