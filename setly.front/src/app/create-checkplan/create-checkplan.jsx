"use client";

import { useState, useCallback, useRef, useMemo, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/app/components/atomic/molecules/input/input";
import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import DropdownItem from "@/app/components/atomic/atoms/dropdown-item/dropdown-item";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import ButtonCard from "@/app/components/atomic/atoms/buttons-card/buttons-card";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import DecoratedInput from "@/app/components/atomic/molecules/decorated-input/decorated-input";
import { getButtonLabel, CalendarContent, getDaysCountFromRange, getDaysLabelForApi } from "@/app/components/atomic/molecules/calendar/calendar";
import { filterLocations } from "@/app/data/locations-by-region";
import styles from "./create-checkplan.module.css";
import { getApiUrl, apiFetch } from "@/app/lib/api";
import { getAuth } from "@/app/lib/auth-storage";
import { useLikedChecklists } from "@/app/lib/liked-checklists-context";

const DEFAULT_COVER_IMAGE = "/img/main/japan2025.png";

/** Загрузка обложки через бэкенд POST /api/user/me/save-image/checklist-covers/ */
const UPLOAD_COVER_API = "/api/user/me/save-image/checklist-covers/";

/** Парсит строку даты "YYYY-MM-DD" или ISO в Date, иначе null */
function parseDateStr(str) {
	if (!str || typeof str !== "string") return null;
	const trimmed = str.trim();
	if (!trimmed) return null;
	const normalized = trimmed.includes("T") ? trimmed : `${trimmed}T12:00:00`;
	const d = new Date(normalized);
	return Number.isNaN(d.getTime()) ? null : d;
}
/** Форматирует Date в "YYYY-MM-DD" для API */
function formatDateToYYYYMMDD(date) {
	if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return "";
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

/* Типы отдыха и люди — из dropdown-filter-menu */
const TYPE_OPTIONS = [
	"В горы",
	"По городам",
	"На пляж",
	"С семьёй или детьми",
	"Долго / Кочёвка",
];
const TRAVELER_OPTIONS = ["Один", "Вдвоём", "Компания", "С детьми"];

/** Текст совета платформы в блоке «Совет платформы» в зависимости от выбранного типа поездки */
const PLATFORM_ADVICE_BY_TYPE = {
	"В горы": `В горы / Природа

Положите в рюкзак термос с чаем, орехи и лёгкую куртку — этого хватит.

Скорее всего, вы не будете думать о том, сколько вещей взяли. Расслабьтесь и наслаждайтесь спокойствием вместе с природой.`,
	"По городам": `Городской отдых

Сосредоточьтесь на комфорте: удобная обувь, одежда по сезону и power bank спасут чаще, чем полный гардероб.

Город сам подскажет, как провести время — оставьте место для импровизации`,
	"На пляж": `Пляжный отдых

Возьмите шляпу, солнцезащиту и одну книгу — остальное решится само.

Через год вы не вспомните, сколько вещей взяли. Но вспомните тот вечер, когда сидели на песке и смотрели на закат — и впервые за год не думали ни о чём.`,
	"С семьёй или детьми": `С семьёй или детьми

Скачайте пару мультиков и захватите любимую игрушку ребёнка — этого хватит на любую непредвиденность.

Дети не запомнят все музеи, но точно вспомнят, как вы вместе искали мороженое в незнакомом городе и смеялись.`,
	"Долго / Кочёвка": `Долго / Кочёвка

Сложите три футболки, две пары носков и мини-стирку — не перегружайте себя вещами "на всякий случай".

Свобода — это когда вы вдруг оставляете книгу в хостеле и не жалеете — потому что понимаете: она уже отдала вам то, что было нужно.`,
};

/** Дефолтные пункты «Ручная кладь» и «Багаж» для пустого чеклиста по типу поездки */
const DEFAULT_CHECKLIST_BY_TYPE = {
	"В горы": {
		handLuggage: [
			"Паспорт",
			"Страховка",
			"Термос с чаем",
			"Power bank",
			"Фонарик / налобный фонарь",
			"Перекусы",
			"Вода или очиститель",
			"Лёгкая куртка",
		],
		luggage: [
			"Треккинговые ботинки",
			"Термобельё",
			"Спальный мешок / палатка",
			"Доп. одежда",
			"Кухонная утварь",
		],
	},
	"По городам": {
		handLuggage: [
			"Паспорт / ID",
			"Билеты",
			"Страховка",
			"Адаптер",
			"Power bank",
			"Карта города",
			"Лёгкая куртка",
			"Небольшой рюкзак",
		],
		luggage: [
			"Основная одежда",
			"Обувь",
			"Туалетные принадлежности",
			"Зарядки",
			"Наушники",
		],
	},
	"На пляж": {
		handLuggage: [
			"Паспорт / ID",
			"Билеты",
			"Страховка",
			"Солнцезащита",
			"Солнцезащитные очки",
			"Шляпа / кепка",
			"Водонепроницаемый чехол для телефона",
			"Мини-аптечка",
			"Лёгкая футболка",
		],
		luggage: [
			"Пляжная одежда",
			"Пляжные сланцы",
			"Полотенце",
			"Купальник",
			"Туалетные принадлежности",
			"Доп. комплект одежды",
		],
	},
	"С семьёй или детьми": {
		handLuggage: [
			"Паспорта всех",
			"Свидетельства о рождении",
			"Страховка",
			"Аптечка",
			"Игрушка / книга",
			"UV-крем для детей",
			"Бутылочка с фильтром",
			"Термос",
			"Сменная одежда",
			"Влажные салфетки",
		],
		luggage: [
			"Основная одежда",
			"Обувь",
			"Тапочки",
			"Туалетные принадлежности",
		],
	},
	"Долго / Кочёвка": {
		handLuggage: [
			"Паспорт + копия",
			"Мультивиза (если нужна)",
			"Страховка (мультистрановая)",
			"Универсальная одежда",
			"Адаптер",
			"Power bank",
			"Копии всех броней (офлайн)",
			"Запасной комплект одежды",
		],
		luggage: [
			"Основная одежда",
			"Обувь",
			"Туалетные принадлежности",
			"Документы (оригиналы — в отдельной папке)",
		],
	},
};

const HAND_LUGGAGE_ITEMS = [];
const LUGGAGE_ITEMS = [];
const PERSONAL_NOTES = [];
const SORT_ITEMS = ["Ручная кладь", "Ручная кладь и Багаж"];
const MOBILE_TOOLBAR_BOTTOM_OFFSET = 20;

const emptyCount = (items) => items.filter((i) => !(i.text || "").trim()).length;
const canAddItem = (items) => emptyCount(items) < 3;

function useMobileFloatingToolbar(anchorRef, toolbarRef) {
	const [isFloating, setIsFloating] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return undefined;
		const updateFloating = () => {
			const anchorEl = anchorRef.current;
			const toolbarEl = toolbarRef.current;
			if (!anchorEl || !toolbarEl) return;
			if (window.innerWidth > 768) {
				setIsFloating(false);
				return;
			}
			const anchorRect = anchorEl.getBoundingClientRect();
			const toolbarHeight = toolbarEl.offsetHeight || 100;
			const threshold = window.innerHeight - toolbarHeight - MOBILE_TOOLBAR_BOTTOM_OFFSET;
			setIsFloating(anchorRect.top > threshold);
		};
		updateFloating();
		window.addEventListener("scroll", updateFloating, { passive: true });
		window.addEventListener("resize", updateFloating);
		return () => {
			window.removeEventListener("scroll", updateFloating);
			window.removeEventListener("resize", updateFloating);
		};
	}, [anchorRef, toolbarRef]);

	return isFloating;
}

/** Контент дропдауна «Место»: поле поиска + список вариантов (страна/город), стиль как у Тип/Люди */
const LocationDropdownContent = memo(function LocationDropdownContent({
	close,
	searchQuery,
	setSearchQuery,
	onSelect,
}) {
	const inputRef = useRef(null);
	const filtered = useMemo(() => filterLocations(searchQuery).slice(0, 80), [searchQuery]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSelect = useCallback(
		(item) => {
			onSelect(item.label, item.region);
			close();
		},
		[onSelect, close]
	);

	return (
		<div className={styles.locationDropdownContent}>
			<input
				ref={inputRef}
				type="text"
				className={`subinfo ${styles.locationDropdownSearch}`}
				placeholder="Страна или город..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onKeyDown={(e) => e.stopPropagation()}
				aria-label="Поиск локации"
			/>
			<div className={styles.locationDropdownList} role="listbox">
				{filtered.length === 0 ? (
					<div className={`subinfo ${styles.locationDropdownEmpty}`}>
						{searchQuery.trim() ? "Ничего не найдено" : "Введите страну или город"}
					</div>
				) : (
					filtered.map((item, index) => (
						<DropdownItem
							key={`${item.label}-${index}`}
							text={item.label}
							onClick={() => handleSelect(item)}
						/>
					))
				)}
			</div>
		</div>
	);
});

const ChecklistSection = memo(function ChecklistSection({
	handLuggageItems,
	updateHandLuggageItem,
	addHandLuggageItem,
	removeHandLuggageItem,
	luggageItems,
	updateLuggageItem,
	addLuggageItem,
	removeLuggageItem,
	sortIndex,
	setSortIndex,
	readOnly = false,
	isPreview = false,
	allowToggleInReadOnly = false,
}) {
	const showSortDropdown = !readOnly && !isPreview;
	const showSortDropdownArea = !isPreview;
	const canShowDeleteHand = handLuggageItems.length >= 2;
	const canShowDeleteLuggage = luggageItems.length >= 2;
	const canToggleCheckboxesOnly = readOnly && isPreview && allowToggleInReadOnly;

	return (
		<div className={styles.checklistCard}>
			<div className={styles.checklistTitleRow}>
				<Image src="/icons/images/TrolleyBag.svg" alt="" width={24} height={24} className={styles.icon24} />
				<h2 className={`title_2 ${styles.checklistTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
					Что взять с собой
				</h2>
			</div>
			{(sortIndex === 0 || sortIndex === 1) && (
				<div className={styles.checklistGroup}>
					<h3 className={`subtitle_1 ${styles.sectionTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Ручная кладь
					</h3>
					{HAND_LUGGAGE_ITEMS.map((text, i) => (
						<div key={`fixed-${i}`} className={styles.checkboxItem}>
							<div className={styles.checkbox} aria-hidden />
							<span className={`paragraph ${styles.checkboxText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								{text}
							</span>
						</div>
					))}
					{handLuggageItems.map((item, i) => {
						const isEmpty = !(item.text || "").trim();
						const showDelete = !readOnly && canShowDeleteHand && isEmpty;
						return (
							<div key={i} className={styles.checklistItemWrap}>
								<div className={styles.checklistItemRow}>
									{readOnly && !canToggleCheckboxesOnly ? (
										<span className={`paragraph ${styles.checklistDecoratedInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>
											{item.text || "—"}
										</span>
									) : (
										<DecoratedInput
											decorator="checkbox"
											placeholder="Введите..."
											className={`paragraph ${styles.checklistDecoratedInput}`}
											value={item.text}
											onChange={readOnly ? undefined : (e) => updateHandLuggageItem(i, { text: e.target.value })}
											checkboxChecked={item.checked}
											onCheckboxChange={() => updateHandLuggageItem(i, { checked: !item.checked })}
											readOnly={readOnly}
											multiline
											maxLength={92}
										/>
									)}
									{showDelete && (
										<button
											type="button"
											className={styles.checklistItemDelete}
											aria-label="Удалить пункт"
											onClick={(e) => { e.preventDefault(); removeHandLuggageItem(i); }}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src="/icons/system/Cross.svg" alt="" width={16} height={16} className={styles.checklistItemDeleteIcon} />
										</button>
									)}
								</div>
							</div>
						);
					})}
					{!readOnly && (
						<ButtonCard
							text="Добавить пункт..."
							icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
							hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
							onClick={addHandLuggageItem}
							disabled={!canAddItem(handLuggageItems)}
						/>
					)}
				</div>
			)}
			{sortIndex === 1 && (
				<div className={styles.checklistGroup}>
					<h3 className={`subtitle_1 ${styles.sectionTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Багаж
					</h3>
					{LUGGAGE_ITEMS.map((text, i) => (
						<div key={`fixed-${i}`} className={styles.checkboxItem}>
							<div className={styles.checkbox} aria-hidden />
							<span className={`paragraph ${styles.checkboxText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								{text}
							</span>
						</div>
					))}
					{luggageItems.map((item, i) => {
						const isEmpty = !(item.text || "").trim();
						const showDelete = !readOnly && canShowDeleteLuggage && isEmpty;
						return (
							<div key={i} className={styles.checklistItemWrap}>
								<div className={styles.checklistItemRow}>
									{readOnly && !canToggleCheckboxesOnly ? (
										<span className={`paragraph ${styles.checklistDecoratedInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>
											{item.text || "—"}
										</span>
									) : (
										<DecoratedInput
											decorator="checkbox"
											placeholder="Введите..."
											className={`paragraph ${styles.checklistDecoratedInput}`}
											value={item.text}
											onChange={readOnly ? undefined : (e) => updateLuggageItem(i, { text: e.target.value })}
											checkboxChecked={item.checked}
											onCheckboxChange={() => updateLuggageItem(i, { checked: !item.checked })}
											readOnly={readOnly}
											multiline
											maxLength={90}
										/>
									)}
									{showDelete && (
										<button
											type="button"
											className={styles.checklistItemDelete}
											aria-label="Удалить пункт"
											onClick={(e) => { e.preventDefault(); removeLuggageItem(i); }}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src="/icons/system/Cross.svg" alt="" width={16} height={16} className={styles.checklistItemDeleteIcon} />
										</button>
									)}
								</div>
							</div>
						);
					})}
					{!readOnly && (
						<ButtonCard
							text="Добавить пункт..."
							icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
							hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
							onClick={addLuggageItem}
							disabled={!canAddItem(luggageItems)}
						/>
					)}
				</div>
			)}
			{showSortDropdownArea && (
				<div className={styles.sortDropdownWrap}>
					{showSortDropdown ? (
						<Dropdown
							text={SORT_ITEMS[sortIndex]}
							items={SORT_ITEMS}
							selectedIndex={sortIndex}
							onSelect={setSortIndex}
							menuCentered
						/>
					) : (
						<span className="subinfo" style={{ color: "var(--grayscale-dark-gray)" }}>{SORT_ITEMS[sortIndex]}</span>
					)}
				</div>
			)}
		</div>
	);
});

const TextBlockCard = memo(function TextBlockCard({
	block,
	index,
	totalCount,
	updateContentBlock,
	moveContentBlockUp,
	moveContentBlockDown,
	onRequestRemoveContentBlock,
	readOnly = false,
}) {
	const canMoveUp = index > 0;
	const canMoveDown = index < totalCount - 1;
	const onUpdate = useCallback((updates) => updateContentBlock(index, updates), [updateContentBlock, index]);
	const onMoveUp = useCallback(() => moveContentBlockUp(index), [moveContentBlockUp, index]);
	const onMoveDown = useCallback(() => moveContentBlockDown(index), [moveContentBlockDown, index]);
	const onRemove = useCallback(() => onRequestRemoveContentBlock(index, block.type), [onRequestRemoveContentBlock, index, block.type]);

	return (
		<div className={styles.textBlockWrap} data-block-id={block.id}>
			<div className={styles.textBlock}>
				<div className={styles.textBlockTitleRow}>
					<div className={styles.textBlockTitleCell}>
						{readOnly ? (
							<span className={`title_2 ${styles.textBlockTitleInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>{block.title || "—"}</span>
						) : (
							<DecoratedInput
								decorator="none"
								multiline
								placeholder="Введите название блока..."
								value={block.title}
								onChange={(e) => onUpdate({ title: e.target.value })}
								className={styles.textBlockTitleInput}
								inputTextClass="title_2"
								maxLength={32}
							/>
						)}
					</div>
					{!readOnly && (
						<div className={styles.textBlockToolbar}>
							<button
								type="button"
								className={styles.textBlockToolbarBtn}
								aria-label="Поднять блок выше"
								disabled={!canMoveUp}
								onClick={(e) => { e.preventDefault(); canMoveUp && onMoveUp?.(); }}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="/icons/system/ArrowUp.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
							</button>
							<button
								type="button"
								className={styles.textBlockToolbarBtn}
								aria-label="Опустить блок ниже"
								disabled={!canMoveDown}
								onClick={(e) => { e.preventDefault(); canMoveDown && onMoveDown?.(); }}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="/icons/system/ArrowDown.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
							</button>
							<button
								type="button"
								className={styles.textBlockToolbarBtn}
								aria-label="Удалить блок"
								onClick={(e) => { e.preventDefault(); onRemove?.(); }}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="/icons/system/Cross.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
							</button>
						</div>
					)}
				</div>
				{readOnly ? (
					<p className={`paragraph ${styles.textBlockDescInput} ${styles.textBlockDescReadOnly}`} style={{ color: "var(--grayscale-dark-gray)", margin: 0 }}>{block.description || "—"}</p>
				) : (
					<DecoratedInput
						decorator="none"
						multiline
						placeholder="Тут можно написать что угодно, например любой длинный текст"
						value={block.description}
						onChange={(e) => onUpdate({ description: e.target.value })}
						className={styles.textBlockDescInput}
						inputTextClass="paragraph"
					/>
				)}
			</div>
		</div>
	);
});

const WHERE_TO_GO_SECTIONS = [
	{ key: "look", title: "Посмотреть", placeholder: "Что посмотреть" },
	{ key: "eat", title: "Поесть", placeholder: "Что поесть" },
	{ key: "buy", title: "Покупки", placeholder: "Что купить" },
];

const USEFUL_CONTACTS_INITIAL_SECTIONS = [
	{ key: "accommodation", title: "Жильё / Отель", placeholder: "Пункт" },
	{ key: "embassy", title: "Посольство / Консульство", placeholder: "Пункт" },
	{ key: "guide", title: "Гид / Локальные контакты", placeholder: "Пункт" },
];
const USEFUL_CONTACTS_ADDABLE_SECTIONS = [
	{ key: "pharmacy", title: "Аптека / Медпомощь" },
	{ key: "police", title: "Полиция / Экстренные службы" },
	{ key: "taxi", title: "Такси / Транспорт" },
];

const BUDGET_DEFAULT_ROWS = [
	{ category: "Перелёт", planned: "", spent: "" },
	{ category: "Жильё", planned: "", spent: "" },
	{ category: "Питание", planned: "", spent: "" },
	{ category: "Транспорт", planned: "", spent: "" },
];

/** Маппинг заголовка секции контактов (из API) в key */
const CONTACTS_TYPE_TITLE_TO_KEY = {};
[...USEFUL_CONTACTS_INITIAL_SECTIONS, ...USEFUL_CONTACTS_ADDABLE_SECTIONS].forEach((s) => {
	CONTACTS_TYPE_TITLE_TO_KEY[s.title] = s.key;
});

/**
 * Собирает массив contentBlocks и nextId из сохранённых данных чек-плана (initialPlanData).
 *
 * Новый формат: initialPlanData.blocks содержит элементы с полем type:
 * - type: "text"          → текстовый блок
 * - type: "whereToGo"     → блок «Куда сходить»
 * - type: "usefulContacts"→ блок «Полезные контакты»
 * - type: "budgetTable"   → блок «Бюджет»
 *
 * При наличии type порядок блоков полностью задаётся этим массивом.
 * Для старых записей без type сохраняется прежний порядок:
 * текстовые блоки → «Куда сходить» → «Полезные контакты» → «Бюджет».
 */
function buildContentBlocksFromPlanData(initialPlanData) {
	if (!initialPlanData) return { blocks: [], nextId: 0 };
	const blocks = [];
	let nextId = 0;
	const id = () => nextId++;

	const textBlocks = initialPlanData.blocks;
	const hasTypedBlocks =
		Array.isArray(textBlocks) && textBlocks.some((b) => b && typeof b.type === "string" && b.type !== "text");

	// Подготовка данных для специальных блоков
	const wtg = initialPlanData.what_to_go_block;
	const hasWhereToGo =
		wtg && (Array.isArray(wtg.what_to_see) || Array.isArray(wtg.what_to_eat) || Array.isArray(wtg.what_to_buy));
	const WHERE_TO_GO_API_FIELD = { look: "what_to_see", eat: "what_to_eat", buy: "what_to_buy" };
	const buildWhereToGoBlock = () => {
		if (!hasWhereToGo) return null;
		const toRows = (arr) =>
			Array.isArray(arr) && arr.length > 0
				? arr.map((r) => ({ text: r?.title ?? "", link: r?.link ?? "" }))
				: [];
		const sections = {};
		const removedWhereToGoSectionKeys = [];
		for (const { key } of WHERE_TO_GO_SECTIONS) {
			const field = WHERE_TO_GO_API_FIELD[key];
			const rows = toRows(wtg[field]);
			if (rows.length === 0) {
				removedWhereToGoSectionKeys.push(key);
			} else {
				sections[key] = rows;
			}
		}
		return {
			type: "whereToGo",
			id: id(),
			sections,
			removedWhereToGoSectionKeys,
		};
	};

	const ucb = initialPlanData.useful_contacts_block?.blocks;
	const hasUsefulContacts = Array.isArray(ucb) && ucb.length > 0;
	const buildUsefulContactsBlock = () => {
		if (!hasUsefulContacts) return null;
		const sections = {};
		const addedSectionOrder = [];
		const removedInitialSectionKeys = [];
		ucb.forEach((group) => {
			const typeTitle = group?.contacts_type ?? "";
			const key = CONTACTS_TYPE_TITLE_TO_KEY[typeTitle];
			const rows = Array.isArray(group?.contacts)
				? group.contacts.map((c) => ({
						text: c?.title ?? c?.data ?? "",
						link: c?.link ?? "",
				  }))
				: [];
			if (key) {
				if (USEFUL_CONTACTS_ADDABLE_SECTIONS.some((s) => s.key === key)) {
					addedSectionOrder.push(key);
				}
				sections[key] = rows.length > 0 ? rows : [{ text: "", link: "" }];
			}
		});
		USEFUL_CONTACTS_INITIAL_SECTIONS.forEach(({ key }) => {
			if (!(key in sections)) removedInitialSectionKeys.push(key);
		});
		return {
			type: "usefulContacts",
			id: id(),
			sections,
			addedSectionOrder,
			removedInitialSectionKeys,
		};
	};

	const bb = initialPlanData.budget_block;
	const hasBudget =
		bb && (Array.isArray(bb.table) ? bb.table.length > 0 : Boolean(bb.title && bb.title.trim()));
	const buildBudgetBlock = () => {
		if (!hasBudget) return null;
		const rows =
			Array.isArray(bb.table) && bb.table.length > 0
				? bb.table.map((r) => ({
						category: r?.title ?? "",
						planned: r?.plan != null ? String(r.plan) : "",
						spent: r?.spent != null ? String(r.spent) : "",
				  }))
				: BUDGET_DEFAULT_ROWS.map((r) => ({ ...r }));
		return {
			type: "budgetTable",
			id: id(),
			title: bb?.title ?? "Бюджет",
			rows,
		};
	};

	// Новый путь: есть type у блоков — следуем порядку из initialPlanData.blocks
	if (hasTypedBlocks) {
		let whereToGoAdded = false;
		let usefulContactsAdded = false;
		let budgetAdded = false;

		textBlocks.forEach((b) => {
			const blockType = b?.type || "text";
			if (blockType === "text") {
				blocks.push({
					type: "text",
					id: id(),
					title: b?.title ?? "",
					description: b?.description ?? "",
				});
				return;
			}
			if (blockType === "whereToGo" && !whereToGoAdded) {
				const w = buildWhereToGoBlock();
				if (w) {
					blocks.push(w);
					whereToGoAdded = true;
				}
				return;
			}
			if (blockType === "usefulContacts" && !usefulContactsAdded) {
				const u = buildUsefulContactsBlock();
				if (u) {
					blocks.push(u);
					usefulContactsAdded = true;
				}
				return;
			}
			if (blockType === "budgetTable" && !budgetAdded) {
				const bBlock = buildBudgetBlock();
				if (bBlock) {
					blocks.push(bBlock);
					budgetAdded = true;
				}
			}
		});

		// На всякий случай добавляем отсутствующие специальные блоки в конце (совместимость)
		if (hasWhereToGo && !whereToGoAdded) {
			const w = buildWhereToGoBlock();
			if (w) blocks.push(w);
		}
		if (hasUsefulContacts && !usefulContactsAdded) {
			const u = buildUsefulContactsBlock();
			if (u) blocks.push(u);
		}
		if (hasBudget && !budgetAdded) {
			const bBlock = buildBudgetBlock();
			if (bBlock) blocks.push(bBlock);
		}

		return { blocks, nextId };
	}

	// Старый путь: только текстовые блоки и фиксированный порядок остальных
	if (Array.isArray(textBlocks)) {
		textBlocks.forEach((b) => {
			blocks.push({
				type: "text",
				id: id(),
				title: b?.title ?? "",
				description: b?.description ?? "",
			});
		});
	}

	const whereToGoBlock = buildWhereToGoBlock();
	if (whereToGoBlock) blocks.push(whereToGoBlock);

	const usefulContactsBlock = buildUsefulContactsBlock();
	if (usefulContactsBlock) blocks.push(usefulContactsBlock);

	const budgetBlock = buildBudgetBlock();
	if (budgetBlock) blocks.push(budgetBlock);

	return { blocks, nextId };
}

const emptyWhereToGoRowCount = (rows) => rows.filter((r) => !(r.text || "").trim() && !(r.link || "").trim()).length;
const canAddWhereToGoRow = (rows) => emptyWhereToGoRowCount(rows) < 3;

/** Индекс вставки по Y внутри контейнера строк; attrName — data-* на корне каждой строки */
function computeIndexedRowDropIndex(clientY, containerEl, attrName) {
	if (!containerEl) return 0;
	const rowEls = [...containerEl.querySelectorAll(`[${attrName}]`)];
	if (rowEls.length === 0) return 0;
	for (let i = 0; i < rowEls.length; i++) {
		const r = rowEls[i].getBoundingClientRect();
		const mid = r.top + r.height / 2;
		if (clientY < mid) {
			return Number.parseInt(rowEls[i].getAttribute(attrName) ?? "0", 10) || 0;
		}
	}
	return Number.parseInt(rowEls[rowEls.length - 1].getAttribute(attrName) ?? "0", 10) || 0;
}

/**
 * Как computeIndexedRowDropIndex, но только по строкам внутри одной секции;
 * если курсор выше/ниже блока секции — зажимаем к первой/последней строке (нельзя увести в другую секцию).
 */
function computeSectionRowDropIndex(clientY, sectionBodyEl) {
	if (!sectionBodyEl) return 0;
	const attr = "data-rowlist-row-index";
	const rowEls = [...sectionBodyEl.querySelectorAll(`[${attr}]`)];
	if (rowEls.length === 0) return 0;
	const bounds = sectionBodyEl.getBoundingClientRect();
	const firstIdx = Number.parseInt(rowEls[0].getAttribute(attr) ?? "0", 10) || 0;
	const lastIdx = Number.parseInt(rowEls[rowEls.length - 1].getAttribute(attr) ?? "0", 10) || rowEls.length - 1;
	if (clientY < bounds.top) return firstIdx;
	if (clientY > bounds.bottom) return lastIdx;
	return computeIndexedRowDropIndex(clientY, sectionBodyEl, attr);
}

function useSectionedRowListDrag({ readOnly, rootRef, reorderInSection }) {
	const [rowlistDragVisual, setRowlistDragVisual] = useState(null);
	const rowlistDragFromRef = useRef(null);
	const rowlistDragSectionKeyRef = useRef(null);
	const rowlistDragUserSelectRef = useRef(null);
	const rowlistDragRafRef = useRef(null);
	const rowlistDragPendingRef = useRef(null);

	useEffect(
		() => () => {
			if (rowlistDragRafRef.current != null) cancelAnimationFrame(rowlistDragRafRef.current);
		},
		[]
	);

	const getSectionBody = useCallback((sectionKey) => {
		if (!sectionKey || !rootRef.current) return null;
		return rootRef.current.querySelector(`[data-rowlist-section-body][data-rowlist-section-key="${sectionKey}"]`);
	}, [rootRef]);

	const onRowlistDragHandlePointerDown = useCallback(
		(sectionKey, rowIndex, e) => {
			if (readOnly || e.button !== 0) return;
			e.preventDefault();
			e.stopPropagation();
			const rowEl = e.currentTarget.closest("[data-rowlist-row-index]");
			const sectionBody = rowEl?.closest("[data-rowlist-section-body]");
			if (!rowEl || !sectionBody) return;
			const sk = sectionBody.getAttribute("data-rowlist-section-key");
			if (sk !== sectionKey) return;
			const rect = rowEl.getBoundingClientRect();
			const grabOffsetY = e.clientY - rect.top;
			let slotPx = rect.height + 20;
			const nextEl = rowEl.nextElementSibling;
			if (nextEl?.hasAttribute?.("data-rowlist-row-index")) {
				slotPx = Math.max(1, nextEl.getBoundingClientRect().top - rect.top);
			}
			rowlistDragFromRef.current = rowIndex;
			rowlistDragSectionKeyRef.current = sectionKey;
			rowlistDragUserSelectRef.current = document.body.style.userSelect;
			document.body.style.userSelect = "none";
			setRowlistDragVisual({
				sectionKey,
				fromIndex: rowIndex,
				overIndex: rowIndex,
				floatTop: e.clientY - grabOffsetY,
				floatLeft: rect.left,
				floatWidth: rect.width,
				grabOffsetY,
				slotPx,
			});
			try {
				e.currentTarget.setPointerCapture(e.pointerId);
			} catch {
				/* ignore */
			}
		},
		[readOnly]
	);

	const onRowlistDragHandlePointerMove = useCallback(
		(e) => {
			if (rowlistDragFromRef.current === null || !rowlistDragSectionKeyRef.current) return;
			e.preventDefault();
			rowlistDragPendingRef.current = { clientY: e.clientY };
			if (rowlistDragRafRef.current != null) return;
			rowlistDragRafRef.current = requestAnimationFrame(() => {
				rowlistDragRafRef.current = null;
				const p = rowlistDragPendingRef.current;
				const sk = rowlistDragSectionKeyRef.current;
				if (!p || sk == null || rowlistDragFromRef.current === null) return;
				const body = rootRef.current?.querySelector(`[data-rowlist-section-body][data-rowlist-section-key="${sk}"]`);
				const over = body ? computeSectionRowDropIndex(p.clientY, body) : rowlistDragFromRef.current;
				setRowlistDragVisual((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						overIndex: over,
						floatTop: p.clientY - prev.grabOffsetY,
					};
				});
			});
		},
		[rootRef]
	);

	const onRowlistDragHandlePointerUp = useCallback(
		(e) => {
			document.body.style.userSelect = rowlistDragUserSelectRef.current ?? "";
			rowlistDragUserSelectRef.current = null;
			if (rowlistDragRafRef.current != null) {
				cancelAnimationFrame(rowlistDragRafRef.current);
				rowlistDragRafRef.current = null;
			}
			rowlistDragPendingRef.current = null;
			const sk = rowlistDragSectionKeyRef.current;
			const from = rowlistDragFromRef.current;
			rowlistDragSectionKeyRef.current = null;
			rowlistDragFromRef.current = null;
			try {
				e.currentTarget.releasePointerCapture(e.pointerId);
			} catch {
				/* ignore */
			}
			setRowlistDragVisual(null);
			if (sk == null || from == null) return;
			const body = rootRef.current?.querySelector(`[data-rowlist-section-body][data-rowlist-section-key="${sk}"]`);
			const to = body ? computeSectionRowDropIndex(e.clientY, body) : from;
			reorderInSection(sk, from, to);
		},
		[rootRef, reorderInSection]
	);

	const onRowlistDragHandlePointerCancel = useCallback((e) => {
		document.body.style.userSelect = rowlistDragUserSelectRef.current ?? "";
		rowlistDragUserSelectRef.current = null;
		rowlistDragSectionKeyRef.current = null;
		rowlistDragFromRef.current = null;
		if (rowlistDragRafRef.current != null) {
			cancelAnimationFrame(rowlistDragRafRef.current);
			rowlistDragRafRef.current = null;
		}
		rowlistDragPendingRef.current = null;
		setRowlistDragVisual(null);
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch {
			/* ignore */
		}
	}, []);

	return {
		rowlistDragVisual,
		onRowlistDragHandlePointerDown,
		onRowlistDragHandlePointerMove,
		onRowlistDragHandlePointerUp,
		onRowlistDragHandlePointerCancel,
	};
}

function isValidLink(value) {
	const s = (value || "").trim();
	if (s === "") return true;
	try {
		const url = s.startsWith("http://") || s.startsWith("https://") ? s : `https://${s}`;
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

const WhereToGoDragFloatRow = memo(function WhereToGoDragFloatRow({ top, left, width, rowIndex, row }) {
	if (typeof document === "undefined") return null;
	const num = rowIndex + 1;
	const prefix = `${num}. `;
	const userText = row.text ?? "";
	const linkStr = row.link?.trim() || "—";
	return createPortal(
		<div className={styles.whereToGoRowFloatRoot} style={{ top, left, width }}>
			<div className={styles.whereToGoRowFloatInner}>
				<div className={styles.whereToGoRow}>
					<div className={styles.whereToGoRowDragHandle} aria-hidden>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/icons/system/draggableDots.svg" alt="" width={11} height={18} draggable={false} />
					</div>
					<div className={styles.whereToGoDescCell}>
						<span className={`paragraph ${styles.whereToGoPrefix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>
							{prefix}
						</span>
						<span className={`paragraph ${styles.whereToGoDescInput} ${styles.whereToGoReadOnlyText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{userText.trim() || "—"}
						</span>
					</div>
					<div className={styles.whereToGoLinkWrap}>
						<div className={`${styles.whereToGoLinkCell} ${styles.whereToGoLinkCellReadOnly}`}>
							<span className={`subinfo ${styles.whereToGoLinkInput} ${styles.whereToGoLinkInputReadOnly}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								{linkStr}
							</span>
						</div>
					</div>
					<div className={styles.whereToGoRowDeleteCell} aria-hidden />
				</div>
			</div>
		</div>,
		document.body
	);
});

const WhereToGoSectionRow = memo(function WhereToGoSectionRow({
	rowId,
	rowIndex,
	sectionKey,
	row,
	placeholder,
	onUpdate,
	onRemove,
	canRemove,
	onRowlistDragHandlePointerDown,
	onRowlistDragHandlePointerMove,
	onRowlistDragHandlePointerUp,
	onRowlistDragHandlePointerCancel,
	rowlistDragShiftPx = 0,
	rowlistIsDragSource = false,
	rowlistIsDropTarget = false,
	rowlistShiftTransition = false,
	readOnly = false,
}) {
	const descTextareaRef = useRef(null);
	const [rowHover, setRowHover] = useState(false);
	const num = rowIndex + 1;
	const prefix = `${num}. `;
	const userText = row.text ?? "";
	const linkValue = (row.link ?? "").trim();
	const linkInvalid = linkValue !== "" && !isValidLink(linkValue);
	const errorId = rowId != null ? `whereToGo-link-error-${rowId}` : undefined;
	const handleDescChange = useCallback(
		(e) => {
			onUpdate({ text: e.target.value });
		},
		[onUpdate]
	);
	const adjustDescHeight = useCallback(() => {
		const ta = descTextareaRef.current;
		if (!ta) return;
		ta.style.height = "auto";
		ta.style.height = `${Math.max(44, ta.scrollHeight)}px`;
	}, []);
	useEffect(() => {
		adjustDescHeight();
	}, [userText, adjustDescHeight]);
	const handleLinkChange = useCallback(
		(e) => {
			onUpdate({ link: e.target.value });
		},
		[onUpdate]
	);
	const openLink = useCallback(() => {
		const url = (row.link ?? "").trim();
		if (url) {
			try {
				const u = new URL(url.startsWith("http") ? url : `https://${url}`);
				window.open(u.toString(), "_blank", "noopener,noreferrer");
			} catch {
				window.open(`https://${url}`, "_blank", "noopener,noreferrer");
			}
		}
	}, [row.link]);

	/* На мобильном кнопка удаления видна всегда (при canRemove); на десктопе — по hover на ряд */
	const showDelete = canRemove && rowHover && !readOnly;

	const handleRowlistDragPointerDown = useCallback(
		(e) => onRowlistDragHandlePointerDown?.(sectionKey, rowIndex, e),
		[onRowlistDragHandlePointerDown, sectionKey, rowIndex]
	);

	if (readOnly) {
		return (
			<div
				className={`${styles.whereToGoRow} ${rowlistShiftTransition ? styles.budgetTableRowShiftable : ""} ${rowlistIsDropTarget ? styles.budgetTableRowDropTarget : ""}`}
				data-rowlist-row-index={rowIndex}
				style={{
					...(rowlistDragShiftPx !== 0 ? { transform: `translateY(${rowlistDragShiftPx}px)` } : {}),
					visibility: rowlistIsDragSource ? "hidden" : undefined,
					pointerEvents: rowlistIsDragSource ? "none" : undefined,
				}}
			>
				<div className={styles.whereToGoRowLeadSpacer} aria-hidden />
				<div className={styles.whereToGoDescCell}>
					<span className={`paragraph ${styles.whereToGoPrefix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>
						{prefix}
					</span>
					<span className={`paragraph ${styles.whereToGoDescInput} ${styles.whereToGoReadOnlyText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						{userText || "—"}
					</span>
				</div>
				<div className={styles.whereToGoLinkWrap}>
					<div className={`${styles.whereToGoLinkCell} ${styles.whereToGoLinkCellReadOnly}`}>
						<span className={`subinfo ${styles.whereToGoLinkInput} ${styles.whereToGoLinkInputReadOnly}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{row.link?.trim() || "—"}
						</span>
						{row.link?.trim() && (
							<button
								type="button"
								className={styles.whereToGoLinkIconBtn}
								aria-label="Открыть ссылку"
								onClick={openLink}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src="/icons/system/LinkArrow.svg" alt="" width={14} height={14} className={styles.whereToGoLinkArrow} />
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`${styles.whereToGoRow} ${canRemove ? styles.whereToGoRowCanRemove : ""} ${rowlistShiftTransition ? styles.budgetTableRowShiftable : ""} ${rowlistIsDropTarget ? styles.budgetTableRowDropTarget : ""}`}
			data-rowlist-row-index={rowIndex}
			onMouseEnter={() => setRowHover(true)}
			onMouseLeave={() => setRowHover(false)}
			style={{
				...(rowlistDragShiftPx !== 0 ? { transform: `translateY(${rowlistDragShiftPx}px)` } : {}),
				visibility: rowlistIsDragSource ? "hidden" : undefined,
				pointerEvents: rowlistIsDragSource ? "none" : undefined,
			}}
		>
			<div
				className={styles.whereToGoRowDragHandle}
				role="button"
				tabIndex={-1}
				aria-label="Изменить порядок строки"
				onPointerDown={handleRowlistDragPointerDown}
				onPointerMove={onRowlistDragHandlePointerMove}
				onPointerUp={onRowlistDragHandlePointerUp}
				onPointerCancel={onRowlistDragHandlePointerCancel}
				onMouseDown={(e) => e.stopPropagation()}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/icons/system/draggableDots.svg" alt="" width={11} height={18} draggable={false} />
			</div>
			<div className={styles.whereToGoDescCell}>
				<span className={`paragraph ${styles.whereToGoPrefix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>
					{prefix}
				</span>
				<textarea
					ref={descTextareaRef}
					className={`paragraph ${styles.whereToGoDescInput}`}
					style={{ color: "var(--grayscale-dark-gray)" }}
					placeholder={placeholder}
					value={userText}
					onChange={handleDescChange}
					onInput={adjustDescHeight}
					aria-label={placeholder}
					rows={1}
				/>
			</div>
			<div className={styles.whereToGoLinkWrap}>
				<div className={`${styles.whereToGoLinkCell} ${linkInvalid ? styles.whereToGoLinkCellError : ""}`}>
					<input
						type="url"
						inputMode="url"
						className={`subinfo ${styles.whereToGoLinkInput}`}
						style={{ color: "var(--grayscale-dark-gray)" }}
						placeholder="https://link.com"
						value={row.link ?? ""}
						onChange={handleLinkChange}
						aria-label="Ссылка"
						aria-invalid={linkInvalid}
						aria-describedby={linkInvalid && errorId ? errorId : undefined}
					/>
					<button
						type="button"
						className={styles.whereToGoLinkIconBtn}
						aria-label="Открыть ссылку"
						onClick={openLink}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/icons/system/LinkArrow.svg" alt="" width={14} height={14} className={styles.whereToGoLinkArrow} />
					</button>
				</div>
				{linkInvalid && errorId && (
					<span id={errorId} className={`label ${styles.whereToGoLinkError}`} role="alert">
						Похоже, это не ссылка
					</span>
				)}
			</div>
			<div className={`${styles.whereToGoRowDeleteCell} ${showDelete ? styles.whereToGoRowDeleteCellVisible : ""}`}>
				{canRemove && (
					<RoundButton
						variant="white"
						icon={/* eslint-disable-next-line @next/next/no-img-element */ <img src="/icons/system/Cross.svg" alt="" width={20} height={20} />}
						aria-label="Удалить пункт"
						onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove?.(); }}
					/>
				)}
			</div>
		</div>
	);
});

const WhereToGoBlockCard = memo(function WhereToGoBlockCard({
	block,
	index,
	totalCount,
	updateContentBlock,
	moveContentBlockUp,
	moveContentBlockDown,
	onRequestRemoveContentBlock,
	readOnly = false,
}) {
	const canMoveUp = index > 0;
	const canMoveDown = index < totalCount - 1;
	const sections = block.sections ?? { look: [{ text: "", link: "" }], eat: [{ text: "", link: "" }], buy: [{ text: "", link: "" }] };
	const removedWhereToGoSectionKeys = block.removedWhereToGoSectionKeys ?? [];

	const onUpdate = useCallback((updates) => updateContentBlock(index, updates), [updateContentBlock, index]);
	const onMoveUp = useCallback(() => moveContentBlockUp(index), [moveContentBlockUp, index]);
	const onMoveDown = useCallback(() => moveContentBlockDown(index), [moveContentBlockDown, index]);
	const onRemove = useCallback(() => onRequestRemoveContentBlock(index, block.type), [onRequestRemoveContentBlock, index, block.type]);

	const updateSection = useCallback(
		(sectionKey, rows) => {
			onUpdate({ sections: { ...sections, [sectionKey]: rows } });
		},
		[onUpdate, sections]
	);

	const addRow = useCallback(
		(sectionKey) => {
			const rows = sections[sectionKey] ?? [{ text: "", link: "" }];
			if (!canAddWhereToGoRow(rows)) return;
			updateSection(sectionKey, [...rows, { text: "", link: "" }]);
		},
		[sections, updateSection]
	);

	const removeRow = useCallback(
		(sectionKey, rowIndex) => {
			const rows = sections[sectionKey] ?? [];
			if (rows.length <= 1) return;
			updateSection(
				sectionKey,
				rows.filter((_, i) => i !== rowIndex)
			);
		},
		[sections, updateSection]
	);

	const updateRow = useCallback(
		(sectionKey, rowIndex, updates) => {
			const rows = [...(sections[sectionKey] ?? [])];
			rows[rowIndex] = { ...rows[rowIndex], ...updates };
			updateSection(sectionKey, rows);
		},
		[sections, updateSection]
	);

	const restoreWhereToGoSection = useCallback(
		(sectionKey) => {
			onUpdate({
				removedWhereToGoSectionKeys: removedWhereToGoSectionKeys.filter((k) => k !== sectionKey),
				sections: { ...sections, [sectionKey]: [{ text: "", link: "" }] },
			});
		},
		[onUpdate, sections, removedWhereToGoSectionKeys]
	);

	const removeWhereToGoSection = useCallback(
		(sectionKey) => {
			const nextSections = { ...sections };
			delete nextSections[sectionKey];
			const removed = new Set(removedWhereToGoSectionKeys);
			removed.add(sectionKey);
			onUpdate({
				sections: nextSections,
				removedWhereToGoSectionKeys: [...removed],
			});
		},
		[onUpdate, sections, removedWhereToGoSectionKeys]
	);

	const rowlistRootRef = useRef(null);
	const sectionsRefForRowReorder = useRef(sections);
	sectionsRefForRowReorder.current = sections;

	const reorderRowInSection = useCallback(
		(sectionKey, fromIndex, toIndex) => {
			if (!sectionKey || fromIndex === toIndex) return;
			const current = sectionsRefForRowReorder.current[sectionKey] ?? [];
			const len = current.length;
			if (fromIndex < 0 || fromIndex >= len || toIndex < 0 || toIndex >= len) return;
			const next = [...current];
			const [removed] = next.splice(fromIndex, 1);
			next.splice(toIndex, 0, removed);
			updateSection(sectionKey, next);
		},
		[updateSection]
	);

	const {
		rowlistDragVisual,
		onRowlistDragHandlePointerDown,
		onRowlistDragHandlePointerMove,
		onRowlistDragHandlePointerUp,
		onRowlistDragHandlePointerCancel,
	} = useSectionedRowListDrag({
		readOnly,
		rootRef: rowlistRootRef,
		reorderInSection: reorderRowInSection,
	});

	const visibleWhereToGoSections = WHERE_TO_GO_SECTIONS.filter((s) => {
		if (removedWhereToGoSectionKeys.includes(s.key)) return false;
		if (readOnly) {
			const rows = sections[s.key] ?? [];
			return rows.some((r) => (r.text || "").trim() || (r.link || "").trim());
		}
		return true;
	});

	if (readOnly && visibleWhereToGoSections.length === 0) return null;

	return (
		<div ref={rowlistRootRef} className={styles.whereToGoBlockWrap} data-block-id={block.id}>
			<div className={styles.whereToGoBlock}>
				<div className={styles.whereToGoTitleRow}>
					<h3 className={`title_2 ${styles.whereToGoTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Заметки куда сходить
					</h3>
					{!readOnly && (
					<div className={styles.textBlockToolbar}>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Поднять блок выше"
							disabled={!canMoveUp}
							onClick={(e) => { e.preventDefault(); canMoveUp && onMoveUp?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/ArrowUp.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Опустить блок ниже"
							disabled={!canMoveDown}
							onClick={(e) => { e.preventDefault(); canMoveDown && onMoveDown?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/ArrowDown.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Удалить блок"
							onClick={(e) => { e.preventDefault(); onRemove?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/Cross.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
					</div>
					)}
				</div>
				<div className={styles.whereToGoBody}>
					{visibleWhereToGoSections.map(({ key, title, placeholder }) => {
						const rows = sections[key] ?? [{ text: "", link: "" }];
						const canRemove = rows.length >= 2;
						return (
							<div key={key} className={styles.whereToGoSection}>
								<div className={styles.whereToGoSectionTitleRow}>
									<h4 className={`subtitle_1 ${styles.whereToGoSectionTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
										{title}
									</h4>
									{!readOnly && (
										<button
											type="button"
											className={styles.whereToGoSectionDeleteBtn}
											aria-label={`Удалить секцию «${title}»`}
											onClick={(e) => {
												e.preventDefault();
												removeWhereToGoSection(key);
											}}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src="/icons/system/Cross.svg" alt="" width={16} height={16} />
										</button>
									)}
								</div>
								<div className={styles.whereToGoSectionRows} data-rowlist-section-body data-rowlist-section-key={key}>
									{rows.map((row, ri) => {
										const d = rowlistDragVisual;
										const inDragSection = d?.sectionKey === key;
										const from = inDragSection ? (d?.fromIndex ?? -1) : -1;
										const over = inDragSection ? (d?.overIndex ?? -1) : -1;
										const slot = inDragSection ? (d?.slotPx ?? 0) : 0;
										return (
									<WhereToGoSectionRow
										key={ri}
										rowId={`${block.id}-${key}-${ri}`}
										rowIndex={ri}
										sectionKey={key}
										row={row}
										placeholder={placeholder}
										onUpdate={(u) => updateRow(key, ri, u)}
										onRemove={() => removeRow(key, ri)}
										canRemove={canRemove}
										onRowlistDragHandlePointerDown={onRowlistDragHandlePointerDown}
										onRowlistDragHandlePointerMove={onRowlistDragHandlePointerMove}
										onRowlistDragHandlePointerUp={onRowlistDragHandlePointerUp}
										onRowlistDragHandlePointerCancel={onRowlistDragHandlePointerCancel}
										rowlistDragShiftPx={budgetRowSiblingShiftPx(ri, from, over, slot)}
										rowlistIsDragSource={d != null && d.sectionKey === key && d.fromIndex === ri}
										rowlistIsDropTarget={d != null && d.sectionKey === key && d.fromIndex !== d.overIndex && d.overIndex === ri}
										rowlistShiftTransition={d != null && d.sectionKey === key}
										readOnly={readOnly}
									/>
										);
									})}
								</div>
								{!readOnly && (
									<ButtonCard
										text="Добавить пункт..."
										icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
										hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
										onClick={() => addRow(key)}
										disabled={!canAddWhereToGoRow(rows)}
									/>
								)}
							</div>
						);
					})}
					{rowlistDragVisual &&
						(sections[rowlistDragVisual.sectionKey] ?? [])[rowlistDragVisual.fromIndex] != null && (
						<WhereToGoDragFloatRow
							top={rowlistDragVisual.floatTop}
							left={rowlistDragVisual.floatLeft}
							width={rowlistDragVisual.floatWidth}
							rowIndex={rowlistDragVisual.fromIndex}
							row={(sections[rowlistDragVisual.sectionKey] ?? [])[rowlistDragVisual.fromIndex]}
						/>
					)}
					{!readOnly && removedWhereToGoSectionKeys.length > 0 && (
						<div className={`${styles.whereToGoSection} ${styles.usefulContactsAddSections}`}>
							{WHERE_TO_GO_SECTIONS.filter((s) => removedWhereToGoSectionKeys.includes(s.key)).map((init) => (
								<ButtonCard
									key={init.key}
									text={`Добавить "${init.title}"`}
									icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
									hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
									onClick={() => restoreWhereToGoSection(init.key)}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

const getUsefulContactsSections = (block) => {
	const sections = block.sections ?? {
		accommodation: [{ text: "", link: "" }],
		embassy: [{ text: "", link: "" }],
		guide: [{ text: "", link: "" }],
	};
	const addedOrder = block.addedSectionOrder ?? [];
	const removedInitialSectionKeys = block.removedInitialSectionKeys ?? [];
	return { sections, addedOrder, removedInitialSectionKeys };
};

const UsefulContactsBlockCard = memo(function UsefulContactsBlockCard({
	block,
	index,
	totalCount,
	updateContentBlock,
	moveContentBlockUp,
	moveContentBlockDown,
	onRequestRemoveContentBlock,
	readOnly = false,
}) {
	const canMoveUp = index > 0;
	const canMoveDown = index < totalCount - 1;
	const { sections, addedOrder, removedInitialSectionKeys } = getUsefulContactsSections(block);

	const onUpdate = useCallback((updates) => updateContentBlock(index, updates), [updateContentBlock, index]);
	const onMoveUp = useCallback(() => moveContentBlockUp(index), [moveContentBlockUp, index]);
	const onMoveDown = useCallback(() => moveContentBlockDown(index), [moveContentBlockDown, index]);
	const onRemove = useCallback(() => onRequestRemoveContentBlock(index, block.type), [onRequestRemoveContentBlock, index, block.type]);

	const updateSection = useCallback(
		(sectionKey, rows) => {
			onUpdate({ sections: { ...sections, [sectionKey]: rows } });
		},
		[onUpdate, sections]
	);

	const addRow = useCallback(
		(sectionKey) => {
			const rows = sections[sectionKey] ?? [{ text: "", link: "" }];
			if (!canAddWhereToGoRow(rows)) return;
			updateSection(sectionKey, [...rows, { text: "", link: "" }]);
		},
		[sections, updateSection]
	);

	const removeRow = useCallback(
		(sectionKey, rowIndex) => {
			const rows = sections[sectionKey] ?? [];
			if (rows.length <= 1) return;
			updateSection(
				sectionKey,
				rows.filter((_, i) => i !== rowIndex)
			);
		},
		[sections, updateSection]
	);

	const updateRow = useCallback(
		(sectionKey, rowIndex, updates) => {
			const rows = [...(sections[sectionKey] ?? [])];
			rows[rowIndex] = { ...rows[rowIndex], ...updates };
			updateSection(sectionKey, rows);
		},
		[sections, updateSection]
	);

	const addSection = useCallback(
		(sectionKey) => {
			if (addedOrder.includes(sectionKey)) return;
			onUpdate({
				addedSectionOrder: [...addedOrder, sectionKey],
				sections: { ...sections, [sectionKey]: [{ text: "", link: "" }] },
			});
		},
		[onUpdate, addedOrder, sections]
	);

	const restoreInitialSection = useCallback(
		(sectionKey) => {
			onUpdate({
				removedInitialSectionKeys: removedInitialSectionKeys.filter((k) => k !== sectionKey),
				sections: { ...sections, [sectionKey]: [{ text: "", link: "" }] },
			});
		},
		[onUpdate, sections, removedInitialSectionKeys]
	);

	const removeSection = useCallback(
		(sectionKey) => {
			const nextSections = { ...sections };
			delete nextSections[sectionKey];
			if (addedOrder.includes(sectionKey)) {
				onUpdate({
					addedSectionOrder: addedOrder.filter((k) => k !== sectionKey),
					sections: nextSections,
				});
			} else {
				const removed = new Set(removedInitialSectionKeys);
				removed.add(sectionKey);
				onUpdate({
					removedInitialSectionKeys: [...removed],
					sections: nextSections,
				});
			}
		},
		[onUpdate, sections, addedOrder, removedInitialSectionKeys]
	);

	const initialSectionList = USEFUL_CONTACTS_INITIAL_SECTIONS.filter(
		(s) => !removedInitialSectionKeys.includes(s.key)
	).map(({ key, title, placeholder }) => ({
		key,
		title,
		placeholder,
	}));
	const addedSectionList = addedOrder
		.map((key) => {
			const def = USEFUL_CONTACTS_ADDABLE_SECTIONS.find((s) => s.key === key);
			return def ? { ...def, placeholder: "Пункт" } : null;
		})
		.filter(Boolean);
	const allSections = [...initialSectionList, ...addedSectionList];
	const displayedSections =
		readOnly
			? allSections.filter(({ key }) =>
					(sections[key] ?? []).some((r) => (r.text || "").trim() || (r.link || "").trim())
				)
			: allSections;

	const rowlistRootRef = useRef(null);
	const sectionsRefForRowReorder = useRef(sections);
	sectionsRefForRowReorder.current = sections;

	const reorderRowInSection = useCallback(
		(sectionKey, fromIndex, toIndex) => {
			if (!sectionKey || fromIndex === toIndex) return;
			const current = sectionsRefForRowReorder.current[sectionKey] ?? [];
			const len = current.length;
			if (fromIndex < 0 || fromIndex >= len || toIndex < 0 || toIndex >= len) return;
			const next = [...current];
			const [removed] = next.splice(fromIndex, 1);
			next.splice(toIndex, 0, removed);
			updateSection(sectionKey, next);
		},
		[updateSection]
	);

	const {
		rowlistDragVisual,
		onRowlistDragHandlePointerDown,
		onRowlistDragHandlePointerMove,
		onRowlistDragHandlePointerUp,
		onRowlistDragHandlePointerCancel,
	} = useSectionedRowListDrag({
		readOnly,
		rootRef: rowlistRootRef,
		reorderInSection: reorderRowInSection,
	});

	if (readOnly && displayedSections.length === 0) return null;

	return (
		<div ref={rowlistRootRef} className={styles.whereToGoBlockWrap} data-block-id={block.id}>
			<div className={styles.whereToGoBlock}>
				<div className={styles.whereToGoTitleRow}>
					<h3 className={`title_2 ${styles.whereToGoTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Полезные контакты
					</h3>
					{!readOnly && (
					<div className={styles.textBlockToolbar}>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Поднять блок выше"
							disabled={!canMoveUp}
							onClick={(e) => { e.preventDefault(); canMoveUp && onMoveUp?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/ArrowUp.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Опустить блок ниже"
							disabled={!canMoveDown}
							onClick={(e) => { e.preventDefault(); canMoveDown && onMoveDown?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/ArrowDown.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Удалить блок"
							onClick={(e) => { e.preventDefault(); onRemove?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/Cross.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
					</div>
					)}
				</div>
				<div className={styles.whereToGoBody}>
					{displayedSections.map(({ key, title, placeholder }) => {
						const rows = sections[key] ?? [{ text: "", link: "" }];
						const canRemove = rows.length >= 2;
						return (
							<div key={key} className={styles.whereToGoSection}>
								<div className={styles.whereToGoSectionTitleRow}>
									<h4 className={`subtitle_1 ${styles.whereToGoSectionTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
										{title}
									</h4>
									{!readOnly && (
										<button
											type="button"
											className={styles.whereToGoSectionDeleteBtn}
											aria-label={`Удалить секцию «${title}»`}
											onClick={(e) => {
												e.preventDefault();
												removeSection(key);
											}}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src="/icons/system/Cross.svg" alt="" width={16} height={16} />
										</button>
									)}
								</div>
								<div className={styles.whereToGoSectionRows} data-rowlist-section-body data-rowlist-section-key={key}>
									{rows.map((row, ri) => {
										const d = rowlistDragVisual;
										const inDragSection = d?.sectionKey === key;
										const from = inDragSection ? (d?.fromIndex ?? -1) : -1;
										const over = inDragSection ? (d?.overIndex ?? -1) : -1;
										const slot = inDragSection ? (d?.slotPx ?? 0) : 0;
										return (
									<WhereToGoSectionRow
										key={ri}
										rowId={`${block.id}-${key}-${ri}`}
										rowIndex={ri}
										sectionKey={key}
										row={row}
										placeholder={placeholder}
										onUpdate={(u) => updateRow(key, ri, u)}
										onRemove={() => removeRow(key, ri)}
										canRemove={canRemove}
										onRowlistDragHandlePointerDown={onRowlistDragHandlePointerDown}
										onRowlistDragHandlePointerMove={onRowlistDragHandlePointerMove}
										onRowlistDragHandlePointerUp={onRowlistDragHandlePointerUp}
										onRowlistDragHandlePointerCancel={onRowlistDragHandlePointerCancel}
										rowlistDragShiftPx={budgetRowSiblingShiftPx(ri, from, over, slot)}
										rowlistIsDragSource={d != null && d.sectionKey === key && d.fromIndex === ri}
										rowlistIsDropTarget={d != null && d.sectionKey === key && d.fromIndex !== d.overIndex && d.overIndex === ri}
										rowlistShiftTransition={d != null && d.sectionKey === key}
										readOnly={readOnly}
									/>
										);
									})}
								</div>
								{!readOnly && (
									<ButtonCard
										text="Добавить пункт..."
										icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
										hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
										onClick={() => addRow(key)}
										disabled={!canAddWhereToGoRow(rows)}
									/>
								)}
							</div>
						);
					})}
					{rowlistDragVisual &&
						(sections[rowlistDragVisual.sectionKey] ?? [])[rowlistDragVisual.fromIndex] != null && (
						<WhereToGoDragFloatRow
							top={rowlistDragVisual.floatTop}
							left={rowlistDragVisual.floatLeft}
							width={rowlistDragVisual.floatWidth}
							rowIndex={rowlistDragVisual.fromIndex}
							row={(sections[rowlistDragVisual.sectionKey] ?? [])[rowlistDragVisual.fromIndex]}
						/>
					)}
					{!readOnly &&
						(USEFUL_CONTACTS_ADDABLE_SECTIONS.some((s) => !addedOrder.includes(s.key)) ||
							removedInitialSectionKeys.length > 0) && (
						<div className={`${styles.whereToGoSection} ${styles.usefulContactsAddSections}`}>
							{USEFUL_CONTACTS_INITIAL_SECTIONS.filter((s) => removedInitialSectionKeys.includes(s.key)).map((init) => (
								<ButtonCard
									key={init.key}
									text={`Добавить "${init.title}"`}
									icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
									hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
									onClick={() => restoreInitialSection(init.key)}
								/>
							))}
							{USEFUL_CONTACTS_ADDABLE_SECTIONS.filter((s) => !addedOrder.includes(s.key)).map((addable) => (
								<ButtonCard
									key={addable.key}
									text={`Добавить "${addable.title}"`}
									icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
									hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
									onClick={() => addSection(addable.key)}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

const parseBudgetNumber = (v) => {
	const n = parseFloat(String(v || "").replace(",", "."));
	return Number.isFinite(n) ? n : 0;
};

const onlyNumericValue = (v) => {
	const s = String(v ?? "").replace(",", ".");
	const hasMinus = s.startsWith("-");
	const parts = s.replace("-", "").split(".");
	const intPart = (parts[0] ?? "").replace(/\D/g, "");
	const decPart = parts.length > 1 ? (parts[1] ?? "").replace(/\D/g, "").slice(0, 2) : "";
	if (parts.length > 2) return hasMinus ? `-${intPart}.${decPart}` : `${intPart}.${decPart}`;
	if (decPart === "") return hasMinus ? `-${intPart}` : intPart;
	return hasMinus ? `-${intPart}.${decPart}` : `${intPart}.${decPart}`;
};

function computeBudgetDropIndex(clientY, containerEl) {
	return computeIndexedRowDropIndex(clientY, containerEl, "data-budget-row-index");
}

function budgetRowSiblingShiftPx(rowIndex, from, over, slotPx) {
	if (from < 0 || over < 0 || !(slotPx > 0)) return 0;
	if (rowIndex === from) return 0;
	if (from < over) {
		if (rowIndex > from && rowIndex <= over) return -slotPx;
	} else if (from > over) {
		if (rowIndex >= over && rowIndex < from) return slotPx;
	}
	return 0;
}

const BudgetTableDragFloatRow = memo(function BudgetTableDragFloatRow({ top, left, width, row }) {
	if (typeof document === "undefined") return null;
	return createPortal(
		<div className={styles.budgetTableRowFloatRoot} style={{ top, left, width }}>
			<div className={styles.budgetTableRowFloatInner}>
				<div className={styles.budgetTableRow}>
					<div className={styles.budgetTableRowDragHandle} aria-hidden>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src="/icons/system/draggableDots.svg" alt="" width={11} height={18} draggable={false} />
					</div>
					<div className={styles.budgetTableCategoryCell}>
						<span className={`paragraph ${styles.budgetTableCategoryInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{row.category?.trim() || "—"}
						</span>
					</div>
					<div className={styles.budgetTableNumberCell}>
						<div className={styles.budgetTableNumberInputWrap}>
							<span className={`subinfo ${styles.budgetTableNumberInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								{row.planned?.trim() || "—"}
							</span>
							<span className={`subinfo ${styles.budgetTableNumberSuffix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>
								₽
							</span>
						</div>
					</div>
					<div className={styles.budgetTableNumberCell}>
						<div className={styles.budgetTableNumberInputWrap}>
							<span className={`subinfo ${styles.budgetTableNumberInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								{row.spent?.trim() || "—"}
							</span>
							<span className={`subinfo ${styles.budgetTableNumberSuffix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>
								₽
							</span>
						</div>
					</div>
					<div className={styles.budgetTableRowDeleteCell} aria-hidden />
				</div>
			</div>
		</div>,
		document.body
	);
});

const BudgetTableRow = memo(function BudgetTableRow({
	row,
	rowIndex,
	rowsCount,
	blockIndex,
	onUpdate,
	onBudgetDragHandlePointerDown,
	onBudgetDragHandlePointerMove,
	onBudgetDragHandlePointerUp,
	onBudgetDragHandlePointerCancel,
	budgetRowDragShiftPx = 0,
	budgetRowIsDragSource = false,
	budgetRowIsDropTarget = false,
	budgetRowShiftTransition = false,
	openDeleteRowConfirm,
	readOnly = false,
}) {
	const handleUpdate = useCallback((updates) => onUpdate(rowIndex, updates), [onUpdate, rowIndex]);
	const onRequestRemove = useCallback(
		() => openDeleteRowConfirm?.(blockIndex, rowIndex),
		[openDeleteRowConfirm, blockIndex, rowIndex]
	);
	const [rowHover, setRowHover] = useState(false);
	const canRemove = rowsCount > 1;
	const showDelete = canRemove && rowHover && !readOnly;

	const handleCategoryChange = useCallback((e) => handleUpdate({ category: e.target.value }), [handleUpdate]);
	const handlePlannedChange = useCallback(
		(e) => handleUpdate({ planned: onlyNumericValue(e.target.value) }),
		[handleUpdate]
	);
	const handleSpentChange = useCallback(
		(e) => handleUpdate({ spent: onlyNumericValue(e.target.value) }),
		[handleUpdate]
	);
	const handleBudgetDragPointerDown = useCallback(
		(e) => onBudgetDragHandlePointerDown?.(rowIndex, e),
		[onBudgetDragHandlePointerDown, rowIndex]
	);
	if (readOnly) {
		return (
			<div
				className={`${styles.budgetTableRow} ${budgetRowShiftTransition ? styles.budgetTableRowShiftable : ""} ${budgetRowIsDropTarget ? styles.budgetTableRowDropTarget : ""}`}
				data-budget-row-index={rowIndex}
				style={{
					...(budgetRowDragShiftPx !== 0 ? { transform: `translateY(${budgetRowDragShiftPx}px)` } : {}),
					visibility: budgetRowIsDragSource ? "hidden" : undefined,
					pointerEvents: budgetRowIsDragSource ? "none" : undefined,
				}}
			>
				<div className={styles.budgetTableRowLeadSpacer} aria-hidden />
				<div className={styles.budgetTableCategoryCell}>
					<span className={`paragraph ${styles.budgetTableCategoryInput} ${styles.budgetTableReadOnlyText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						{row.category?.trim() || "—"}
					</span>
				</div>
				<div className={styles.budgetTableNumberCell}>
					<div className={styles.budgetTableNumberInputWrap}>
						<span className={`subinfo ${styles.budgetTableNumberInput} ${styles.budgetTableReadOnlyText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{row.planned?.trim() || "—"}
						</span>
						<span className={`subinfo ${styles.budgetTableNumberSuffix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>₽</span>
					</div>
				</div>
				<div className={styles.budgetTableNumberCell}>
					<div className={styles.budgetTableNumberInputWrap}>
						<span className={`subinfo ${styles.budgetTableNumberInput} ${styles.budgetTableReadOnlyText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{row.spent?.trim() || "—"}
						</span>
						<span className={`subinfo ${styles.budgetTableNumberSuffix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>₽</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`${styles.budgetTableRow} ${budgetRowShiftTransition ? styles.budgetTableRowShiftable : ""} ${budgetRowIsDropTarget ? styles.budgetTableRowDropTarget : ""}`}
			data-budget-row-index={rowIndex}
			onMouseEnter={() => setRowHover(true)}
			onMouseLeave={() => setRowHover(false)}
			style={{
				...(budgetRowDragShiftPx !== 0 ? { transform: `translateY(${budgetRowDragShiftPx}px)` } : {}),
				visibility: budgetRowIsDragSource ? "hidden" : undefined,
				pointerEvents: budgetRowIsDragSource ? "none" : undefined,
			}}
		>
			<div
				className={styles.budgetTableRowDragHandle}
				role="button"
				tabIndex={-1}
				aria-label="Изменить порядок строки"
				onPointerDown={handleBudgetDragPointerDown}
				onPointerMove={onBudgetDragHandlePointerMove}
				onPointerUp={onBudgetDragHandlePointerUp}
				onPointerCancel={onBudgetDragHandlePointerCancel}
				onMouseDown={(e) => e.stopPropagation()}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/icons/system/draggableDots.svg" alt="" width={11} height={18} draggable={false} />
			</div>
			<div className={styles.budgetTableCategoryCell}>
				<div className={styles.budgetTableCategoryInputWrap}>
					<input
						type="text"
						className={`paragraph ${styles.budgetTableCategoryInput}`}
						style={{ color: "var(--grayscale-dark-gray)" }}
						placeholder="Введите..."
						value={row.category ?? ""}
						onChange={handleCategoryChange}
						aria-label="Категория"
					/>
				</div>
			</div>
			<div className={styles.budgetTableNumberCell}>
				<div className={styles.budgetTableNumberInputWrap}>
					<input
						type="text"
						inputMode="decimal"
						className={`subinfo ${styles.budgetTableNumberInput}`}
						style={{ color: "var(--grayscale-dark-gray)" }}
						placeholder="0"
						value={row.planned ?? ""}
						onChange={handlePlannedChange}
						aria-label="Планирую"
					/>
					<span className={`subinfo ${styles.budgetTableNumberSuffix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>₽</span>
				</div>
			</div>
			<div className={styles.budgetTableNumberCell}>
				<div className={styles.budgetTableNumberInputWrap}>
					<input
						type="text"
						inputMode="decimal"
						className={`subinfo ${styles.budgetTableNumberInput}`}
						style={{ color: "var(--grayscale-dark-gray)" }}
						placeholder="0"
						value={row.spent ?? ""}
						onChange={handleSpentChange}
						aria-label="Потратил"
					/>
					<span className={`subinfo ${styles.budgetTableNumberSuffix}`} style={{ color: "var(--grayscale-dark-gray)" }} aria-hidden>₽</span>
				</div>
			</div>
			<div className={`${styles.budgetTableRowDeleteCell} ${showDelete ? styles.budgetTableRowDeleteCellVisible : ""}`}>
				{showDelete && (
					<RoundButton
						variant="white"
						icon={/* eslint-disable-next-line @next/next/no-img-element */ <img src="/icons/system/Cross.svg" alt="" width={20} height={20} />}
						aria-label="Удалить ряд"
						onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRequestRemove(); }}
					/>
				)}
			</div>
		</div>
	);
});

const BudgetTableBlockCard = memo(function BudgetTableBlockCard({
	block,
	index,
	totalCount,
	updateContentBlock,
	moveContentBlockUp,
	moveContentBlockDown,
	onRequestRemoveContentBlock,
	openDeleteRowConfirm,
	readOnly = false,
}) {
	const canMoveUp = index > 0;
	const canMoveDown = index < totalCount - 1;
	const rows = block.rows ?? [...BUDGET_DEFAULT_ROWS];
	const rowsRef = useRef(rows);
	rowsRef.current = rows;

	const onUpdate = useCallback((updates) => updateContentBlock(index, updates), [updateContentBlock, index]);
	const onMoveUp = useCallback(() => moveContentBlockUp(index), [moveContentBlockUp, index]);
	const onMoveDown = useCallback(() => moveContentBlockDown(index), [moveContentBlockDown, index]);
	const onRemove = useCallback(() => onRequestRemoveContentBlock(index, block.type), [onRequestRemoveContentBlock, index, block.type]);

	const updateRow = useCallback(
		(rowIndex, updates) => {
			const currentRows = rowsRef.current;
			const next = [...currentRows];
			next[rowIndex] = { ...next[rowIndex], ...updates };
			onUpdate({ rows: next });
		},
		[onUpdate]
	);

	const addRow = useCallback(() => {
		const next = [...rows, { category: "", planned: "", spent: "" }];
		onUpdate({ rows: next });
	}, [rows, onUpdate]);

	const removeRow = useCallback(
		(rowIndex) => {
			if (rows.length <= 1) return;
			const next = rows.filter((_, i) => i !== rowIndex);
			onUpdate({ rows: next });
		},
		[rows, onUpdate]
	);

	const reorderRows = useCallback(
		(fromIndex, toIndex) => {
			if (fromIndex === toIndex) return;
			const currentRows = rowsRef.current;
			const len = currentRows.length;
			if (fromIndex < 0 || fromIndex >= len || toIndex < 0 || toIndex >= len) return;
			const next = [...currentRows];
			const [removed] = next.splice(fromIndex, 1);
			next.splice(toIndex, 0, removed);
			onUpdate({ rows: next });
		},
		[onUpdate]
	);

	const [budgetRowDragVisual, setBudgetRowDragVisual] = useState(null);
	const budgetRowsContainerRef = useRef(null);
	const budgetRowDragFromRef = useRef(null);
	const budgetRowDragUserSelectRef = useRef(null);
	const budgetDragRafRef = useRef(null);
	const budgetDragPendingRef = useRef(null);

	useEffect(
		() => () => {
			if (budgetDragRafRef.current != null) cancelAnimationFrame(budgetDragRafRef.current);
		},
		[]
	);

	const onBudgetDragHandlePointerDown = useCallback(
		(rowIndex, e) => {
			if (readOnly || e.button !== 0) return;
			e.preventDefault();
			e.stopPropagation();
			const rowEl = e.currentTarget.closest("[data-budget-row-index]");
			if (!rowEl || !budgetRowsContainerRef.current) return;
			const rect = rowEl.getBoundingClientRect();
			const grabOffsetY = e.clientY - rect.top;
			let slotPx = rect.height + 20;
			const nextEl = rowEl.nextElementSibling;
			if (nextEl?.hasAttribute?.("data-budget-row-index")) {
				slotPx = Math.max(1, nextEl.getBoundingClientRect().top - rect.top);
			}
			budgetRowDragFromRef.current = rowIndex;
			budgetRowDragUserSelectRef.current = document.body.style.userSelect;
			document.body.style.userSelect = "none";
			setBudgetRowDragVisual({
				fromIndex: rowIndex,
				overIndex: rowIndex,
				floatTop: e.clientY - grabOffsetY,
				floatLeft: rect.left,
				floatWidth: rect.width,
				grabOffsetY,
				slotPx,
			});
			try {
				e.currentTarget.setPointerCapture(e.pointerId);
			} catch {
				/* setPointerCapture may throw if target detached */
			}
		},
		[readOnly]
	);
	const onBudgetDragHandlePointerMove = useCallback((e) => {
		if (budgetRowDragFromRef.current === null) return;
		e.preventDefault();
		budgetDragPendingRef.current = { clientY: e.clientY };
		if (budgetDragRafRef.current != null) return;
		budgetDragRafRef.current = requestAnimationFrame(() => {
			budgetDragRafRef.current = null;
			const p = budgetDragPendingRef.current;
			if (!p || budgetRowDragFromRef.current === null) return;
			const container = budgetRowsContainerRef.current;
			const over = container ? computeBudgetDropIndex(p.clientY, container) : budgetRowDragFromRef.current;
			setBudgetRowDragVisual((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					overIndex: over,
					floatTop: p.clientY - prev.grabOffsetY,
				};
			});
		});
	}, []);
	const onBudgetDragHandlePointerUp = useCallback(
		(e) => {
			document.body.style.userSelect = budgetRowDragUserSelectRef.current ?? "";
			budgetRowDragUserSelectRef.current = null;
			if (budgetDragRafRef.current != null) {
				cancelAnimationFrame(budgetDragRafRef.current);
				budgetDragRafRef.current = null;
			}
			budgetDragPendingRef.current = null;
			if (budgetRowDragFromRef.current === null) return;
			const from = budgetRowDragFromRef.current;
			budgetRowDragFromRef.current = null;
			try {
				e.currentTarget.releasePointerCapture(e.pointerId);
			} catch {
				/* ignore */
			}
			setBudgetRowDragVisual(null);
			const container = budgetRowsContainerRef.current;
			const to = container ? computeBudgetDropIndex(e.clientY, container) : from;
			reorderRows(from, to);
		},
		[reorderRows]
	);
	const onBudgetDragHandlePointerCancel = useCallback((e) => {
		document.body.style.userSelect = budgetRowDragUserSelectRef.current ?? "";
		budgetRowDragUserSelectRef.current = null;
		budgetRowDragFromRef.current = null;
		if (budgetDragRafRef.current != null) {
			cancelAnimationFrame(budgetDragRafRef.current);
			budgetDragRafRef.current = null;
		}
		budgetDragPendingRef.current = null;
		setBudgetRowDragVisual(null);
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch {
			/* ignore */
		}
	}, []);

	const totalPlanned = useMemo(() => rows.reduce((s, r) => s + parseBudgetNumber(r.planned), 0), [rows]);
	const totalSpent = useMemo(() => rows.reduce((s, r) => s + parseBudgetNumber(r.spent), 0), [rows]);

	const formatSum = (n) => (Number.isFinite(n) ? n.toLocaleString("ru-RU") : "0") + " ₽";

	return (
		<div className={styles.budgetTableWrap} data-block-id={block.id}>
			<div className={styles.budgetTable}>
				<div className={styles.whereToGoTitleRow}>
					<h3 className={`title_2 ${styles.whereToGoTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Таблица бюджета
					</h3>
					{!readOnly && (
					<div className={styles.textBlockToolbar}>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Поднять блок выше"
							disabled={!canMoveUp}
							onClick={(e) => { e.preventDefault(); canMoveUp && onMoveUp?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/ArrowUp.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Опустить блок ниже"
							disabled={!canMoveDown}
							onClick={(e) => { e.preventDefault(); canMoveDown && onMoveDown?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/ArrowDown.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
						<button
							type="button"
							className={styles.textBlockToolbarBtn}
							aria-label="Удалить блок"
							onClick={(e) => { e.preventDefault(); onRemove?.(); }}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/icons/system/Cross.svg" alt="" width={20} height={20} className={styles.textBlockToolbarIcon} />
						</button>
					</div>
					)}
				</div>
				<div className={styles.budgetTableHeaderRow}>
					<div className={styles.budgetTableHeaderLead} aria-hidden />
					<div className={styles.budgetTableHeaderCell}>Категория</div>
					<div className={styles.budgetTableHeaderCell}>Планирую</div>
					<div className={styles.budgetTableHeaderCell}>Потратил</div>
				</div>
				<div ref={budgetRowsContainerRef} className={styles.budgetTableRows}>
					{rows.map((row, ri) => {
						const d = budgetRowDragVisual;
						const from = d?.fromIndex ?? -1;
						const over = d?.overIndex ?? -1;
						const slot = d?.slotPx ?? 0;
						return (
					<BudgetTableRow
						key={ri}
						row={row}
						rowIndex={ri}
						rowsCount={rows.length}
						blockIndex={index}
						onUpdate={updateRow}
						onBudgetDragHandlePointerDown={onBudgetDragHandlePointerDown}
						onBudgetDragHandlePointerMove={onBudgetDragHandlePointerMove}
						onBudgetDragHandlePointerUp={onBudgetDragHandlePointerUp}
						onBudgetDragHandlePointerCancel={onBudgetDragHandlePointerCancel}
						budgetRowDragShiftPx={budgetRowSiblingShiftPx(ri, from, over, slot)}
						budgetRowIsDragSource={d != null && d.fromIndex === ri}
						budgetRowIsDropTarget={d != null && d.fromIndex !== d.overIndex && d.overIndex === ri}
						budgetRowShiftTransition={d != null}
						openDeleteRowConfirm={openDeleteRowConfirm}
						readOnly={readOnly}
					/>
						);
					})}
				</div>
				{budgetRowDragVisual && rows[budgetRowDragVisual.fromIndex] != null && (
					<BudgetTableDragFloatRow
						top={budgetRowDragVisual.floatTop}
						left={budgetRowDragVisual.floatLeft}
						width={budgetRowDragVisual.floatWidth}
						row={rows[budgetRowDragVisual.fromIndex]}
					/>
				)}
				{!readOnly && (
				<ButtonCard
					text="Добавить пункт..."
					icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
					hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
					onClick={addRow}
				/>
				)}
				<div className={styles.budgetTableTotalRow}>
					<div className={styles.budgetTableTotalLead} aria-hidden />
					<div className={`subtitle_1 ${styles.budgetTableTotalLabel}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Итого
					</div>
					<div className={`subtitle_1 ${styles.budgetTableTotalValue}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						{formatSum(totalPlanned)}
					</div>
					<div className={`subtitle_1 ${styles.budgetTableTotalValue}`} style={{ color: "var(--accent-blue)" }}>
						{formatSum(totalSpent)}
					</div>
				</div>
			</div>
		</div>
	);
});

const SUGGESTION_LINKS = [
	{ key: "whereToGo", label: "Заметки куда сходить" },
	{ key: "usefulContacts", label: "Полезные контакты" },
	{ key: "budgetTable", label: "Таблица бюджета" },
];

const RightColumnSection = memo(function RightColumnSection({
	showPlatformNote,
	setShowPlatformNote,
	platformNoteText,
	contentBlocks,
	updateContentBlock,
	moveContentBlockUp,
	moveContentBlockDown,
	onRequestRemoveContentBlock,
	onRequestRemoveBudgetRow,
	personalNotesItems,
	updatePersonalNoteItem,
	addPersonalNoteItem,
	removePersonalNoteItem,
	canAddWhereToGoBlock,
	canAddUsefulContactsBlock,
	canAddBudgetTableBlock,
	onAddWhereToGoBlock,
	onAddUsefulContactsBlock,
	onAddBudgetTableBlock,
	suggestionLinksExiting,
	readOnly = false,
	isOwner = true,
	isPreview = false,
}) {
	const canShowDeleteOnEmpty =
		personalNotesItems.length >= 2 ||
		personalNotesItems.some((item) => (item.text || "").trim() !== "");

	const canShow = (key) => {
		if (key === "whereToGo") return canAddWhereToGoBlock || suggestionLinksExiting.has("whereToGo");
		if (key === "usefulContacts") return canAddUsefulContactsBlock || suggestionLinksExiting.has("usefulContacts");
		if (key === "budgetTable") return canAddBudgetTableBlock || suggestionLinksExiting.has("budgetTable");
		return false;
	};
	const isExiting = (key) => suggestionLinksExiting.has(key);
	const handleSuggestionClick = (key) => {
		if (key === "whereToGo" && canAddWhereToGoBlock) onAddWhereToGoBlock?.();
		if (key === "usefulContacts" && canAddUsefulContactsBlock) onAddUsefulContactsBlock?.();
		if (key === "budgetTable" && canAddBudgetTableBlock) onAddBudgetTableBlock?.();
	};

	const hasAnySuggestionLink = SUGGESTION_LINKS.some(({ key }) => canShow(key));
	const showSuggestionsBlock = hasAnySuggestionLink;

	return (
		<div className={styles.rightColumn}>
			{!isPreview && (
			<div className={`${styles.platformNote} ${!showPlatformNote ? styles.platformNoteHidden : ""}`}>
				<div className={styles.platformNoteHeader}>
					<div className={styles.platformNoteTitleRow}>
						<Image src="/icons/images/Lightbulb.svg" alt="" width={24} height={24} className={styles.icon24} />
						<h3 className={`title_2 ${styles.platformNoteTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							Совет платформы
						</h3>
					</div>
					{!readOnly && (
						<button type="button" className={styles.platformNoteClose} aria-label="Скрыть совет" onClick={() => setShowPlatformNote(false)}>
							<svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
								<path d="M15.3033 4.6967L4.6967 15.3033M15.3033 15.3033L4.6967 4.6967" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					)}
				</div>
				<div className={styles.platformNoteBody}>
					<div className={`paragraph ${styles.platformNoteText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						{platformNoteText}
					</div>
					{showSuggestionsBlock && !readOnly && (
						<div className={styles.platformNoteSuggestions}>
							<p className={`paragraph ${styles.platformNoteSuggestionsTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								Добавьте эти блоки:
							</p>
							<div className={`paragraph ${styles.platformNoteSuggestionsList}`} style={{ color: "var(--accent-blue)" }}>
								{SUGGESTION_LINKS.map(({ key, label }) =>
									canShow(key) ? (
										<button
											key={key}
											type="button"
											className={`${styles.platformNoteSuggestionLink} ${isExiting(key) ? styles.platformNoteSuggestionLinkExiting : ""}`}
											onClick={() => handleSuggestionClick(key)}
											disabled={isExiting(key)}
										>
											+ {label}
										</button>
									) : null
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			)}
			{/* Личные заметки видны только создателю; при просмотре чужого чекплана блок скрыт */}
			{(!readOnly || isOwner) && (
			<div className={styles.notesCard}>
				<div className={styles.notesTitleRow}>
					<Image src="/icons/images/Star.svg" alt="" width={24} height={24} className={styles.icon24} />
					<h3 className={`title_2 ${styles.notesTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Личные заметки
					</h3>
				</div>
				<div className={styles.notesItemsWrap}>
					{personalNotesItems.map((item, i) => {
						const isEmpty = !(item.text || "").trim();
						const showDelete = !readOnly && canShowDeleteOnEmpty && isEmpty;
						return (
							<div key={i} className={styles.notesItemWrap}>
								<div className={styles.notesItemRow}>
									{readOnly ? (
										<span className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>{item.text || "—"}</span>
									) : (
										<DecoratedInput
											decorator="bullet"
											placeholder="Введите текст..."
											value={item.text}
											onChange={(e) => updatePersonalNoteItem(i, { text: e.target.value })}
										/>
									)}
									{showDelete && (
										<button
											type="button"
											className={styles.notesItemDelete}
											aria-label="Удалить пункт"
											onClick={(e) => { e.preventDefault(); removePersonalNoteItem(i); }}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src="/icons/system/Cross.svg" alt="" width={16} height={16} className={styles.notesItemDeleteIcon} />
										</button>
									)}
								</div>
							</div>
						);
					})}
				</div>
				<div className={styles.bulletList}>
					{PERSONAL_NOTES.map((text, i) => (
						<div key={`fixed-${i}`} className={`paragraph ${styles.bulletItem}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{text}
						</div>
					))}
					{!readOnly && (
						<ButtonCard
							text="Добавить пункт..."
							icon={<img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />}
							hoverIcon={<img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />}
							onClick={addPersonalNoteItem}
							disabled={!canAddItem(personalNotesItems)}
						/>
					)}
				</div>
			</div>
			)}
			{contentBlocks.map((block, i) => {
				if (block.type === "text") {
					return (
						<TextBlockCard
							key={block.id}
							block={block}
							index={i}
							totalCount={contentBlocks.length}
							updateContentBlock={updateContentBlock}
							moveContentBlockUp={moveContentBlockUp}
							moveContentBlockDown={moveContentBlockDown}
							onRequestRemoveContentBlock={onRequestRemoveContentBlock}
							readOnly={readOnly}
						/>
					);
				}
				if (block.type === "whereToGo") {
					return (
						<WhereToGoBlockCard
							key={block.id}
							block={block}
							index={i}
							totalCount={contentBlocks.length}
							updateContentBlock={updateContentBlock}
							moveContentBlockUp={moveContentBlockUp}
							moveContentBlockDown={moveContentBlockDown}
							onRequestRemoveContentBlock={onRequestRemoveContentBlock}
							readOnly={readOnly}
						/>
					);
				}
				if (block.type === "usefulContacts") {
					return (
						<UsefulContactsBlockCard
							key={block.id}
							block={block}
							index={i}
							totalCount={contentBlocks.length}
							updateContentBlock={updateContentBlock}
							moveContentBlockUp={moveContentBlockUp}
							moveContentBlockDown={moveContentBlockDown}
							onRequestRemoveContentBlock={onRequestRemoveContentBlock}
							readOnly={readOnly}
						/>
					);
				}
				if (block.type === "budgetTable") {
					return (
						<BudgetTableBlockCard
							key={block.id}
							block={block}
							index={i}
							totalCount={contentBlocks.length}
							updateContentBlock={updateContentBlock}
							moveContentBlockUp={moveContentBlockUp}
							moveContentBlockDown={moveContentBlockDown}
							onRequestRemoveContentBlock={onRequestRemoveContentBlock}
							openDeleteRowConfirm={onRequestRemoveBudgetRow}
							readOnly={readOnly}
						/>
					);
				}
				return null;
			})}
		</div>
	);
});

const TripImageSection = memo(function TripImageSection({ coverImage, coverLoading, coverError, coverInputRef, onCoverChange, onCoverClick, readOnly = false }) {
	return (
		<div className={styles.tripImageWrap}>
			<div className={styles.coverImageLayer}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={coverImage} alt="Обложка поездки" className={styles.tripImage} />
			</div>
			{coverLoading && (
				<div className={styles.coverLoadingOverlay} aria-live="polite">
					Загрузка…
				</div>
			)}
			{coverError && <span className={styles.coverErrorText}>{coverError}</span>}
			{!readOnly && (
				<div
					className={styles.coverUploadTrigger}
					onClick={onCoverClick}
					onKeyDown={(e) => e.key === "Enter" && onCoverClick()}
					role="button"
					tabIndex={0}
					aria-label="Загрузить обложку"
				>
					<input
						ref={coverInputRef}
						type="file"
						accept="image/*"
						className={styles.coverHiddenInput}
						aria-hidden
						onChange={onCoverChange}
					/>
				</div>
			)}
		</div>
	);
});

const ADD_BLOCK_ITEMS = [
	{ text: "Блок \"Куда сходить\"", icon: "/icons/images/Map.svg" },
	{ text: "Блок \"Таблица Бюджета\"", icon: "/icons/images/List.svg" },
	{ text: "Блок \"Полезные контакты\"", icon: "/icons/images/Messages.svg" },
	{ text: "Текстовый блок", icon: "/icons/images/Text.svg" },
];

const BottomBarSection = memo(function BottomBarSection({
	hasChanges,
	onQuestionClick,
	onAddTextBlock,
	canAddTextBlock,
	onAddWhereToGoBlock,
	canAddWhereToGoBlock,
	onAddUsefulContactsBlock,
	canAddUsefulContactsBlock,
	onAddBudgetTableBlock,
	canAddBudgetTableBlock,
	onSave,
	saveLoading,
	onDuplicatePlan,
	onDeletePlan,
	duplicateInProgress = false,
}) {
	const [addBlockMenuOpen, setAddBlockMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ bottom: 0, left: 0 });
	const [moreMenuOpen, setMoreMenuOpen] = useState(false);
	const [moreMenuPosition, setMoreMenuPosition] = useState({ bottom: 0, left: 0 });
	const toolbarAddWrapRef = useRef(null);
	const triggerButtonRef = useRef(null);
	const moreMenuWrapRef = useRef(null);
	const moreMenuTriggerRef = useRef(null);
	const toolbarRef = useRef(null);
	const anchorRef = useRef(null);
	const isFloatingOnMobile = useMobileFloatingToolbar(anchorRef, toolbarRef);

	const handleAddButtonClick = useCallback(() => {
		if (!addBlockMenuOpen) {
			// На мобильном центрируем меню относительно тулбара (280px), иначе — относительно кнопки
			const toolbarEl = toolbarRef.current;
			const triggerEl = triggerButtonRef.current;
			const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
			if (isNarrow && toolbarEl) {
				const rect = toolbarEl.getBoundingClientRect();
				setMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			} else if (triggerEl) {
				const rect = triggerEl.getBoundingClientRect();
				setMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			}
		}
		setAddBlockMenuOpen((prev) => !prev);
	}, [addBlockMenuOpen]);

	const handleMoreButtonClick = useCallback(() => {
		if (!moreMenuOpen) {
			const toolbarEl = toolbarRef.current;
			const triggerEl = moreMenuTriggerRef.current;
			const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
			if (isNarrow && toolbarEl) {
				const rect = toolbarEl.getBoundingClientRect();
				setMoreMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			} else if (triggerEl) {
				const rect = triggerEl.getBoundingClientRect();
				setMoreMenuPosition({
					bottom: window.innerHeight - rect.top + 12,
					left: rect.left + rect.width / 2,
				});
			}
		}
		setMoreMenuOpen((prev) => !prev);
	}, [moreMenuOpen]);

	const handleAddBlockSelect = useCallback((item) => {
		setAddBlockMenuOpen(false);
		if (item.text === "Текстовый блок" && canAddTextBlock) {
			onAddTextBlock?.();
		}
		if (item.text === "Блок \"Куда сходить\"" && canAddWhereToGoBlock) {
			onAddWhereToGoBlock?.();
		}
		if (item.text === "Блок \"Полезные контакты\"" && canAddUsefulContactsBlock) {
			onAddUsefulContactsBlock?.();
		}
		if (item.text === "Блок \"Таблица Бюджета\"" && canAddBudgetTableBlock) {
			onAddBudgetTableBlock?.();
		}
	}, [onAddTextBlock, canAddTextBlock, onAddWhereToGoBlock, canAddWhereToGoBlock, onAddUsefulContactsBlock, canAddUsefulContactsBlock, onAddBudgetTableBlock, canAddBudgetTableBlock]);

	useEffect(() => {
		if (!addBlockMenuOpen) return;
		const handleClickOutside = (e) => {
			const inWrap = toolbarAddWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.addBlockMenuPortal}`);
			const inMenu = menuEl?.contains(e.target);
			if (!inWrap && !inMenu) setAddBlockMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [addBlockMenuOpen]);

	useEffect(() => {
		if (!moreMenuOpen) return;
		const handleClickOutside = (e) => {
			const inWrap = moreMenuWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.moreMenuPortal}`);
			const inMenu = menuEl?.contains(e.target);
			if (!inWrap && !inMenu) setMoreMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [moreMenuOpen]);

	const handleMoreMenuDuplicate = useCallback(() => {
		setMoreMenuOpen(false);
		onDuplicatePlan?.();
	}, [onDuplicatePlan]);

	const handleMoreMenuDelete = useCallback(() => {
		setMoreMenuOpen(false);
		onDeletePlan?.();
	}, [onDeletePlan]);

	const menuContent = addBlockMenuOpen && (
		<div
			className={`component-blur ${styles.addBlockMenu} ${styles.addBlockMenuOpen} ${styles.addBlockMenuPortal}`}
			role="menu"
			style={{
				bottom: menuPosition.bottom,
				left: menuPosition.left,
			}}
		>
			{ADD_BLOCK_ITEMS.map((item, index) => {
				const isTextBlock = item.text === "Текстовый блок";
				const isWhereToGoBlock = item.text === "Блок \"Куда сходить\"";
				const isUsefulContactsBlock = item.text === "Блок \"Полезные контакты\"";
				const isBudgetTableBlock = item.text === "Блок \"Таблица Бюджета\"";
				const disabled =
					(isTextBlock && !canAddTextBlock) ||
					(isWhereToGoBlock && !canAddWhereToGoBlock) ||
					(isUsefulContactsBlock && !canAddUsefulContactsBlock) ||
					(isBudgetTableBlock && !canAddBudgetTableBlock);
				return (
					<button
						key={index}
						type="button"
						className={`subinfo ${styles.addBlockMenuItem}`}
						role="menuitem"
						disabled={disabled}
						onClick={() => handleAddBlockSelect(item)}
					>
						<Image src={item.icon} alt="" width={20} height={20} className={styles.addBlockMenuIcon} />
						<span>{item.text}</span>
					</button>
				);
			})}
		</div>
	);

	return (
		<div className={`${styles.bottomBar} ${isFloatingOnMobile ? styles.bottomBarMobileFloating : ""}`}>
			<div ref={anchorRef} className={styles.bottomBarMobileAnchor} aria-hidden />
			<div className={styles.toolbar} ref={toolbarRef}>
				<div className={styles.toolbarIconsRow}>
					<button type="button" className={`${styles.toolbarButtonQuestion} `} aria-label="Помощь" onClick={onQuestionClick}>
						<Image src="/icons/system/QuestionSign.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
					</button>
					<div className={`${styles.toolbarGroup} `}>
						<div ref={toolbarAddWrapRef} className={styles.toolbarAddWrap}>
							<button
								ref={triggerButtonRef}
								type="button"
								className={styles.toolbarButtonTransparent}
								aria-label="Добавить блок"
								aria-expanded={addBlockMenuOpen}
								aria-haspopup="menu"
								onClick={handleAddButtonClick}
							>
								<Image src="/icons/system/CrossMiniDark.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
							</button>
						</div>
						<div ref={moreMenuWrapRef} className={styles.toolbarMoreWrap}>
							<button
								ref={moreMenuTriggerRef}
								type="button"
								className={styles.toolbarButtonTransparent}
								aria-label="Ещё"
								aria-expanded={moreMenuOpen}
								aria-haspopup="menu"
								onClick={handleMoreButtonClick}
							>
								<Image src="/icons/system/Vector.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
							</button>
						</div>
					</div>
				</div>
				<div className={styles.toolbarSaveWrap}>
					<Button
						Text={saveLoading ? "Сохранение…" : "Сохранить и выйти"}
						color={hasChanges ? "blue" : "inactive"}
						size="small"
						type="button"
						disabled={!hasChanges || saveLoading}
						title={!hasChanges && !saveLoading ? "Внесите изменения, чтобы сохранить" : undefined}
						onClick={onSave}
					/>
				</div>
			</div>
			{typeof document !== "undefined" && addBlockMenuOpen && createPortal(menuContent, document.body)}
			{typeof document !== "undefined" &&
				moreMenuOpen &&
				createPortal(
					<div
						className={`component-blur ${styles.moreMenu} ${styles.moreMenuOpen} ${styles.moreMenuPortal}`}
						role="menu"
						style={{
							bottom: moreMenuPosition.bottom,
							left: moreMenuPosition.left,
						}}
					>
						<button
							type="button"
							className={`subinfo ${styles.moreMenuItem}`}
							role="menuitem"
							disabled={duplicateInProgress}
							onClick={handleMoreMenuDuplicate}
						>
							{duplicateInProgress ? "Дублирование…" : "Дублировать чек-план"}
						</button>
						<button
							type="button"
							className={`subinfo ${styles.moreMenuItem} ${styles.moreMenuItemDanger}`}
							role="menuitem"
							onClick={handleMoreMenuDelete}
						>
							Удалить чек-план
						</button>
					</div>,
					document.body
				)}
		</div>
	);
});

/** Попап «Знакомство с сервисом»: шаги 1–4, по центру экрана с затенением */
const OnboardingPopup = memo(function OnboardingPopup({ isClosing, step, onClose, onNextStep, onPrevStep }) {
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

/** Попап подтверждения удаления блока: затенение как у QuestionSign, padding 20px */
const DeleteBlockConfirmPopup = memo(function DeleteBlockConfirmPopup({ isClosing, onClose, onConfirm, blockType }) {
	const label =
		blockType === "whereToGo"
			? "Заметки куда сходить"
			: blockType === "usefulContacts"
				? "Полезные контакты"
				: blockType === "budgetTable"
					? "Таблица бюджета"
					: "Текстовый блок";
	return (
		<div
			className={`${styles.deleteConfirmOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="delete-confirm-title"
		>
			<div
				className={`${styles.deleteConfirmPopup} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="delete-confirm-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Вы действительно хотите удалить «{label}»?
				</h2>
				<div className={styles.deleteConfirmButtons}>
					<Button Text="Удалить" color="dangerFilled" type="button" onClick={onConfirm} />
					<Button Text="Оставить" color="outline" type="button" onClick={onClose} />
				</div>
			</div>
		</div>
	);
});

const DeleteRowConfirmPopup = memo(function DeleteRowConfirmPopup({ isClosing, onClose, onConfirm }) {
	return (
		<div
			className={`${styles.deleteConfirmOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="delete-row-confirm-title"
		>
			<div
				className={`${styles.deleteConfirmPopup} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="delete-row-confirm-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Удалить этот ряд?
				</h2>
				<div className={styles.deleteConfirmButtons}>
					<Button Text="Удалить" color="dangerFilled" type="button" onClick={onConfirm} />
					<Button Text="Оставить" color="outline" type="button" onClick={onClose} />
				</div>
			</div>
		</div>
	);
});

/** Попап «Успешно дублировано»: после дублирования чек-плана */
const DuplicateSuccessPopup = memo(function DuplicateSuccessPopup({ isClosing, onClose, onGoToCopy }) {
	return (
		<div
			className={`${styles.deleteConfirmOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="duplicate-success-title"
		>
			<div
				className={`${styles.deleteConfirmPopup} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="duplicate-success-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Успешно дублировано
				</h2>
				<div className={styles.deleteConfirmButtons}>
					<Button Text="Перейти в копию" color="blue" type="button" onClick={onGoToCopy} />
					<Button Text="Остаться тут" color="outline" type="button" onClick={onClose} />
				</div>
			</div>
		</div>
	);
});

/** Попап подтверждения удаления чек-плана */
const DeleteCheckplanConfirmPopup = memo(function DeleteCheckplanConfirmPopup({ isClosing, onClose, onConfirm, loading = false }) {
	return (
		<div
			className={`${styles.deleteConfirmOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={loading ? undefined : onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="delete-checkplan-confirm-title"
		>
			<div
				className={`${styles.deleteConfirmPopup} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="delete-checkplan-confirm-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Вы действительно хотите удалить чек-план?
				</h2>
				<div className={styles.deleteConfirmButtons}>
					<Button
						Text={loading ? "Удаление…" : "Да, удалить"}
						color="dangerFilled"
						type="button"
						onClick={onConfirm}
						disabled={loading}
					/>
					<Button Text="Оставить" color="blue" type="button" onClick={onClose} disabled={loading} />
				</div>
			</div>
		</div>
	);
});

/** Тостер «Ссылка на Чек-план скопирована»: по центру экрана, 2 сек, плавное появление/исчезновение */
const CopyLinkToast = memo(function CopyLinkToast({ show, onExited }) {
	useEffect(() => {
		if (!show) return;
		const t = setTimeout(() => {
			onExited?.();
		}, 2000);
		return () => clearTimeout(t);
	}, [show, onExited]);
	if (!show || typeof document === "undefined") return null;
	return createPortal(
		<div className={styles.copyLinkToast} role="status" aria-live="polite">
			Ссылка на Чек-план скопирована
		</div>,
		document.body
	);
});

/** Тулбар режима просмотра: кнопка «Редактировать чек-план», Share, More (как в редактировании) */
const ViewModeToolbar = memo(function ViewModeToolbar({
	planIdStr,
	fromAccount = false,
	visibility = "private",
	onVisibilityChange,
	onCopyLink,
	onDuplicatePlan,
	onDeletePlan,
	duplicateInProgress = false,
}) {
	const [shareMenuOpen, setShareMenuOpen] = useState(false);
	const [moreMenuOpen, setMoreMenuOpen] = useState(false);
	const [shareMenuPosition, setShareMenuPosition] = useState({ bottom: 0, left: 0 });
	const [moreMenuPosition, setMoreMenuPosition] = useState({ bottom: 0, left: 0 });
	const [visibilityLoading, setVisibilityLoading] = useState(false);
	const shareWrapRef = useRef(null);
	const moreWrapRef = useRef(null);
	const shareTriggerRef = useRef(null);
	const moreTriggerRef = useRef(null);
	const toolbarRef = useRef(null);
	const anchorRef = useRef(null);
	const isFloatingOnMobile = useMobileFloatingToolbar(anchorRef, toolbarRef);

	const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
	const isPublic = visibility === "public";

	const updateSharePosition = useCallback(() => {
		const triggerEl = shareTriggerRef.current;
		const toolbarEl = toolbarRef.current;
		if (isNarrow && toolbarEl) {
			const rect = toolbarEl.getBoundingClientRect();
			setShareMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		} else if (triggerEl) {
			const rect = triggerEl.getBoundingClientRect();
			setShareMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		}
	}, [isNarrow]);

	const updateMorePosition = useCallback(() => {
		const triggerEl = moreTriggerRef.current;
		const toolbarEl = toolbarRef.current;
		if (isNarrow && toolbarEl) {
			const rect = toolbarEl.getBoundingClientRect();
			setMoreMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		} else if (triggerEl) {
			const rect = triggerEl.getBoundingClientRect();
			setMoreMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		}
	}, [isNarrow]);

	const handleShareClick = useCallback(() => {
		if (!shareMenuOpen) {
			updateSharePosition();
		}
		setShareMenuOpen((prev) => !prev);
	}, [shareMenuOpen, updateSharePosition]);

	const handleMoreClick = useCallback(() => {
		if (!moreMenuOpen) {
			updateMorePosition();
		}
		setMoreMenuOpen((prev) => !prev);
	}, [moreMenuOpen, updateMorePosition]);

	const handlePublishOrPrivate = useCallback(async () => {
		const newVisibility = isPublic ? "private" : "public";
		setVisibilityLoading(true);
		try {
			const token = getAuth()?.token;
			const res = await apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}`, {
				method: "PATCH",
				body: { visibility: newVisibility },
				token,
			});
			if (res.ok) {
				onVisibilityChange?.(newVisibility);
			}
		} finally {
			setVisibilityLoading(false);
		}
		setShareMenuOpen(false);
	}, [planIdStr, isPublic, onVisibilityChange]);

	const handleCopyLink = useCallback(() => {
		const url = typeof window !== "undefined" ? `${window.location.origin}/preview-checkplan/${encodeURIComponent(planIdStr)}` : "";
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(url).then(() => onCopyLink?.());
		} else {
			onCopyLink?.();
		}
		setShareMenuOpen(false);
	}, [planIdStr, onCopyLink]);

	useEffect(() => {
		if (!shareMenuOpen) return;
		const h = (e) => {
			const inWrap = shareWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.viewModeShareMenuPortal}`);
			if (!inWrap && !menuEl?.contains(e.target)) setShareMenuOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, [shareMenuOpen]);

	useEffect(() => {
		if (!moreMenuOpen) return;
		const h = (e) => {
			const inWrap = moreWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.viewModeMoreMenuPortal}`);
			if (!inWrap && !menuEl?.contains(e.target)) setMoreMenuOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, [moreMenuOpen]);

	const shareMenuContent = shareMenuOpen && (
		<div
			className={`component-blur ${styles.viewModeShareMenu} ${styles.moreMenuOpen} ${styles.viewModeShareMenuPortal}`}
			role="menu"
			style={{ bottom: shareMenuPosition.bottom, left: shareMenuPosition.left }}
		>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem}`}
				role="menuitem"
				onClick={handlePublishOrPrivate}
				disabled={visibilityLoading}
			>
				{isPublic ? "Сделать приватным" : "Опубликовать чек-план"}
			</button>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem}`}
				role="menuitem"
				onClick={handleCopyLink}
			>
				Поделиться по ссылке
			</button>
		</div>
	);

	const moreMenuContent = moreMenuOpen && (
		<div
			className={`component-blur ${styles.moreMenu} ${styles.moreMenuOpen} ${styles.viewModeMoreMenuPortal}`}
			role="menu"
			style={{ bottom: moreMenuPosition.bottom, left: moreMenuPosition.left }}
		>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem}`}
				role="menuitem"
				disabled={duplicateInProgress}
				onClick={() => {
					setMoreMenuOpen(false);
					onDuplicatePlan?.();
				}}
			>
				{duplicateInProgress ? "Дублирование…" : "Дублировать чек-план"}
			</button>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem} ${styles.moreMenuItemDanger}`}
				role="menuitem"
				onClick={() => {
					setMoreMenuOpen(false);
					onDeletePlan?.();
				}}
			>
				Удалить чек-план
			</button>
		</div>
	);

	return (
		<div className={`${styles.bottomBar} ${styles.bottomBarViewMode} ${isFloatingOnMobile ? styles.bottomBarMobileFloating : ""}`}>
			<div ref={anchorRef} className={styles.bottomBarMobileAnchor} aria-hidden />
			<div className={styles.viewModeToolbar} ref={toolbarRef}>
				<Link href={`/create-checkplan/${encodeURIComponent(planIdStr)}${fromAccount ? "?from=account" : ""}`} className={styles.viewModeEditWrap} aria-label="Редактировать чек-план">
					<Button Text="Редактировать чек-план" color="blue" size="small" type="button" />
				</Link>
				<div className={styles.viewModeToolbarIcons}>
					<div ref={shareWrapRef} className={styles.toolbarMoreWrap}>
						<button
							ref={shareTriggerRef}
							type="button"
							className={styles.toolbarButtonTransparent}
							aria-label="Поделиться"
							aria-expanded={shareMenuOpen}
							aria-haspopup="menu"
							onClick={handleShareClick}
						>
							<Image src="/icons/system/Share.svg" alt="" width={20} height={20} className={styles.viewModeShareIcon} />
						</button>
					</div>
					<div ref={moreWrapRef} className={styles.toolbarMoreWrap}>
						<button
							ref={moreTriggerRef}
							type="button"
							className={styles.toolbarButtonTransparent}
							aria-label="Ещё"
							aria-expanded={moreMenuOpen}
							aria-haspopup="menu"
							onClick={handleMoreClick}
						>
							<Image src="/icons/system/Vector.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
						</button>
					</div>
				</div>
			</div>
			{typeof document !== "undefined" && shareMenuOpen && createPortal(shareMenuContent, document.body)}
			{typeof document !== "undefined" && moreMenuOpen && createPortal(moreMenuContent, document.body)}
		</div>
	);
});

/** Попап «Войдите, чтобы поставить Лайк» + кнопка «Войти» */
const LoginToLikePopup = memo(function LoginToLikePopup({ isClosing, onClose, onLogin }) {
	return (
		<div
			className={`${styles.deleteConfirmOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="login-to-like-title"
		>
			<div
				className={`${styles.deleteConfirmPopup} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="login-to-like-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Войдите, чтобы поставить Лайк
				</h2>
				<div className={styles.deleteConfirmButtons}>
					<Button Text="Войти" color="blue" type="button" onClick={onLogin} />
				</div>
			</div>
		</div>
	);
});

/** Попап «Жалоба отправлена»: заголовок, описание со ссылками-заглушками, кнопка «Хорошо» */
const ReportSentPopup = memo(function ReportSentPopup({ isClosing, onClose }) {
	return (
		<div
			className={`${styles.deleteConfirmOverlay} ${isClosing ? styles.onboardingOverlayClosing : ""}`}
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="report-sent-title"
		>
			<div
				className={`${styles.deleteConfirmPopup} ${isClosing ? styles.onboardingPopupClosing : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 id="report-sent-title" className="title_2" style={{ color: "var(--grayscale-dark-gray)" }}>
					Жалоба отправлена
				</h2>
				<p className="paragraph" style={{ color: "var(--grayscale-dark-gray)" }}>
					Если данный чек-план нарушает{" "}
					<a href="/__not_found__" className={styles.reportPopupLink}>Политику конфиденциальности</a>
					{" и/или "}
					<a href="/__not_found__" className={styles.reportPopupLink}>Пользовательское соглашение</a>
					, будут приняты меры в отношении данного чек-плана и его создателя.
				</p>
				<div className={styles.deleteConfirmButtons}>
					<Button Text="Хорошо" color="blue" type="button" onClick={onClose} />
				</div>
			</div>
		</div>
	);
});

/** Тулбар для гостя (не владелец): «Использовать чек-план» / «Войти, чтобы использовать», лайк, ссылка, жалоба */
const GuestViewToolbar = memo(function GuestViewToolbar({
	planIdStr,
	isAuthenticated,
	initialLikes = 0,
	onCopyLink,
}) {
	const router = useRouter();
	const { isLiked, toggle, getLikeCount, setInitialLikeCounts } = useLikedChecklists();
	const [alertMenuOpen, setAlertMenuOpen] = useState(false);
	const [alertMenuPosition, setAlertMenuPosition] = useState({ bottom: 0, left: 0 });
	const [useLoading, setUseLoading] = useState(false);
	const alertWrapRef = useRef(null);
	const alertTriggerRef = useRef(null);
	const toolbarRef = useRef(null);
	const anchorRef = useRef(null);
	const isFloatingOnMobile = useMobileFloatingToolbar(anchorRef, toolbarRef);

	const isNarrow = typeof window !== "undefined" && window.innerWidth <= 768;
	const liked = isLiked(planIdStr);
	const likes = getLikeCount(planIdStr);

	useEffect(() => {
		if (planIdStr && typeof initialLikes === "number") {
			setInitialLikeCounts({ [planIdStr]: initialLikes });
		}
	}, [planIdStr, initialLikes, setInitialLikeCounts]);

	const handleUseClick = useCallback(() => {
		if (isAuthenticated) {
			setUseLoading(true);
			const token = getAuth()?.token;
			apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}/copy`, { method: "POST", token })
				.then((r) => r.ok ? r.json() : null)
				.then((data) => {
					if (data?.id_str) {
						router.push(`/create-checkplan/${encodeURIComponent(data.id_str)}`);
					}
				})
				.finally(() => setUseLoading(false));
		} else {
			router.push("/login");
		}
	}, [isAuthenticated, planIdStr, router]);

	const handleLikeClick = useCallback(() => {
		if (isAuthenticated) {
			toggle(planIdStr);
		} else {
			// Показать попап «Войдите, чтобы поставить Лайк» — через callback
			if (typeof window !== "undefined" && window.dispatchEvent) {
				window.dispatchEvent(new CustomEvent("setly:guest-show-login-to-like"));
			}
		}
	}, [isAuthenticated, planIdStr, toggle]);

	const handleCopyLink = useCallback(() => {
		const url = typeof window !== "undefined" ? `${window.location.origin}/preview-checkplan/${encodeURIComponent(planIdStr)}` : "";
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
			navigator.clipboard.writeText(url).then(() => onCopyLink?.());
		} else {
			onCopyLink?.();
		}
	}, [planIdStr, onCopyLink]);

	const updateAlertPosition = useCallback(() => {
		const triggerEl = alertTriggerRef.current;
		const toolbarEl = toolbarRef.current;
		if (isNarrow && typeof window !== "undefined") {
			// На мобильном — меню по центру страницы по горизонтали, над тулбаром по вертикали
			const bottom = toolbarEl
				? window.innerHeight - toolbarEl.getBoundingClientRect().top + 12
				: 120;
			setAlertMenuPosition({
				bottom,
				left: window.innerWidth / 2,
			});
		} else if (triggerEl) {
			const rect = triggerEl.getBoundingClientRect();
			setAlertMenuPosition({
				bottom: window.innerHeight - rect.top + 12,
				left: rect.left + rect.width / 2,
			});
		}
	}, [isNarrow]);

	const handleAlertClick = useCallback(() => {
		if (!alertMenuOpen) updateAlertPosition();
		setAlertMenuOpen((prev) => !prev);
	}, [alertMenuOpen, updateAlertPosition]);

	useEffect(() => {
		if (!alertMenuOpen) return;
		const h = (e) => {
			const inWrap = alertWrapRef.current?.contains(e.target);
			const menuEl = document.querySelector(`.${styles.guestAlertMenuPortal}`);
			if (!inWrap && !menuEl?.contains(e.target)) setAlertMenuOpen(false);
		};
		document.addEventListener("mousedown", h);
		return () => document.removeEventListener("mousedown", h);
	}, [alertMenuOpen]);

	function formatLikes(n) {
		if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
		return String(n);
	}

	const alertMenuContent = alertMenuOpen && (
		<div
			className={`component-blur ${styles.moreMenu} ${styles.moreMenuOpen} ${styles.guestAlertMenuPortal}`}
			role="menu"
			style={{ bottom: alertMenuPosition.bottom, left: alertMenuPosition.left }}
		>
			<button
				type="button"
				className={`subinfo ${styles.moreMenuItem} ${styles.moreMenuItemDanger}`}
				role="menuitem"
				onClick={() => {
					setAlertMenuOpen(false);
					if (typeof window !== "undefined" && window.dispatchEvent) {
						window.dispatchEvent(new CustomEvent("setly:guest-show-report-sent"));
					}
				}}
			>
				Пожаловаться
			</button>
		</div>
	);

	const toolbarWidthClass = !isAuthenticated ? styles.guestToolbarWide : "";

	return (
		<div className={`${styles.bottomBar} ${styles.bottomBarGuest} ${isFloatingOnMobile ? styles.bottomBarMobileFloating : ""}`}>
			<div ref={anchorRef} className={styles.bottomBarMobileAnchor} aria-hidden />
			<div className={`${styles.guestToolbar} ${toolbarWidthClass}`} ref={toolbarRef}>
				<button
					type="button"
					className={styles.guestToolbarUseButton}
					onClick={handleUseClick}
					disabled={useLoading}
				>
					{isAuthenticated ? (useLoading ? "Создание копии…" : "Использовать чек-план") : "Войти, чтобы использовать"}
				</button>
				<div className={styles.guestToolbarIcons}>
					<button
						type="button"
						className={styles.toolbarButtonTransparent}
						aria-label="Поделиться ссылкой"
						onClick={handleCopyLink}
					>
						<Image src="/icons/system/Link.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
					</button>
					<button
						type="button"
						className={styles.guestLikesRow}
						onClick={handleLikeClick}
						aria-pressed={liked}
					>
						<Image
							src={liked ? "/icons/images/HeartFull.svg" : "/icons/images/Heart.svg"}
							alt=""
							width={20}
							height={20}
							className={styles.guestLikesIcon}
						/>
						<span className={`label ${styles.guestLikesCount}`}>{formatLikes(likes)}</span>
					</button>
					<div ref={alertWrapRef} className={styles.toolbarMoreWrap}>
						<button
							ref={alertTriggerRef}
							type="button"
							className={styles.toolbarButtonTransparent}
							aria-label="Пожаловаться"
							aria-expanded={alertMenuOpen}
							aria-haspopup="menu"
							onClick={handleAlertClick}
						>
							<Image src="/icons/system/Alert.svg" alt="" width={20} height={20} className={styles.toolbarNavIcon} />
						</button>
					</div>
				</div>
			</div>
			{typeof document !== "undefined" && alertMenuOpen && createPortal(alertMenuContent, document.body)}
		</div>
	);
});

export default function CreateCheckplan({
	planIdStr = null,
	initialPlan = null,
	initialPlanData = null,
	readOnly = false,
	fromAccount = false,
	isOwner = true,
	isPreview = false,
	allowChecklistToggleInPreview = false,
	showOnboardingInitially = false,
}) {
	const { setInitialLikeCounts } = useLikedChecklists();
	const [planTitle, setPlanTitle] = useState(() => initialPlan?.title ?? "Китай 2026");
	const [description, setDescription] = useState(() => initialPlan?.description ?? "");
	const [coverImage, setCoverImage] = useState(() => {
		const src = initialPlan?.image_src;
		if (!src) return DEFAULT_COVER_IMAGE;
		if (src.startsWith("http") || src.startsWith("/")) return src;
		return `/storage/${src}`;
	});
	const [coverLoading, setCoverLoading] = useState(false);
	const [coverError, setCoverError] = useState(null);
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
	const [hasChanges, setHasChanges] = useState(false);
	const [showOnboardingPopup, setShowOnboardingPopup] = useState(() => Boolean(showOnboardingInitially));
	const [onboardingPopupClosing, setOnboardingPopupClosing] = useState(false);
	const [onboardingStep, setOnboardingStep] = useState(1);
	const [deleteBlockTarget, setDeleteBlockTarget] = useState(null); // { index, type: 'text'|'whereToGo'|'usefulContacts'|'budgetTable' }
	const [deleteConfirmClosing, setDeleteConfirmClosing] = useState(false);
	const [deleteRowTarget, setDeleteRowTarget] = useState(null); // { blockIndex, rowIndex }
	const [deleteRowConfirmClosing, setDeleteRowConfirmClosing] = useState(false);
	const [showDuplicateSuccessPopup, setShowDuplicateSuccessPopup] = useState(false);
	const [duplicateSuccessClosing, setDuplicateSuccessClosing] = useState(false);
	const [duplicatedPlanIdStr, setDuplicatedPlanIdStr] = useState(null);
	const [duplicateInProgress, setDuplicateInProgress] = useState(false);
	const [showDeleteCheckplanPopup, setShowDeleteCheckplanPopup] = useState(false);
	const [deleteCheckplanClosing, setDeleteCheckplanClosing] = useState(false);
	const [deleteCheckplanInProgress, setDeleteCheckplanInProgress] = useState(false);
	const [visibilityOverride, setVisibilityOverride] = useState(null); // after PATCH in view mode
	const [showCopyLinkToast, setShowCopyLinkToast] = useState(false);
	const [showLoginToLikePopup, setShowLoginToLikePopup] = useState(false);
	const [loginToLikeClosing, setLoginToLikeClosing] = useState(false);
	const [showReportSentPopup, setShowReportSentPopup] = useState(false);
	const [reportSentClosing, setReportSentClosing] = useState(false);
	const [suggestionLinksExiting, setSuggestionLinksExiting] = useState(() => new Set()); // 'whereToGo' | 'usefulContacts' | 'budgetTable'
	const [saveLoading, setSaveLoading] = useState(false);
	const [saveError, setSaveError] = useState(null);
	const coverInputRef = useRef(null);
	const descriptionRef = useRef(null);
	const titleRef = useRef(null);
	const initialSnapshotRef = useRef(null);
	const initialSnapshotSetRef = useRef(false);
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

	const SUGGESTION_EXIT_MS = 280;

	/** Если чеклист пустой и выбран тип — переключаем на «Ручная кладь и Багаж» и подставляем дефолтные пункты по типу. Только для шаблонного плана; для чистого блок «что взять» остаётся пустым с вариантом «Ручная кладь». */
	useEffect(() => {
		if (!wasCreatedWithTemplateRef.current) return;
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
			router.push(`/preview-checkplan/${encodeURIComponent(planIdStr)}${fromAccount ? "?from=account" : ""}`);
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

	useEffect(() => {
		if (typeof window === "undefined" || typeof document === "undefined") {
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
	}, [contentBlocks]);

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

	const openOnboardingPopup = useCallback(() => {
		setShowOnboardingPopup(true);
		setOnboardingPopupClosing(false);
		setOnboardingStep(1);
	}, []);
	const closeOnboardingPopup = useCallback(() => {
		setOnboardingPopupClosing(true);
	}, []);
	const goOnboardingNextStep = useCallback(() => setOnboardingStep((s) => (s < 4 ? s + 1 : s)), []);
	const goOnboardingPrevStep = useCallback(() => setOnboardingStep((s) => Math.max(1, s - 1)), []);

	const openDeleteBlockConfirm = useCallback((index, blockType) => setDeleteBlockTarget({ index, type: blockType }), []);
	const closeDeleteConfirm = useCallback(() => setDeleteConfirmClosing(true), []);
	const confirmDeleteBlock = useCallback(() => {
		if (deleteBlockTarget != null) {
			removeContentBlock(deleteBlockTarget.index);
		}
		setDeleteConfirmClosing(true);
	}, [deleteBlockTarget, removeContentBlock]);

	const openDeleteRowConfirm = useCallback((blockIndex, rowIndex) => setDeleteRowTarget({ blockIndex, rowIndex }), []);
	const closeDeleteRowConfirm = useCallback(() => setDeleteRowConfirmClosing(true), []);
	const removeBudgetRow = useCallback((blockIndex, rowIndex) => {
		setContentBlocks((prev) => {
			const next = [...prev];
			const block = next[blockIndex];
			if (block?.type !== "budgetTable" || !block.rows || block.rows.length <= 1) return prev;
			const newRows = block.rows.filter((_, i) => i !== rowIndex);
			next[blockIndex] = { ...block, rows: newRows };
			return next;
		});
	}, []);
	const confirmDeleteRow = useCallback(() => {
		if (deleteRowTarget != null) {
			removeBudgetRow(deleteRowTarget.blockIndex, deleteRowTarget.rowIndex);
		}
		setDeleteRowConfirmClosing(true);
	}, [deleteRowTarget, removeBudgetRow]);

	const closeDuplicateSuccessPopup = useCallback(() => setDuplicateSuccessClosing(true), []);
	const handleDuplicatePlan = useCallback(async () => {
		if (!planIdStr || duplicateInProgress) return;
		setDuplicateInProgress(true);
		try {
			const token = getAuth()?.token;
			const res = await apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}/copy`, {
				method: "POST",
				token,
			});
			const data = res.ok ? await res.json().catch(() => null) : null;
			if (data?.id_str) {
				setDuplicatedPlanIdStr(data.id_str);
				setShowDuplicateSuccessPopup(true);
			}
		} finally {
			setDuplicateInProgress(false);
		}
	}, [planIdStr, duplicateInProgress]);
	const handleDuplicateSuccessGoToCopy = useCallback(() => {
		setDuplicateSuccessClosing(true);
		if (duplicatedPlanIdStr) {
			router.push(`/create-checkplan/${encodeURIComponent(duplicatedPlanIdStr)}`);
		}
	}, [duplicatedPlanIdStr, router]);
	const closeDeleteCheckplanPopup = useCallback(() => setDeleteCheckplanClosing(true), []);
	const confirmDeleteCheckplan = useCallback(async () => {
		if (deleteCheckplanInProgress) return;
		if (planIdStr) {
			setDeleteCheckplanInProgress(true);
			try {
				const token = getAuth()?.token;
				const res = await apiFetch(`/api/check-plans/${encodeURIComponent(planIdStr)}`, {
					method: "DELETE",
					token,
				});
				if (!res.ok) {
					setDeleteCheckplanInProgress(false);
					return;
				}
			} catch (_) {
				setDeleteCheckplanInProgress(false);
				return;
			}
		}
		setDeleteCheckplanClosing(true);
		setDeleteCheckplanInProgress(false);
		setTimeout(() => {
			router.push(fromAccount ? "/account" : "/check-plans");
		}, 0);
	}, [planIdStr, fromAccount, router, deleteCheckplanInProgress]);

	useEffect(() => {
		if (!deleteConfirmClosing) return;
		const t = setTimeout(() => {
			setDeleteBlockTarget(null);
			setDeleteConfirmClosing(false);
		}, 280);
		return () => clearTimeout(t);
	}, [deleteConfirmClosing]);

	useEffect(() => {
		if (!deleteRowConfirmClosing) return;
		const t = setTimeout(() => {
			setDeleteRowTarget(null);
			setDeleteRowConfirmClosing(false);
		}, 280);
		return () => clearTimeout(t);
	}, [deleteRowConfirmClosing]);

	useEffect(() => {
		if (!duplicateSuccessClosing) return;
		const t = setTimeout(() => {
			setShowDuplicateSuccessPopup(false);
			setDuplicateSuccessClosing(false);
			setDuplicatedPlanIdStr(null);
		}, 280);
		return () => clearTimeout(t);
	}, [duplicateSuccessClosing]);

	useEffect(() => {
		if (!deleteCheckplanClosing) return;
		const t = setTimeout(() => {
			setShowDeleteCheckplanPopup(false);
			setDeleteCheckplanClosing(false);
		}, 280);
		return () => clearTimeout(t);
	}, [deleteCheckplanClosing]);

	useEffect(() => {
		if (!onboardingPopupClosing) return;
		const t = setTimeout(() => {
			setShowOnboardingPopup(false);
			setOnboardingPopupClosing(false);
		}, 280);
		return () => clearTimeout(t);
	}, [onboardingPopupClosing]);

	const normalizeCheckboxItems = (items) =>
		(items || [])
			.filter((i) => ((i?.text || "").trim().length > 0) || Boolean(i?.checked))
			.map((i) => ({ text: (i?.text || "").trim(), checked: Boolean(i?.checked) }));

	const normalizeTextItems = (items) =>
		(items || [])
			.map((i) => (i?.text || "").trim())
			.filter((t) => t.length > 0);

	// Видимость блока «Совет платформы» не считается изменением чеклиста — только данные формы
	// sortIndex не входит в сравнение: смена только «Ручная кладь»/«Ручная кладь и Багаж» не даёт права сохранять
	// Пустые блоки участвуют в сравнении: добавление/удаление пустого блока даёт право сохранить (как и с другими блоками)
	const buildComparableState = useCallback(
		() => ({
			planTitle,
			description,
			coverImage,
			datesRange,
			typeIndex,
			peopleIndex,
			locationLabel,
			region,
			handLuggageItems: normalizeCheckboxItems(handLuggageItems),
			luggageItems: normalizeCheckboxItems(luggageItems),
			personalNotesItems: normalizeTextItems(personalNotesItems),
			contentBlocks: contentBlocks.map((b) => {
					if (b.type === "text") return { type: "text", title: (b.title || "").trim(), description: (b.description || "").trim() };
					if (b.type === "whereToGo")
						return {
							type: "whereToGo",
							sections: b.sections,
							removedWhereToGoSectionKeys: b.removedWhereToGoSectionKeys ?? [],
						};
					if (b.type === "usefulContacts")
						return {
							type: "usefulContacts",
							sections: b.sections,
							addedSectionOrder: b.addedSectionOrder ?? [],
							removedInitialSectionKeys: b.removedInitialSectionKeys ?? [],
						};
					if (b.type === "budgetTable") return { type: "budgetTable", rows: b.rows };
					return b;
				}),
		}),
		[
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
		]
	);

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
		// Снимок исходного состояния при монтировании только для нового плана (без initialPlanData).
		if (!initialPlanData && !initialSnapshotSetRef.current) {
			initialSnapshotSetRef.current = true;
			initialSnapshotRef.current = JSON.stringify(buildComparableState());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- только при монтировании
	}, []);

	// Снимок после гидрации данных с сервера — чтобы сравнение учитывало Даты, Место, Тип, Люди.
	useEffect(() => {
		if (!initialPlanData || !hydrationDone || initialSnapshotSetRef.current) return;
		initialSnapshotSetRef.current = true;
		initialSnapshotRef.current = JSON.stringify(buildComparableState());
	}, [initialPlanData, hydrationDone, buildComparableState]);

	useEffect(() => {
		if (!readOnly || isOwner) return;
		const onLoginToLike = () => setShowLoginToLikePopup(true);
		const onReportSent = () => setShowReportSentPopup(true);
		window.addEventListener("setly:guest-show-login-to-like", onLoginToLike);
		window.addEventListener("setly:guest-show-report-sent", onReportSent);
		return () => {
			window.removeEventListener("setly:guest-show-login-to-like", onLoginToLike);
			window.removeEventListener("setly:guest-show-report-sent", onReportSent);
		};
	}, [readOnly, isOwner]);

	// Передать количество лайков чекплана в контекст для гостевого тулбара
	useEffect(() => {
		if (readOnly && !isOwner && planIdStr && initialPlan != null) {
			const count = Number(initialPlan.initial_likes);
			if (!Number.isNaN(count)) {
				setInitialLikeCounts({ [planIdStr]: count });
			}
		}
	}, [readOnly, isOwner, planIdStr, initialPlan, setInitialLikeCounts]);

	useEffect(() => {
		if (!initialSnapshotRef.current) return;
		const t = setTimeout(() => {
			const currentSnapshot = JSON.stringify(buildComparableState());
			setHasChanges(currentSnapshot !== initialSnapshotRef.current);
		}, 400);
		return () => clearTimeout(t);
	}, [buildComparableState]);

	const handleCoverFileChange = useCallback(async (e) => {
		const file = e.target?.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setCoverError("Выберите изображение (JPG, PNG и т.д.)");
			return;
		}
		setCoverError(null);
		setCoverLoading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);

			const base = getApiUrl();
			const uploadUrl = base ? `${base}${UPLOAD_COVER_API}` : UPLOAD_COVER_API;
			const headers = {};
			try {
				const auth = getAuth();
				if (auth?.token && typeof auth.token === "string") {
					headers.Authorization = `Bearer ${auth.token.trim()}`;
				}
			} catch (_) {}

			const res = await fetch(uploadUrl, {
				method: "POST",
				headers,
				body: formData,
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				const detail = data?.detail;
				const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
				throw new Error(msg || data?.message || "Ошибка загрузки");
			}
			// Бэкенд возвращает url (полный) и path — для отображения и сохранения в плане используем url
			const imageUrl = data.url || (base && data.path ? `${base.replace(/\/$/, "")}${data.path}` : null) || data.path || data.coverImagePath;
			if (imageUrl) {
				setCoverImage(imageUrl);
			}
		} catch (err) {
			setCoverError(err.message || "Не удалось загрузить изображение");
		} finally {
			setCoverLoading(false);
			if (coverInputRef.current) coverInputRef.current.value = "";
		}
	}, []);

	const handleCoverClick = useCallback(() => {
		coverInputRef.current?.click();
	}, []);

	const datesDropdownContent = useMemo(
		() => (close) => (
			<CalendarContent
				value={datesRange}
				onChange={setDatesRange}
				onClose={close}
			/>
		),
		[datesRange]
	);

	const handleLocationSelect = useCallback((label, selectedRegion) => {
		setLocationLabel(label);
		setRegion(selectedRegion);
		setLocationSearch("");
	}, []);

	const locationDropdownContent = useMemo(
		() => (close) => (
			<LocationDropdownContent
				close={close}
				searchQuery={locationSearch}
				setSearchQuery={setLocationSearch}
				onSelect={handleLocationSelect}
			/>
		),
		[locationSearch, handleLocationSelect]
	);

	const currentVisibility = visibilityOverride ?? initialPlan?.visibility ?? "private";
	const backHref = isPreview
		? (fromAccount ? "/account" : "/check-plans")
		: (readOnly ? (fromAccount ? "/account" : "/check-plans") : "/account");
	const backLabel = "Назад";
	const backAriaLabel = isPreview
		? (fromAccount ? "Назад в личный кабинет" : "Назад к чек-планам")
		: (readOnly ? (fromAccount ? "Назад в личный кабинет" : "Назад к чек-планам") : "Назад в личный кабинет");

	return (
		<div className={`${styles.wrapper} ${isPreview ? styles.wrapperPreview : ""}`}>
			<Link href={backHref} className={styles.backRow} aria-label={backAriaLabel}>
				<span className={styles.backButton}>
					<Image
						src="/icons/system/ArrowLeft.svg"
						alt=""
						width={20}
						height={20}
						className={styles.icon20}
					/>
				</span>
				<span className={`${styles.backLabel} subinfo`} style={{ color: "var(--grayscale-dark-gray)" }}>
					{backLabel}
				</span>
			</Link>

			<div className={styles.contentSection}>
				<div className={styles.topRow}>
					<div className={`${styles.card} ${readOnly ? styles.cardReadOnly : ""}`}>
						<div className={styles.cardMain}>
							{readOnly ? (
								<>
									<h1 className={styles.cardTitleTextarea} style={{ resize: "none", border: "none", background: "transparent", padding: 0 }}>
										{planTitle || "Без названия"}
									</h1>
									<p className={`subinfo ${styles.cardDescriptionTextarea}`} style={{ resize: "none", border: "none", background: "transparent", padding: 0 }}>
										{description || "—"}
									</p>
								</>
							) : (
								<>
									<textarea
										ref={titleRef}
										className={styles.cardTitleTextarea}
										placeholder="Введите название"
										value={planTitle}
										onChange={(e) => setPlanTitle(e.target.value.slice(0, 50))}
										onInput={adjustTitleHeight}
										rows={1}
										maxLength={26}
										aria-label="Название чеклиста"
									/>
									<textarea
										ref={descriptionRef}
										className={`subinfo ${styles.cardDescriptionTextarea}`}
										placeholder="Введите описание"
										value={description}
										onChange={(e) => setDescription(e.target.value.slice(0, 200))}
										onInput={adjustDescriptionHeight}
										rows={1}
										maxLength={120}
										aria-label="Описание чеклиста"
									/>
								</>
							)}
							<p className="subinfo" style={{ color: "var(--grayscale-gray)" }}>
								{currentVisibility === "public" ? "Публичный чек-план" : "Приватный чек-план"}
							</p>
							<div className={styles.datesBlock}>
								<div className={styles.cardDropdownRow}>
									<div className={styles.cardDropdownLabel}>
										<Image src="/icons/images/Calender.svg" alt="" width={20} height={20} />
										<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Даты:</span>
									</div>
									<div className={styles.cardDropdown}>
										{readOnly ? (
											<span className="subinfo">{datesLabel || "—"}</span>
										) : (
											<Dropdown
												text={datesLabel}
												items={[]}
												dropdownContent={datesDropdownContent}
												bgView={false}
												hasValue={datesRange[0] != null && datesRange[1] != null}
												dropdownMenuClassName={styles.datesDropdownMenu}
											/>
										)}
									</div>
								</div>
								<div className={styles.cardDropdownRow}>
									<div className={styles.cardDropdownLabel}>
										<Image src="/icons/images/Location.svg" alt="" width={20} height={20} />
										<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Место:</span>
									</div>
									<div className={styles.cardDropdown}>
										{readOnly ? (
											<span className="subinfo">{locationLabel || "Не выбрано"}</span>
										) : (
											<Dropdown
												text={locationLabel || "Не выбрано"}
												items={[]}
												dropdownContent={locationDropdownContent}
												hasValue={!!locationLabel}
											/>
										)}
									</div>
								</div>
								<div className={styles.cardDropdownRow}>
									<div className={styles.cardDropdownLabel}>
										<Image src="/icons/images/Aeroplane.svg" alt="" width={20} height={20} />
										<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Тип:</span>
									</div>
									<div className={styles.cardDropdown}>
										{readOnly ? (
											<span className="subinfo">{typeIndex >= 0 ? TYPE_OPTIONS[typeIndex] : "Не выбрано"}</span>
										) : (
											<Dropdown
												text={typeIndex >= 0 ? TYPE_OPTIONS[typeIndex] : "Не выбрано"}
												items={TYPE_OPTIONS}
												selectedIndex={typeIndex}
												onSelect={(i) => setTypeIndex(i)}
											/>
										)}
									</div>
								</div>
								<div className={styles.cardDropdownRow}>
									<div className={styles.cardDropdownLabel}>
										<Image src="/icons/images/UsersBig.svg" alt="" width={20} height={20} />
										<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Люди:</span>
									</div>
									<div className={styles.cardDropdown}>
										{readOnly ? (
											<span className="subinfo">{peopleIndex >= 0 ? TRAVELER_OPTIONS[peopleIndex] : "Не выбрано"}</span>
										) : (
											<Dropdown
												text="Не выбрано"
												items={TRAVELER_OPTIONS}
												selectedIndex={peopleIndex}
												onSelect={(i) => setPeopleIndex(i)}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<TripImageSection
						coverImage={coverImage}
						coverLoading={coverLoading}
						coverError={coverError}
						coverInputRef={coverInputRef}
						onCoverChange={readOnly ? undefined : handleCoverFileChange}
						onCoverClick={readOnly ? undefined : handleCoverClick}
						readOnly={readOnly}
					/>
				</div>

				<div className={styles.secondRow}>
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
					<RightColumnSection
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
				onDeletePlan={() => setShowDeleteCheckplanPopup(true)}
				duplicateInProgress={duplicateInProgress}
			/>
			)}
			{readOnly && planIdStr && isOwner && (
				<ViewModeToolbar
					planIdStr={planIdStr}
					fromAccount={fromAccount}
					visibility={currentVisibility}
					onVisibilityChange={setVisibilityOverride}
					onCopyLink={() => setShowCopyLinkToast(true)}
					onDuplicatePlan={handleDuplicatePlan}
					onDeletePlan={() => setShowDeleteCheckplanPopup(true)}
					duplicateInProgress={duplicateInProgress}
				/>
			)}
			{readOnly && planIdStr && !isOwner && (
				<GuestViewToolbar
					planIdStr={planIdStr}
					isAuthenticated={!!getAuth()?.user?.id}
					initialLikes={Number(initialPlan?.initial_likes) || 0}
					onCopyLink={() => setShowCopyLinkToast(true)}
				/>
			)}
			<CopyLinkToast show={showCopyLinkToast} onExited={() => setShowCopyLinkToast(false)} />
			{typeof document !== "undefined" &&
				showOnboardingPopup &&
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
			{typeof document !== "undefined" &&
				deleteBlockTarget != null &&
				createPortal(
					<DeleteBlockConfirmPopup
						isClosing={deleteConfirmClosing}
						onClose={closeDeleteConfirm}
						onConfirm={confirmDeleteBlock}
						blockType={deleteBlockTarget.type}
					/>,
					document.body
				)}
			{typeof document !== "undefined" &&
				deleteRowTarget != null &&
				createPortal(
					<DeleteRowConfirmPopup
						isClosing={deleteRowConfirmClosing}
						onClose={closeDeleteRowConfirm}
						onConfirm={confirmDeleteRow}
					/>,
					document.body
				)}
			{typeof document !== "undefined" &&
				showDuplicateSuccessPopup &&
				createPortal(
					<DuplicateSuccessPopup
						isClosing={duplicateSuccessClosing}
						onClose={closeDuplicateSuccessPopup}
						onGoToCopy={handleDuplicateSuccessGoToCopy}
					/>,
					document.body
				)}
			{typeof document !== "undefined" &&
				showDeleteCheckplanPopup &&
				createPortal(
					<DeleteCheckplanConfirmPopup
						isClosing={deleteCheckplanClosing}
						onClose={closeDeleteCheckplanPopup}
						onConfirm={confirmDeleteCheckplan}
						loading={deleteCheckplanInProgress}
					/>,
					document.body
				)}
			{typeof document !== "undefined" &&
				showLoginToLikePopup &&
				createPortal(
					<LoginToLikePopup
						isClosing={loginToLikeClosing}
						onClose={() => {
							setLoginToLikeClosing(true);
							setTimeout(() => {
								setShowLoginToLikePopup(false);
								setLoginToLikeClosing(false);
							}, 280);
						}}
						onLogin={() => {
							setLoginToLikeClosing(true);
							setTimeout(() => {
								setShowLoginToLikePopup(false);
								setLoginToLikeClosing(false);
								router.push("/login");
							}, 280);
						}}
					/>,
					document.body
				)}
			{typeof document !== "undefined" &&
				showReportSentPopup &&
				createPortal(
					<ReportSentPopup
						isClosing={reportSentClosing}
						onClose={() => {
							setReportSentClosing(true);
							setTimeout(() => {
								setShowReportSentPopup(false);
								setReportSentClosing(false);
							}, 280);
						}}
					/>,
					document.body
				)}
		</div>
	);
}
