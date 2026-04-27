"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import { getButtonLabel, CalendarContent, getDaysCountFromRange, getDaysLabelForApi } from "@/app/components/atomic/molecules/calendar/calendar";
import styles from "./create-checkplan.module.css";
import checkPlansStyles from "@/app/components/blocks/check-plans/plans/check-plans/check-plans.module.css";
import { getApiUrl, apiFetch } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import { useLikedChecklists } from "@/app/lib/liked-checklists-context";
import {
	USEFUL_CONTACTS_INITIAL_SECTIONS,
	USEFUL_CONTACTS_ADDABLE_SECTIONS,
} from "./useful-contacts-constants";
import { BUDGET_DEFAULT_ROWS, parseBudgetNumber } from "./budget-table-constants";
import { buildContentBlocksFromPlanData } from "./build-content-blocks-from-plan";
import {
	TYPE_OPTIONS,
	TRAVELER_OPTIONS,
	PLATFORM_ADVICE_BY_TYPE,
	DEFAULT_CHECKLIST_BY_TYPE,
} from "./create-checkplan-data";
import {
	DEFAULT_AVATAR,
	parseDateStr,
	formatDateToYYYYMMDD,
	formatLikesCompact,
	resolveAvatarSrc,
	emptyCount,
	canAddItem,
} from "./create-checkplan-utils";
import { buildCheckplanPublicSegment } from "@/app/lib/slug";
import { LocationDropdownContent } from "./location-dropdown-content";
import { ChecklistSection } from "./checkplan-checklist-section";
import { TripImageSection } from "./checkplan-trip-image-section";
import { RightColumnSection } from "./checkplan-right-column-section";
import { BottomBarSection } from "./checkplan-bottom-bar-section";
import {
	CopyLinkToast,
} from "./checkplan-dialog-popups";
import { ViewModeToolbar } from "./checkplan-view-mode-toolbar";
import { GuestViewToolbar } from "./checkplan-guest-view-toolbar";
import { CheckplanHeaderSection } from "./checkplan-header-section";
import { CheckplanOverlays } from "./checkplan-overlays";
import { useCheckplanPlanActions } from "./use-checkplan-plan-actions";
import { useCheckplanDeleteTargets } from "./use-checkplan-delete-targets";
import { useCheckplanOnboarding } from "./use-checkplan-onboarding";
import { useCheckplanGuestFeedbackPopups } from "./use-checkplan-guest-feedback-popups";
import { useCheckplanHasChanges } from "./use-checkplan-has-changes";
import { useCheckplanCoverUpload } from "./use-checkplan-cover-upload";

export default function CreateCheckplan({
	planIdStr = null,
	initialPlan = null,
	initialPlanData = null,
	readOnly = false,
	fromAccount = false,
	isOwner = true,
	isPreview = false,
	allowChecklistToggleInPreview = false,
	hideChecklistSection = false,
	showOnboardingInitially = false,
}) {
	const { isLiked, toggle, getLikeCount, setInitialLikeCounts } = useLikedChecklists();
	const authData = useMemo(() => {
		try {
			return getAuth();
		} catch (_) {
			return null;
		}
	}, []);
	const [planTitle, setPlanTitle] = useState(() => initialPlan?.title ?? "Китай 2026");
	const [description, setDescription] = useState(() => initialPlan?.description ?? "");
	const {
		coverImage,
		coverLoading,
		coverError,
		coverInputRef,
		handleCoverFileChange,
		handleCoverClick,
	} = useCheckplanCoverUpload(initialPlan);
	const [sortIndex, setSortIndex] = useState(0);
	const [datesRange, setDatesRange] = useState(() => {
		const startStr = initialPlanData?.date_start;
		const endStr = initialPlanData?.date_end;
		const parse = (s) => {
			if (!s || typeof s !== "string") return null;
			const trimmed = s.trim();
			if (!trimmed) return null;
			const d = new Date(trimmed.includes("T") ? trimmed : `${trimmed}T12:00:00`);
			return Number.isFinite(d.getTime()) ? d : null;
		};
		const start = parse(startStr);
		const end = parse(endStr);
		return [start ?? null, end ?? null];
	});
	const [typeIndex, setTypeIndex] = useState(() => {
		if (!initialPlan?.filter_tag) return -1;
		const i = TYPE_OPTIONS.indexOf(initialPlan.filter_tag);
		return i >= 0 ? i : -1;
	});
	const [peopleIndex, setPeopleIndex] = useState(() => {
		if (!initialPlan?.traveler_tags?.length) return -1;
		const tag = initialPlan.traveler_tags[0];
		const i = TRAVELER_OPTIONS.indexOf(tag);
		return i >= 0 ? i : -1;
	});
	const [locationLabel, setLocationLabel] = useState(() => initialPlan?.location ?? "");
	const [region, setRegion] = useState("");
	const [locationSearch, setLocationSearch] = useState("");
	const [handLuggageItems, setHandLuggageItems] = useState(() => {
		const block = initialPlanData?.luggage_hand_block;
		if (!Array.isArray(block) || block.length === 0) return [{ text: "", checked: false }];
		return block.map((item) => ({
			text: item?.title ?? item?.text ?? "",
			checked: Boolean(item?.is_checked ?? item?.checked),
		}));
	});
	const [luggageItems, setLuggageItems] = useState(() => {
		const block = initialPlanData?.luggage_block;
		if (!Array.isArray(block) || block.length === 0) return [{ text: "", checked: false }];
		return block.map((item) => ({
			text: item?.title ?? item?.text ?? "",
			checked: Boolean(item?.is_checked ?? item?.checked),
		}));
	});
	const [personalNotesItems, setPersonalNotesItems] = useState(() => {
		const block = initialPlanData?.personal_notes_block;
		if (!Array.isArray(block) || block.length === 0) return [{ text: "" }];
		return block.map((item) => ({ text: item?.title ?? item?.text ?? "" }));
	});
	const platformNoteText = useMemo(() => {
		if (typeIndex < 0 || typeIndex >= TYPE_OPTIONS.length) return "";
		const typeLabel = TYPE_OPTIONS[typeIndex];
		return PLATFORM_ADVICE_BY_TYPE[typeLabel] ?? "";
	}, [typeIndex]);
	const [showPlatformNote, setShowPlatformNote] = useState(true);
	const [visibilityOverride, setVisibilityOverride] = useState(null); // after PATCH in view mode
	const [showCopyLinkToast, setShowCopyLinkToast] = useState(false);
	const [suggestionLinksExiting, setSuggestionLinksExiting] = useState(() => new Set()); // 'whereToGo' | 'usefulContacts' | 'budgetTable'
	const [saveLoading, setSaveLoading] = useState(false);
	const [saveError, setSaveError] = useState(null);
	const userChangedTypeRef = useRef(false);
	const descriptionRef = useRef(null);
	const titleRef = useRef(null);
	const contentBlockIdRef = useRef(0);
	const hasHydratedFromPlanDataRef = useRef(false);
	const [hydrationDone, setHydrationDone] = useState(false);
	/** Чистый чек-план: с бэка пришёл luggage_hand_block не массив (null). Шаблонный: массив (в т.ч. []). Автозаполнение «что взять» только для шаблонного. */
	const wasCreatedWithTemplateRef = useRef(Array.isArray(initialPlanData?.luggage_hand_block));

	const adjustDescriptionHeight = useCallback(() => {
		const ta = descriptionRef.current;
		if (!ta) return;
		ta.style.height = "auto";
		ta.style.height = `${Math.max(44, ta.scrollHeight)}px`;
	}, []);
	const adjustTitleHeight = useCallback(() => {
		const ta = titleRef.current;
		if (!ta) return;
		ta.style.height = "auto";
		ta.style.height = `${Math.max(44, ta.scrollHeight)}px`;
	}, []);
	useEffect(() => {
		adjustDescriptionHeight();
	}, [description, adjustDescriptionHeight]);
	useEffect(() => {
		adjustTitleHeight();
	}, [planTitle, adjustTitleHeight]);

	/** Подтянуть даты с бэка, когда initialPlanData приходит асинхронно (страница редактирования) */
	useEffect(() => {
		const start = parseDateStr(initialPlanData?.date_start);
		const end = parseDateStr(initialPlanData?.date_end);
		if (start || end) {
			setDatesRange([start ?? null, end ?? null]);
		}
	}, [initialPlanData?.date_start, initialPlanData?.date_end]);

	const [contentBlocks, setContentBlocks] = useState(() => {
		const { blocks, nextId } = buildContentBlocksFromPlanData(initialPlanData);
		contentBlockIdRef.current = nextId;
		return blocks;
	});

	/** Подтянуть блоки контента, чеклист, заметки и sortIndex при первой загрузке initialPlanData (редактирование) */
	useEffect(() => {
		if (!initialPlanData || hasHydratedFromPlanDataRef.current) return;
		hasHydratedFromPlanDataRef.current = true;
		wasCreatedWithTemplateRef.current = Array.isArray(initialPlanData.luggage_hand_block);
		setContentBlocks((prev) => {
			if (prev.length > 0) return prev;
			const { blocks, nextId } = buildContentBlocksFromPlanData(initialPlanData);
			contentBlockIdRef.current = nextId;
			return blocks;
		});
		if (initialPlanData.luggage_type === true) {
			setSortIndex(1);
		}
		const handBlock = initialPlanData.luggage_hand_block;
		if (Array.isArray(handBlock) && handBlock.length > 0) {
			setHandLuggageItems(handBlock.map((item) => ({
				text: item?.title ?? item?.text ?? "",
				checked: Boolean(item?.is_checked ?? item?.checked),
			})));
		}
		const lugBlock = initialPlanData.luggage_block;
		if (Array.isArray(lugBlock) && lugBlock.length > 0) {
			setLuggageItems(lugBlock.map((item) => ({
				text: item?.title ?? item?.text ?? "",
				checked: Boolean(item?.is_checked ?? item?.checked),
			})));
		}
		const notesBlock = initialPlanData.personal_notes_block;
		if (Array.isArray(notesBlock) && notesBlock.length > 0) {
			setPersonalNotesItems(notesBlock.map((item) => ({ text: item?.title ?? item?.text ?? "" })));
		}
		setHydrationDone(true);
	}, [initialPlanData]);

	const router = useRouter();
	const {
		showDuplicateSuccessPopup,
		duplicateSuccessClosing,
		duplicateInProgress,
		showDeleteCheckplanPopup,
		deleteCheckplanClosing,
		deleteCheckplanInProgress,
		handleDuplicatePlan,
		handleDuplicateSuccessGoToCopy,
		openDeleteCheckplanPopup,
		closeDuplicateSuccessPopup,
		closeDeleteCheckplanPopup,
		confirmDeleteCheckplan,
	} = useCheckplanPlanActions({ planIdStr, fromAccount, router });
	const {
		showOnboardingPopup,
		onboardingPopupClosing,
		onboardingStep,
		openOnboardingPopup,
		closeOnboardingPopup,
		goOnboardingNextStep,
		goOnboardingPrevStep,
	} = useCheckplanOnboarding(showOnboardingInitially);
	const {
		showLoginToLikePopup,
		loginToLikeClosing,
		showReportSentPopup,
		reportSentClosing,
		openLoginToLikePopup,
		openReportSentPopup,
		closeLoginToLikePopup,
		closeReportSentPopup,
	} = useCheckplanGuestFeedbackPopups();

	const SUGGESTION_EXIT_MS = 280;

	/** Если чеклист пустой и выбран тип — переключаем на «Ручная кладь и Багаж» и подставляем дефолтные пункты по типу. Только для шаблонного плана; для чистого блок «что взять» остаётся пустым с вариантом «Ручная кладь». */
	useEffect(() => {
		if (!wasCreatedWithTemplateRef.current) return;
		if (!userChangedTypeRef.current) return;
		if (typeIndex < 0 || typeIndex >= TYPE_OPTIONS.length) return;
		const typeLabel = TYPE_OPTIONS[typeIndex];
		const defaults = DEFAULT_CHECKLIST_BY_TYPE[typeLabel];
		if (!defaults) return;
		const handEmpty = handLuggageItems.every((i) => !(i.text || "").trim());
		const luggageEmpty = luggageItems.every((i) => !(i.text || "").trim());
		if (!handEmpty || !luggageEmpty) return;
		setSortIndex(1);
		setHandLuggageItems(defaults.handLuggage.map((text) => ({ text, checked: false })));
		setLuggageItems(defaults.luggage.map((text) => ({ text, checked: false })));
	}, [typeIndex]); // eslint-disable-line react-hooks/exhaustive-deps -- заполняем только при смене типа; текущие hand/luggage читаем на момент смены

	/** Собирает полную структуру CheckPlanDataStaff из текущего состояния формы для PATCH checkplan-data */
	const buildCheckPlanDataPayload = useCallback(() => {
		const toCheckFieldList = (items) =>
			(items || [])
				.filter((i) => ((i?.text || "").trim().length > 0) || Boolean(i?.checked))
				.map((i) => ({ is_checked: Boolean(i?.checked), title: (i?.text || "").trim() }));
		const notesNorm = (personalNotesItems || [])
			.map((i) => (i?.text || "").trim())
			.filter((t) => t.length > 0)
			.map((t) => ({ title: t }));

		const whatToSee = [];
		const whatToEat = [];
		const whatToBuy = [];
		(contentBlocks || [])
			.filter((b) => b.type === "whereToGo" && b.sections)
			.forEach((block) => {
				const removedSec = new Set(block.removedWhereToGoSectionKeys ?? []);
				if (!removedSec.has("look")) {
					(block.sections.look || []).forEach((r) => {
						if ((r.text || "").trim() || (r.link || "").trim())
							whatToSee.push({ title: (r.text || "").trim(), link: (r.link || "").trim() || null });
					});
				}
				if (!removedSec.has("eat")) {
					(block.sections.eat || []).forEach((r) => {
						if ((r.text || "").trim() || (r.link || "").trim())
							whatToEat.push({ title: (r.text || "").trim(), link: (r.link || "").trim() || null });
					});
				}
				if (!removedSec.has("buy")) {
					(block.sections.buy || []).forEach((r) => {
						if ((r.text || "").trim() || (r.link || "").trim())
							whatToBuy.push({ title: (r.text || "").trim(), link: (r.link || "").trim() || null });
					});
				}
			});

		const usefulContactsBlocksList = [];
		const sectionKeyToTitle = {};
		[...USEFUL_CONTACTS_INITIAL_SECTIONS, ...USEFUL_CONTACTS_ADDABLE_SECTIONS].forEach((s) => {
			sectionKeyToTitle[s.key] = s.title;
		});
		(contentBlocks || [])
			.filter((b) => b.type === "usefulContacts" && b.sections)
			.forEach((block) => {
				const addedOrder = block.addedSectionOrder || [];
				const removedInitial = block.removedInitialSectionKeys || [];
				const initialKeys = USEFUL_CONTACTS_INITIAL_SECTIONS.map((s) => s.key).filter((k) => !removedInitial.includes(k));
				const allKeys = [...initialKeys, ...addedOrder];
				allKeys.forEach((key) => {
					const title = sectionKeyToTitle[key] || key;
					const rows = block.sections[key] || [];
					const contacts = rows
						.map((r) => ({
							title: (r.text || "").trim(),
							data: (r.text || "").trim(),
							link: (r.link || "").trim() || null,
						}))
						.filter((c) => c.title || c.link);
					if (contacts.length === 0) return;
					usefulContactsBlocksList.push({ contacts_type: title, contacts });
				});
			});

		const budgetBlocks = (contentBlocks || []).filter((b) => b.type === "budgetTable" && b.rows);
		let budgetTitle = "";
		const budgetTable = [];
		if (budgetBlocks.length > 0) {
			const first = budgetBlocks[0];
			budgetTitle = (first.title || "").trim() || "Бюджет";
			(first.rows || []).forEach((row) => {
				budgetTable.push({
					title: (row.category ?? "").trim(),
					plan: Math.round(parseBudgetNumber(row.planned)),
					spent: Math.round(parseBudgetNumber(row.spent)),
				});
			});
		}
		for (let i = 1; i < budgetBlocks.length; i++) {
			(budgetBlocks[i].rows || []).forEach((row) => {
				budgetTable.push({
					title: (row.category ?? "").trim(),
					plan: Math.round(parseBudgetNumber(row.planned)),
					spent: Math.round(parseBudgetNumber(row.spent)),
				});
			});
		}

		const textBlocks = (contentBlocks || []).map((b) => {
			if (b.type === "text") {
				return {
					type: "text",
					title: (b.title || "").trim(),
					description: (b.description || "").trim(),
				};
			}
			if (b.type === "whereToGo") {
				return {
					type: "whereToGo",
					title: "",
					description: "",
				};
			}
			if (b.type === "usefulContacts") {
				return {
					type: "usefulContacts",
					title: "",
					description: "",
				};
			}
			if (b.type === "budgetTable") {
				return {
					type: "budgetTable",
					title: "",
					description: "",
				};
			}
			// На всякий случай — неизвестный тип как текстовый блок
			return {
				type: "text",
				title: (b.title || "").trim(),
				description: (b.description || "").trim(),
			};
		});

		const formatDateToApi = (d) => {
			if (!d || !(d instanceof Date) || !Number.isFinite(d.getTime())) return "";
			const y = d.getFullYear();
			const m = String(d.getMonth() + 1).padStart(2, "0");
			const day = String(d.getDate()).padStart(2, "0");
			return `${y}-${m}-${day}`;
		};
		const dateStart =
			datesRange?.[0] != null ? formatDateToApi(datesRange[0]) : (initialPlanData?.date_start ?? "");
		const dateEnd =
			datesRange?.[1] != null ? formatDateToApi(datesRange[1]) : (initialPlanData?.date_end ?? "");

		return {
			title: planTitle.trim() || "",
			description: description.trim() || "",
			access_type: initialPlanData?.access_type ?? "private",
			bg_url: initialPlanData?.bg_url ?? coverImage ?? "",
			date_start: dateStart,
			date_end: dateEnd,
			place: locationLabel.trim() || "",
			travel_type: typeIndex >= 0 ? TYPE_OPTIONS[typeIndex] : "",
			group_size: peopleIndex >= 0 ? TRAVELER_OPTIONS[peopleIndex] : "",
			luggage_type: sortIndex === 1,
			luggage_hand_block: toCheckFieldList(handLuggageItems),
			luggage_block: toCheckFieldList(luggageItems),
			personal_notes_block: notesNorm,
			what_to_go_block: {
				what_to_see: whatToSee,
				what_to_eat: whatToEat,
				what_to_buy: whatToBuy,
			},
			useful_contacts_block: { blocks: usefulContactsBlocksList },
			budget_block: { title: budgetTitle, table: budgetTable },
			blocks: textBlocks,
		};
	}, [
		planTitle,
		description,
		coverImage,
		locationLabel,
		typeIndex,
		peopleIndex,
		sortIndex,
		handLuggageItems,
		luggageItems,
		personalNotesItems,
		contentBlocks,
		initialPlanData,
		datesRange,
	]);

	const savePlan = useCallback(async () => {
		if (!planIdStr || saveLoading) return;
		setSaveError(null);
		setSaveLoading(true);
		try {
			const base = getApiUrl();
			const url = `${base || ""}/api/check-plans/${encodeURIComponent(planIdStr)}`;
			const headers = { "Content-Type": "application/json" };
			try {
				const auth = getAuth();
				if (auth?.token && typeof auth.token === "string") {
					headers.Authorization = `Bearer ${auth.token.trim()}`;
				}
			} catch (_) {}
			const body = {
				title: planTitle.trim() || "",
				description: description.trim() || "",
				image_src: coverImage || "",
				image_alt: coverImage || "",
				location: locationLabel.trim() || "",
				filter_tag: typeIndex >= 0 ? TYPE_OPTIONS[typeIndex] : null,
				traveler_tags: peopleIndex >= 0 ? [TRAVELER_OPTIONS[peopleIndex]] : [],
			};
			const daysNum = getDaysCountFromRange(datesRange);
			if (daysNum > 0) {
				body.days = getDaysLabelForApi(daysNum);
				body.days_num = daysNum;
			}
			const res = await fetch(url, { method: "PATCH", headers, body: JSON.stringify(body) });
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				const msg = data?.detail || data?.message || "Не удалось сохранить";
				throw new Error(Array.isArray(msg) ? msg[0]?.msg : msg);
			}
			// Всегда патчим данные чек-плана (CheckPlanDataStaff) через API check_plan_data.py
			const dataId = data?.check_plan_data_id ?? initialPlan?.check_plan_data_id;
			const dataIdNum = dataId != null && Number.isInteger(dataId) ? dataId : 0;
			const dataPayload = buildCheckPlanDataPayload();
			const dataUrl = `${base || ""}/api/checkplan-data/${dataIdNum}?check_plan_id_str=${encodeURIComponent(planIdStr)}`;
			const dataRes = await fetch(dataUrl, {
				method: "PATCH",
				headers,
				body: JSON.stringify({ data: dataPayload }),
			});
			const dataResJson = await dataRes.json().catch(() => ({}));
			if (!dataRes.ok) {
				const msg = dataResJson?.detail || dataResJson?.message || "Не удалось сохранить данные чек-плана";
				throw new Error(Array.isArray(msg) ? msg[0]?.msg : msg);
			}
			const pub = buildCheckplanPublicSegment({
				id_str: planIdStr,
				title: planTitle,
				id: typeof data?.id === "number" ? data.id : initialPlan?.id,
			});
			router.push(`/preview-checkplan/${encodeURIComponent(pub)}${fromAccount ? "?from=account" : ""}`);
		} catch (err) {
			setSaveError(err.message || "Ошибка сохранения");
		} finally {
			setSaveLoading(false);
		}
	}, [planIdStr, saveLoading, planTitle, description, coverImage, locationLabel, typeIndex, peopleIndex, router, initialPlan, buildCheckPlanDataPayload, datesRange, fromAccount]);

	const previewChecklistSaveInFlightRef = useRef(false);
	const previewChecklistSavedSnapshotRef = useRef("");
	const previewChecklistTimerRef = useRef(null);

	const savePreviewChecklistProgress = useCallback(async () => {
		if (!planIdStr || previewChecklistSaveInFlightRef.current) return;
		previewChecklistSaveInFlightRef.current = true;
		try {
			const base = getApiUrl();
			const dataId = initialPlan?.check_plan_data_id;
			const dataIdNum = Number.isInteger(dataId) ? dataId : 0;
			const headers = { "Content-Type": "application/json" };
			try {
				const auth = getAuth();
				if (auth?.token && typeof auth.token === "string") {
					headers.Authorization = `Bearer ${auth.token.trim()}`;
				}
			} catch (_) {}
			const dataPayload = buildCheckPlanDataPayload();
			const dataUrl = `${base || ""}/api/checkplan-data/${dataIdNum}?check_plan_id_str=${encodeURIComponent(planIdStr)}`;
			await fetch(dataUrl, {
				method: "PATCH",
				headers,
				body: JSON.stringify({ data: dataPayload }),
			});
		} catch (_) {
			// Фоновое сохранение в предпросмотре: не показываем ошибку пользователю
		} finally {
			previewChecklistSaveInFlightRef.current = false;
		}
	}, [planIdStr, initialPlan?.check_plan_data_id, buildCheckPlanDataPayload]);

	useEffect(() => {
		if (!(readOnly && isPreview && allowChecklistToggleInPreview)) return;
		const normalizePreviewItems = (items) =>
			(items || [])
				.map((i) => ({ text: (i?.text || "").trim(), checked: Boolean(i?.checked) }))
				.filter((i) => i.text.length > 0 || i.checked);
		const nextSnapshot = JSON.stringify({
			hand: normalizePreviewItems(handLuggageItems),
			luggage: normalizePreviewItems(luggageItems),
		});
		if (!previewChecklistSavedSnapshotRef.current) {
			previewChecklistSavedSnapshotRef.current = nextSnapshot;
			return;
		}
		if (nextSnapshot === previewChecklistSavedSnapshotRef.current) return;
		if (previewChecklistTimerRef.current) clearTimeout(previewChecklistTimerRef.current);
		previewChecklistTimerRef.current = setTimeout(async () => {
			await savePreviewChecklistProgress();
			previewChecklistSavedSnapshotRef.current = nextSnapshot;
		}, 350);
		return () => {
			if (previewChecklistTimerRef.current) clearTimeout(previewChecklistTimerRef.current);
		};
	}, [
		readOnly,
		isPreview,
		allowChecklistToggleInPreview,
		handLuggageItems,
		luggageItems,
		savePreviewChecklistProgress,
	]);


	const addTextBlock = useCallback(() => {
		let newId;
		setContentBlocks((prev) => {
			newId = contentBlockIdRef.current++;
			return [...prev, { type: "text", id: newId, title: "", description: "" }];
		});
	}, []);
	const addWhereToGoBlockRaw = useCallback(() => {
		let newId;
		setContentBlocks((prev) => {
			newId = contentBlockIdRef.current++;
			return [
				...prev,
				{
					type: "whereToGo",
					id: newId,
					sections: {
						look: [{ text: "", link: "" }],
						eat: [{ text: "", link: "" }],
						buy: [{ text: "", link: "" }],
					},
					removedWhereToGoSectionKeys: [],
				},
			];
		});
	}, []);
	const addUsefulContactsBlockRaw = useCallback(() => {
		let newId;
		setContentBlocks((prev) => {
			newId = contentBlockIdRef.current++;
			return [
				...prev,
				{
					type: "usefulContacts",
					id: newId,
					sections: {
						accommodation: [{ text: "", link: "" }],
						embassy: [{ text: "", link: "" }],
						guide: [{ text: "", link: "" }],
					},
					addedSectionOrder: [],
					removedInitialSectionKeys: [],
				},
			];
		});
	}, []);
	const addBudgetTableBlockRaw = useCallback(() => {
		let newId;
		setContentBlocks((prev) => {
			newId = contentBlockIdRef.current++;
			return [
				...prev,
				{
					type: "budgetTable",
					id: newId,
					rows: BUDGET_DEFAULT_ROWS.map((r) => ({ ...r })),
				},
			];
		});
	}, []);

	const prevBlocksLengthRef = useRef(contentBlocks.length);
	const autoScrollInitializedRef = useRef(false);

	useEffect(() => {
		if (typeof window === "undefined" || typeof document === "undefined") {
			return;
		}

		// На первом рендере и в режиме просмотра не автоскроллим контент,
		// чтобы страница всегда открывалась с начала без "прыжка" вниз.
		if (!autoScrollInitializedRef.current || readOnly || isPreview) {
			autoScrollInitializedRef.current = true;
			prevBlocksLengthRef.current = contentBlocks.length;
			return;
		}

		// При первичной гидратации данных редактируемого чек-плана
		// пропускаем автоскролл, чтобы не перескакивать вниз после загрузки.
		if (initialPlanData && !hydrationDone) {
			prevBlocksLengthRef.current = contentBlocks.length;
			return;
		}

		const prevLength = prevBlocksLengthRef.current;
		const currentLength = contentBlocks.length;

		if (currentLength <= prevLength) {
			prevBlocksLengthRef.current = currentLength;
			return;
		}

		prevBlocksLengthRef.current = currentLength;

		const lastBlock = contentBlocks[currentLength - 1];
		if (!lastBlock) return;

		let attempts = 0;
		const maxAttempts = 6;

		const tryScroll = () => {
			const blockEl = document.querySelector(`[data-block-id="${lastBlock.id}"]`);
			if (!blockEl) {
				if (attempts < maxAttempts) {
					attempts += 1;
					window.setTimeout(tryScroll, 50);
				}
				return;
			}

			const rect = blockEl.getBoundingClientRect();
			const viewportHeight = window.innerHeight || 0;
			const top = rect.top + window.scrollY - (viewportHeight / 2 - rect.height / 2);

			window.scrollTo({
				top: Math.max(top, 0),
				behavior: "smooth",
			});
		};

		tryScroll();
	}, [contentBlocks, readOnly, isPreview, initialPlanData, hydrationDone]);

	const addWhereToGoBlock = useCallback(() => {
		setSuggestionLinksExiting((prev) => new Set(prev).add("whereToGo"));
		setTimeout(() => setSuggestionLinksExiting((prev) => { const n = new Set(prev); n.delete("whereToGo"); return n; }), SUGGESTION_EXIT_MS);
		addWhereToGoBlockRaw();
	}, [addWhereToGoBlockRaw]);
	const addUsefulContactsBlock = useCallback(() => {
		setSuggestionLinksExiting((prev) => new Set(prev).add("usefulContacts"));
		setTimeout(() => setSuggestionLinksExiting((prev) => { const n = new Set(prev); n.delete("usefulContacts"); return n; }), SUGGESTION_EXIT_MS);
		addUsefulContactsBlockRaw();
	}, [addUsefulContactsBlockRaw]);
	const addBudgetTableBlock = useCallback(() => {
		setSuggestionLinksExiting((prev) => new Set(prev).add("budgetTable"));
		setTimeout(() => setSuggestionLinksExiting((prev) => { const n = new Set(prev); n.delete("budgetTable"); return n; }), SUGGESTION_EXIT_MS);
		addBudgetTableBlockRaw();
	}, [addBudgetTableBlockRaw]);
	const updateContentBlock = useCallback((index, updates) => {
		setContentBlocks((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], ...updates };
			return next;
		});
	}, []);
	const moveContentBlockUp = useCallback((index) => {
		if (index <= 0) return;
		setContentBlocks((prev) => {
			const next = [...prev];
			[next[index - 1], next[index]] = [next[index], next[index - 1]];
			return next;
		});
	}, []);
	const moveContentBlockDown = useCallback((index) => {
		setContentBlocks((prev) => {
			if (index >= prev.length - 1) return prev;
			const next = [...prev];
			[next[index], next[index + 1]] = [next[index + 1], next[index]];
			return next;
		});
	}, []);
	const removeContentBlock = useCallback((index) => {
		setContentBlocks((prev) => prev.filter((_, i) => i !== index));
	}, []);
	const {
		deleteBlockTarget,
		deleteConfirmClosing,
		deleteRowTarget,
		deleteRowConfirmClosing,
		openDeleteBlockConfirm,
		closeDeleteConfirm,
		confirmDeleteBlock,
		openDeleteRowConfirm,
		closeDeleteRowConfirm,
		confirmDeleteRow,
	} = useCheckplanDeleteTargets({ setContentBlocks, removeContentBlock });

	const updateHandLuggageItem = useCallback((index, updates) => {
		setHandLuggageItems((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], ...updates };
			return next;
		});
	}, []);
	const updateLuggageItem = useCallback((index, updates) => {
		setLuggageItems((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], ...updates };
			return next;
		});
	}, []);
	const addHandLuggageItem = useCallback(() => {
		if (!canAddItem(handLuggageItems)) return;
		setHandLuggageItems((prev) => [...prev, { text: "", checked: false }]);
	}, [handLuggageItems]);
	const addLuggageItem = useCallback(() => {
		if (!canAddItem(luggageItems)) return;
		setLuggageItems((prev) => [...prev, { text: "", checked: false }]);
	}, [luggageItems]);
	const removeHandLuggageItem = useCallback((index) => {
		setHandLuggageItems((prev) => prev.filter((_, j) => j !== index));
	}, []);
	const removeLuggageItem = useCallback((index) => {
		setLuggageItems((prev) => prev.filter((_, j) => j !== index));
	}, []);

	const updatePersonalNoteItem = useCallback((index, updates) => {
		setPersonalNotesItems((prev) => {
			const next = [...prev];
			next[index] = { ...next[index], ...updates };
			return next;
		});
	}, []);
	const addPersonalNoteItem = useCallback(() => {
		if (!canAddItem(personalNotesItems)) return;
		setPersonalNotesItems((prev) => [...prev, { text: "" }]);
	}, [personalNotesItems]);

	const removePersonalNoteItem = useCallback((index) => {
		setPersonalNotesItems((prev) => {
			const next = prev.filter((_, j) => j !== index);
			return next.length > 0 ? next : [{ text: "" }];
		});
	}, []);

	const datesPlaceholder = "— — — —";
	const datesLabel = useMemo(() => getButtonLabel(datesRange, datesPlaceholder), [datesRange]);

	const canAddTextBlock = useMemo(
		() => !contentBlocks.some((b) => b.type === "text" && !(b.title || "").trim() && !(b.description || "").trim()),
		[contentBlocks]
	);
	const canAddWhereToGoBlock = useMemo(
		() => !contentBlocks.some((b) => b.type === "whereToGo"),
		[contentBlocks]
	);
	const canAddUsefulContactsBlock = useMemo(
		() => !contentBlocks.some((b) => b.type === "usefulContacts"),
		[contentBlocks]
	);
	const canAddBudgetTableBlock = useMemo(
		() => !contentBlocks.some((b) => b.type === "budgetTable"),
		[contentBlocks]
	);

	useEffect(() => {
		if (!readOnly || isOwner) return;
		const onLoginToLike = () => openLoginToLikePopup();
		const onReportSent = () => openReportSentPopup();
		window.addEventListener("setly:guest-show-login-to-like", onLoginToLike);
		window.addEventListener("setly:guest-show-report-sent", onReportSent);
		return () => {
			window.removeEventListener("setly:guest-show-login-to-like", onLoginToLike);
			window.removeEventListener("setly:guest-show-report-sent", onReportSent);
		};
	}, [readOnly, isOwner, openLoginToLikePopup, openReportSentPopup]);

	// Передать количество лайков чекплана в контекст для тулбара и блока в карточке
	useEffect(() => {
		if (planIdStr && initialPlan != null) {
			const count = Number(initialPlan.initial_likes);
			if (!Number.isNaN(count)) {
				setInitialLikeCounts({ [planIdStr]: count });
			}
		}
	}, [planIdStr, initialPlan, setInitialLikeCounts]);

	const hasChanges = useCheckplanHasChanges({
		initialPlanData,
		hydrationDone,
		planTitle,
		description,
		coverImage,
		datesRange,
		typeIndex,
		peopleIndex,
		locationLabel,
		region,
		handLuggageItems,
		luggageItems,
		personalNotesItems,
		contentBlocks,
	});

	const datesDropdownContent = useMemo(() => {
		function DatesDropdownPanel({ close }) {
			return (
				<CalendarContent
					value={datesRange}
					onChange={setDatesRange}
					onClose={close}
				/>
			);
		}
		function renderDatesDropdownContent(close) {
			return <DatesDropdownPanel close={close} />;
		}
		return renderDatesDropdownContent;
	}, [datesRange]);

	const handleLocationSelect = useCallback((label, selectedRegion) => {
		setLocationLabel(label);
		setRegion(selectedRegion);
		setLocationSearch("");
	}, []);
	const handleTypeIndexChange = useCallback((nextTypeIndex) => {
		userChangedTypeRef.current = true;
		setTypeIndex(nextTypeIndex);
	}, []);

	const locationDropdownContent = useMemo(() => {
		function LocationDropdownPanel({ close }) {
			return (
				<LocationDropdownContent
					close={close}
					searchQuery={locationSearch}
					setSearchQuery={setLocationSearch}
					onSelect={handleLocationSelect}
				/>
			);
		}
		function renderLocationDropdownContent(close) {
			return <LocationDropdownPanel close={close} />;
		}
		return renderLocationDropdownContent;
	}, [locationSearch, handleLocationSelect]);

	const currentVisibility = visibilityOverride ?? initialPlan?.visibility ?? "private";
	const isAuthenticated = !!authData?.user?.id;
	const creatorNameRaw =
		initialPlan?.author?.name ??
		initialPlan?.author?.username ??
		initialPlan?.author_username ??
		initialPlan?.author_name ??
		initialPlan?.user_name ??
		initialPlan?.username ??
		((!initialPlan || initialPlan?.author_id === authData?.user?.id)
			? (authData?.user?.name ?? authData?.user?.username)
			: null) ??
		"User";
	const creatorName =
		typeof creatorNameRaw === "string" && creatorNameRaw.trim()
			? creatorNameRaw.trim()
			: "User";
	const creatorAvatar = resolveAvatarSrc(
		initialPlan?.author?.avatar_src ??
			initialPlan?.author?.avatar ??
			initialPlan?.author_avatar_src ??
			initialPlan?.author_avatar ??
			initialPlan?.avatar_src ??
			initialPlan?.avatar ??
			authData?.user?.avatar_src ??
			authData?.user?.avatar
	);
	const canLikeFromHeader = !!planIdStr;
	const headerLiked = canLikeFromHeader ? isLiked(planIdStr) : false;
	const headerLikesCount = canLikeFromHeader
		? getLikeCount(planIdStr)
		: (Number.isFinite(Number(initialPlan?.initial_likes)) ? Number(initialPlan?.initial_likes) : 0);
	const likesLabel = formatLikesCompact(headerLikesCount);
	const handleHeaderLikeClick = useCallback(() => {
		if (!canLikeFromHeader || !planIdStr) return;
		if (isAuthenticated) {
			toggle(planIdStr);
			return;
		}
		if (typeof window !== "undefined" && window.dispatchEvent) {
			window.dispatchEvent(new CustomEvent("setly:guest-show-login-to-like"));
		}
	}, [canLikeFromHeader, isAuthenticated, planIdStr, toggle]);
	return (
		<div className={`${styles.wrapper} ${isPreview ? styles.wrapperPreview : ""}`}>
			<div className={styles.contentSection}>
				<CheckplanHeaderSection
					isPreview={isPreview}
					fromAccount={fromAccount}
					readOnly={readOnly}
					planTitle={planTitle}
					description={description}
					titleRef={titleRef}
					descriptionRef={descriptionRef}
					setPlanTitle={setPlanTitle}
					setDescription={setDescription}
					adjustTitleHeight={adjustTitleHeight}
					adjustDescriptionHeight={adjustDescriptionHeight}
					currentVisibility={currentVisibility}
					creatorAvatar={creatorAvatar}
					creatorName={creatorName}
					handleHeaderLikeClick={handleHeaderLikeClick}
					canLikeFromHeader={canLikeFromHeader}
					headerLiked={headerLiked}
					likesLabel={likesLabel}
					datesLabel={datesLabel}
					datesDropdownContent={datesDropdownContent}
					datesRange={datesRange}
					locationLabel={locationLabel}
					locationDropdownContent={locationDropdownContent}
					typeIndex={typeIndex}
					setTypeIndex={handleTypeIndexChange}
					peopleIndex={peopleIndex}
					setPeopleIndex={setPeopleIndex}
					coverImage={coverImage}
					coverLoading={coverLoading}
					coverError={coverError}
					coverInputRef={coverInputRef}
					handleCoverFileChange={handleCoverFileChange}
					handleCoverClick={handleCoverClick}
				/>

				<div className={styles.secondRow}>
					{!hideChecklistSection && (
						<ChecklistSection
							handLuggageItems={handLuggageItems}
							updateHandLuggageItem={updateHandLuggageItem}
							addHandLuggageItem={addHandLuggageItem}
							removeHandLuggageItem={removeHandLuggageItem}
							luggageItems={luggageItems}
							updateLuggageItem={updateLuggageItem}
							addLuggageItem={addLuggageItem}
							removeLuggageItem={removeLuggageItem}
							sortIndex={sortIndex}
							setSortIndex={setSortIndex}
							readOnly={readOnly}
							isPreview={isPreview}
							allowToggleInReadOnly={allowChecklistToggleInPreview}
						/>
					)}
					<RightColumnSection
						fullWidth={hideChecklistSection}
						showPlatformNote={showPlatformNote}
						setShowPlatformNote={setShowPlatformNote}
						platformNoteText={platformNoteText}
						contentBlocks={contentBlocks}
						updateContentBlock={updateContentBlock}
						moveContentBlockUp={moveContentBlockUp}
						moveContentBlockDown={moveContentBlockDown}
						onRequestRemoveContentBlock={openDeleteBlockConfirm}
						onRequestRemoveBudgetRow={openDeleteRowConfirm}
						personalNotesItems={personalNotesItems}
						updatePersonalNoteItem={updatePersonalNoteItem}
						addPersonalNoteItem={addPersonalNoteItem}
						removePersonalNoteItem={removePersonalNoteItem}
						canAddWhereToGoBlock={canAddWhereToGoBlock}
						canAddUsefulContactsBlock={canAddUsefulContactsBlock}
						canAddBudgetTableBlock={canAddBudgetTableBlock}
						onAddWhereToGoBlock={addWhereToGoBlock}
						onAddUsefulContactsBlock={addUsefulContactsBlock}
						onAddBudgetTableBlock={addBudgetTableBlock}
						suggestionLinksExiting={suggestionLinksExiting}
						readOnly={readOnly}
						isOwner={isOwner}
						isPreview={isPreview}
					/>
				</div>
			</div>

			<div>
				<p className={styles.creationDate}>
					Дата создания{" "}
					{initialPlan?.creation_time
						? (() => {
								const d = new Date(initialPlan.creation_time);
								return isNaN(d.getTime())
									? "—"
									: d.toLocaleDateString("ru-RU", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										});
							})()
						: "—"}
				</p>
				{saveError && (
					<p className={`label ${styles.coverErrorText}`} style={{ marginTop: 8 }} role="alert">
						{saveError}
					</p>
				)}
			</div>

			{!readOnly && (
			<BottomBarSection
				hasChanges={hasChanges}
				onQuestionClick={openOnboardingPopup}
				onAddTextBlock={addTextBlock}
				canAddTextBlock={canAddTextBlock}
				onAddWhereToGoBlock={addWhereToGoBlock}
				canAddWhereToGoBlock={canAddWhereToGoBlock}
				onAddUsefulContactsBlock={addUsefulContactsBlock}
				canAddUsefulContactsBlock={canAddUsefulContactsBlock}
				onAddBudgetTableBlock={addBudgetTableBlock}
				canAddBudgetTableBlock={canAddBudgetTableBlock}
				onSave={planIdStr ? savePlan : undefined}
				saveLoading={saveLoading}
				onDuplicatePlan={handleDuplicatePlan}
				onDeletePlan={openDeleteCheckplanPopup}
				duplicateInProgress={duplicateInProgress}
			/>
			)}
			{readOnly && planIdStr && isOwner && (
				<ViewModeToolbar
					planIdStr={planIdStr}
					planTitle={planTitle}
					planDbId={typeof initialPlan?.id === "number" ? initialPlan.id : undefined}
					fromAccount={fromAccount}
					visibility={currentVisibility}
					onVisibilityChange={setVisibilityOverride}
					onCopyLink={() => setShowCopyLinkToast(true)}
					onDuplicatePlan={handleDuplicatePlan}
					onDeletePlan={openDeleteCheckplanPopup}
					duplicateInProgress={duplicateInProgress}
				/>
			)}
			{readOnly && planIdStr && !isOwner && (
				<GuestViewToolbar
					planIdStr={planIdStr}
					planTitle={planTitle}
					planDbId={typeof initialPlan?.id === "number" ? initialPlan.id : undefined}
					isAuthenticated={!!getAuth()?.user?.id}
					initialLikes={Number(initialPlan?.initial_likes) || 0}
					onCopyLink={() => setShowCopyLinkToast(true)}
				/>
			)}
			<CopyLinkToast show={showCopyLinkToast} onExited={() => setShowCopyLinkToast(false)} />
			<CheckplanOverlays
				showOnboardingPopup={showOnboardingPopup}
				onboardingPopupClosing={onboardingPopupClosing}
				onboardingStep={onboardingStep}
				closeOnboardingPopup={closeOnboardingPopup}
				goOnboardingNextStep={goOnboardingNextStep}
				goOnboardingPrevStep={goOnboardingPrevStep}
				deleteBlockTarget={deleteBlockTarget}
				deleteConfirmClosing={deleteConfirmClosing}
				closeDeleteConfirm={closeDeleteConfirm}
				confirmDeleteBlock={confirmDeleteBlock}
				deleteRowTarget={deleteRowTarget}
				deleteRowConfirmClosing={deleteRowConfirmClosing}
				closeDeleteRowConfirm={closeDeleteRowConfirm}
				confirmDeleteRow={confirmDeleteRow}
				showDuplicateSuccessPopup={showDuplicateSuccessPopup}
				duplicateSuccessClosing={duplicateSuccessClosing}
				closeDuplicateSuccessPopup={closeDuplicateSuccessPopup}
				handleDuplicateSuccessGoToCopy={handleDuplicateSuccessGoToCopy}
				showDeleteCheckplanPopup={showDeleteCheckplanPopup}
				deleteCheckplanClosing={deleteCheckplanClosing}
				closeDeleteCheckplanPopup={closeDeleteCheckplanPopup}
				confirmDeleteCheckplan={confirmDeleteCheckplan}
				deleteCheckplanInProgress={deleteCheckplanInProgress}
				showLoginToLikePopup={showLoginToLikePopup}
				loginToLikeClosing={loginToLikeClosing}
				closeLoginToLikePopup={closeLoginToLikePopup}
				loginFromLoginToLikePopup={() => closeLoginToLikePopup(() => router.push("/login"))}
				showReportSentPopup={showReportSentPopup}
				reportSentClosing={reportSentClosing}
				closeReportSentPopup={closeReportSentPopup}
			/>
		</div>
	);
}
