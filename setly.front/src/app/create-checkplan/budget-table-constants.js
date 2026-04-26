export const BUDGET_DEFAULT_ROWS = [
	{ category: "Перелёт", planned: "", spent: "" },
	{ category: "Жильё", planned: "", spent: "" },
	{ category: "Питание", planned: "", spent: "" },
	{ category: "Транспорт", planned: "", spent: "" },
];

export const DEFAULT_BUDGET_ROWS_FALLBACK = BUDGET_DEFAULT_ROWS.map((r) => ({ ...r }));

export function parseBudgetNumber(v) {
	const n = parseFloat(String(v || "").replace(",", "."));
	return Number.isFinite(n) ? n : 0;
}
