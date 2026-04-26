export const USEFUL_CONTACTS_INITIAL_SECTIONS = [
	{ key: "accommodation", title: "Жильё / Отель", placeholder: "Пункт" },
	{ key: "embassy", title: "Посольство / Консульство", placeholder: "Пункт" },
	{ key: "guide", title: "Гид / Локальные контакты", placeholder: "Пункт" },
];

export const USEFUL_CONTACTS_ADDABLE_SECTIONS = [
	{ key: "pharmacy", title: "Аптека / Медпомощь" },
	{ key: "police", title: "Полиция / Экстренные службы" },
	{ key: "taxi", title: "Такси / Транспорт" },
];

/** Маппинг заголовка секции контактов (из API) в key */
export const CONTACTS_TYPE_TITLE_TO_KEY = {};
[...USEFUL_CONTACTS_INITIAL_SECTIONS, ...USEFUL_CONTACTS_ADDABLE_SECTIONS].forEach((s) => {
	CONTACTS_TYPE_TITLE_TO_KEY[s.title] = s.key;
});

export function getUsefulContactsSections(block) {
	const sections = block.sections ?? {
		accommodation: [{ text: "", link: "" }],
		embassy: [{ text: "", link: "" }],
		guide: [{ text: "", link: "" }],
	};
	const addedOrder = block.addedSectionOrder ?? [];
	const removedInitialSectionKeys = block.removedInitialSectionKeys ?? [];
	return { sections, addedOrder, removedInitialSectionKeys };
}
