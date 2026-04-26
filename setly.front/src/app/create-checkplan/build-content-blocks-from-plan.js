import { WHERE_TO_GO_SECTIONS } from "./where-to-go-constants";
import {
	USEFUL_CONTACTS_INITIAL_SECTIONS,
	USEFUL_CONTACTS_ADDABLE_SECTIONS,
	CONTACTS_TYPE_TITLE_TO_KEY,
} from "./useful-contacts-constants";
import { BUDGET_DEFAULT_ROWS } from "./budget-table-constants";

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
export function buildContentBlocksFromPlanData(initialPlanData) {
	if (!initialPlanData) return { blocks: [], nextId: 0 };
	const blocks = [];
	let nextId = 0;
	const id = () => nextId++;

	const textBlocks = initialPlanData.blocks;
	const hasTypedBlocks =
		Array.isArray(textBlocks) && textBlocks.some((b) => b && typeof b.type === "string" && b.type !== "text");

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
