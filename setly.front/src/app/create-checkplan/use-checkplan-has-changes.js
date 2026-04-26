"use client";

import { useMemo, useState, useRef, useEffect } from "react";

export function useCheckplanHasChanges({
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
}) {
	const [hasChanges, setHasChanges] = useState(false);
	const initialSnapshotRef = useRef(null);
	const initialSnapshotSetRef = useRef(false);

	const comparableState = useMemo(() => {
		const normalizeCheckboxItems = (items) =>
			(items || [])
				.filter((i) => ((i?.text || "").trim().length > 0) || Boolean(i?.checked))
				.map((i) => ({ text: (i?.text || "").trim(), checked: Boolean(i?.checked) }));

		const normalizeTextItems = (items) =>
			(items || [])
				.map((i) => (i?.text || "").trim())
				.filter((t) => t.length > 0);

		return {
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
				if (b.type === "whereToGo") {
					return {
						type: "whereToGo",
						sections: b.sections,
						removedWhereToGoSectionKeys: b.removedWhereToGoSectionKeys ?? [],
					};
				}
				if (b.type === "usefulContacts") {
					return {
						type: "usefulContacts",
						sections: b.sections,
						addedSectionOrder: b.addedSectionOrder ?? [],
						removedInitialSectionKeys: b.removedInitialSectionKeys ?? [],
					};
				}
				if (b.type === "budgetTable") return { type: "budgetTable", rows: b.rows };
				return b;
			}),
		};
	}, [
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
	]);

	useEffect(() => {
		// Снимок исходного состояния при монтировании только для нового плана (без initialPlanData).
		if (!initialPlanData && !initialSnapshotSetRef.current) {
			initialSnapshotSetRef.current = true;
			initialSnapshotRef.current = JSON.stringify(comparableState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- только при монтировании
	}, []);

	// Снимок после гидрации данных с сервера — чтобы сравнение учитывало Даты, Место, Тип, Люди.
	useEffect(() => {
		if (!initialPlanData || !hydrationDone || initialSnapshotSetRef.current) return;
		initialSnapshotSetRef.current = true;
		initialSnapshotRef.current = JSON.stringify(comparableState);
	}, [initialPlanData, hydrationDone, comparableState]);

	useEffect(() => {
		if (!initialSnapshotRef.current) return;
		const t = setTimeout(() => {
			const currentSnapshot = JSON.stringify(comparableState);
			setHasChanges(currentSnapshot !== initialSnapshotRef.current);
		}, 400);
		return () => clearTimeout(t);
	}, [comparableState]);

	return hasChanges;
}
