"use client";

import { memo, useCallback, useRef, useEffect } from "react";
import { CheckplanAddRowButton, CheckplanAddSectionTitleButton } from "./checkplan-add-row-button";
import { CheckplanSectionHeadingDelete } from "./checkplan-section-heading-delete";
import { ContentBlockToolbar } from "./content-block-toolbar";
import styles from "./create-checkplan.module.css";
import { canAddWhereToGoRow } from "./where-to-go-constants";
import { useSectionedRowListDrag, budgetRowSiblingShiftPx } from "./sectioned-row-list-drag";
import { WhereToGoSectionRow, WhereToGoDragFloatRow } from "./where-to-go-block-card";
import {
	USEFUL_CONTACTS_INITIAL_SECTIONS,
	USEFUL_CONTACTS_ADDABLE_SECTIONS,
	getUsefulContactsSections,
} from "./useful-contacts-constants";

export const UsefulContactsBlockCard = memo(function UsefulContactsBlockCard({
	block,
	index,
	totalCount,
	updateContentBlock,
	moveContentBlockUp,
	moveContentBlockDown,
	onRequestRemoveContentBlock,
	readOnly = false,
	isPreview = false,
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
	useEffect(() => {
		sectionsRefForRowReorder.current = sections;
	}, [sections]);

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
		<div ref={rowlistRootRef} className={`${styles.whereToGoBlockWrap} ${styles.contentBlockToolbarHost}`} data-block-id={block.id}>
			<div className={styles.whereToGoBlock}>
				<div className={styles.whereToGoTitleRow}>
					<h3 className={`title_2 ${styles.whereToGoTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Полезные контакты
					</h3>
					<ContentBlockToolbar
						readOnly={readOnly}
						canMoveUp={canMoveUp}
						canMoveDown={canMoveDown}
						onMoveUp={onMoveUp}
						onMoveDown={onMoveDown}
						onRemove={onRemove}
					/>
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
										<CheckplanSectionHeadingDelete sectionTitle={title} onRemove={() => removeSection(key)} />
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
										isPreview={isPreview}
									/>
										);
									})}
								</div>
								{!readOnly && (
									<CheckplanAddRowButton onClick={() => addRow(key)} disabled={!canAddWhereToGoRow(rows)} />
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
								<CheckplanAddSectionTitleButton
									key={init.key}
									quotedTitle={init.title}
									onClick={() => restoreInitialSection(init.key)}
								/>
							))}
							{USEFUL_CONTACTS_ADDABLE_SECTIONS.filter((s) => !addedOrder.includes(s.key)).map((addable) => (
								<CheckplanAddSectionTitleButton
									key={addable.key}
									quotedTitle={addable.title}
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
