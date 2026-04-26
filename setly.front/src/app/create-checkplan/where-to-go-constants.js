/** Секции блока «Куда сходить» (ключи совпадают с полями API what_to_*). */
export const WHERE_TO_GO_SECTIONS = [
  { key: "look", title: "Посмотреть", placeholder: "Что посмотреть" },
  { key: "eat", title: "Поесть", placeholder: "Что поесть" },
  { key: "buy", title: "Покупки", placeholder: "Что купить" },
];

/** Стабильные ссылки для fallback — иначе каждый рендер ломает deps у useCallback/useMemo. */
export const DEFAULT_WHERE_TO_GO_SECTION_ROWS = {
  look: [{ text: "", link: "" }],
  eat: [{ text: "", link: "" }],
  buy: [{ text: "", link: "" }],
};

export const EMPTY_REMOVED_WHERE_KEYS = [];

export function emptyWhereToGoRowCount(rows) {
  return rows.filter((r) => !(r.text || "").trim() && !(r.link || "").trim()).length;
}

/** Лимит пустых строк (тот же порог, что и для похожих блоков с text/link). */
export function canAddWhereToGoRow(rows) {
  return emptyWhereToGoRowCount(rows) < 3;
}
