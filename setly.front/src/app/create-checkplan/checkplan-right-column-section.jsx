"use client";
/* eslint-disable @next/next/no-img-element -- плавающая строка при перетаскивании заметок */

import { memo, useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { PERSONAL_NOTES, SUGGESTION_LINKS } from "./create-checkplan-data";
import { canAddItem } from "./create-checkplan-utils";
import { BudgetTableBlockCard } from "./budget-table-block-card";
import { CheckplanAddRowButton } from "./checkplan-add-row-button";
import { CheckplanPersonalNoteRow } from "./checkplan-editable-rows";
import { TextBlockCard } from "./checkplan-text-block-card";
import { UsefulContactsBlockCard } from "./useful-contacts-block-card";
import { WhereToGoBlockCard } from "./where-to-go-block-card";
import { computeIndexedRowDropIndex, budgetRowSiblingShiftPx } from "./sectioned-row-list-drag";
import { createViewportAutoScrollController } from "@/app/lib/drag-auto-scroll";
import styles from "./create-checkplan.module.css";

function computePersonalNoteDropIndex(clientY, containerEl) {
	return computeIndexedRowDropIndex(clientY, containerEl, "data-personal-note-row-index");
}

const PersonalNotesDragFloatRow = memo(function PersonalNotesDragFloatRow({ top, left, width, text }) {
	if (typeof document === "undefined") return null;
	return createPortal(
		<div className={styles.personalNoteRowFloatRoot} style={{ top, left, width }}>
			<div className={styles.personalNoteRowFloatInner}>
				<div className={styles.notesPersonalRow}>
					<div className={styles.notesItemDragHandle} aria-hidden>
						<img src="/icons/system/draggableDots.svg" alt="" width={11} height={18} draggable={false} />
					</div>
					<div className={styles.notesItemRow}>
						<span className={`paragraph ${styles.notesPersonalNoteFloatText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{text?.trim() || "—"}
						</span>
					</div>
				</div>
			</div>
		</div>,
		document.body
	);
});

export const RightColumnSection = memo(function RightColumnSection({
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
	reorderPersonalNoteItems,
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
	fullWidth = false,
}) {
	const personalNotesRowsContainerRef = useRef(null);
	const [personalNoteDragVisual, setPersonalNoteDragVisual] = useState(null);
	const personalNoteDragFromRef = useRef(null);
	const personalNoteDragUserSelectRef = useRef(null);
	const personalNoteDragRafRef = useRef(null);
	const personalNoteDragPendingRef = useRef(null);
	const personalNoteAutoScrollRef = useRef(createViewportAutoScrollController());

	useEffect(
		() => () => {
			if (personalNoteDragRafRef.current != null) cancelAnimationFrame(personalNoteDragRafRef.current);
			personalNoteAutoScrollRef.current.stop();
		},
		[]
	);

	const onPersonalNoteDragHandlePointerDown = useCallback(
		(rowIndex, e) => {
			if (readOnly || e.button !== 0) return;
			e.preventDefault();
			e.stopPropagation();
			const rowEl = e.currentTarget.closest("[data-personal-note-row-index]");
			if (!rowEl || !personalNotesRowsContainerRef.current) return;
			const rect = rowEl.getBoundingClientRect();
			const grabOffsetY = e.clientY - rect.top;
			let slotPx = rect.height + 20;
			const nextEl = rowEl.nextElementSibling;
			if (nextEl?.hasAttribute?.("data-personal-note-row-index")) {
				slotPx = Math.max(1, nextEl.getBoundingClientRect().top - rect.top);
			}
			personalNoteDragFromRef.current = rowIndex;
			personalNoteDragUserSelectRef.current = document.body.style.userSelect;
			document.body.style.userSelect = "none";
			setPersonalNoteDragVisual({
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

	const onPersonalNoteDragHandlePointerMove = useCallback((e) => {
		if (personalNoteDragFromRef.current === null) return;
		e.preventDefault();
		personalNoteDragPendingRef.current = { clientY: e.clientY };
		personalNoteAutoScrollRef.current.update(e.clientY);
		if (personalNoteDragRafRef.current != null) return;
		personalNoteDragRafRef.current = requestAnimationFrame(() => {
			personalNoteDragRafRef.current = null;
			const p = personalNoteDragPendingRef.current;
			if (!p || personalNoteDragFromRef.current === null) return;
			const container = personalNotesRowsContainerRef.current;
			const over = container ? computePersonalNoteDropIndex(p.clientY, container) : personalNoteDragFromRef.current;
			setPersonalNoteDragVisual((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					overIndex: over,
					floatTop: p.clientY - prev.grabOffsetY,
				};
			});
		});
	}, []);

	const onPersonalNoteDragHandlePointerUp = useCallback(
		(e) => {
			document.body.style.userSelect = personalNoteDragUserSelectRef.current ?? "";
			personalNoteDragUserSelectRef.current = null;
			if (personalNoteDragRafRef.current != null) {
				cancelAnimationFrame(personalNoteDragRafRef.current);
				personalNoteDragRafRef.current = null;
			}
			personalNoteAutoScrollRef.current.stop();
			personalNoteDragPendingRef.current = null;
			if (personalNoteDragFromRef.current === null) return;
			const from = personalNoteDragFromRef.current;
			personalNoteDragFromRef.current = null;
			try {
				e.currentTarget.releasePointerCapture(e.pointerId);
			} catch {
				/* ignore */
			}
			setPersonalNoteDragVisual(null);
			const container = personalNotesRowsContainerRef.current;
			const to = container ? computePersonalNoteDropIndex(e.clientY, container) : from;
			reorderPersonalNoteItems?.(from, to);
		},
		[reorderPersonalNoteItems]
	);

	const onPersonalNoteDragHandlePointerCancel = useCallback((e) => {
		document.body.style.userSelect = personalNoteDragUserSelectRef.current ?? "";
		personalNoteDragUserSelectRef.current = null;
		personalNoteDragFromRef.current = null;
		if (personalNoteDragRafRef.current != null) {
			cancelAnimationFrame(personalNoteDragRafRef.current);
			personalNoteDragRafRef.current = null;
		}
		personalNoteAutoScrollRef.current.stop();
		personalNoteDragPendingRef.current = null;
		setPersonalNoteDragVisual(null);
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch {
			/* ignore */
		}
	}, []);

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
		<div className={`${styles.rightColumn} ${fullWidth ? styles.rightColumnFullWidth : ""}`}>
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
			{(!readOnly || isOwner) && (
			<div className={styles.notesCard}>
				<div className={styles.notesTitleRow}>
					<Image src="/icons/images/Star.svg" alt="" width={24} height={24} className={styles.icon24} />
					<h3 className={`title_2 ${styles.notesTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Личные заметки
					</h3>
				</div>
				<div ref={personalNotesRowsContainerRef} className={styles.notesItemsWrap}>
					{personalNotesItems.map((item, i) => {
						const isEmpty = !(item.text || "").trim();
						const showDelete = !readOnly && canShowDeleteOnEmpty && isEmpty;
						const d = personalNoteDragVisual;
						const from = d?.fromIndex ?? -1;
						const over = d?.overIndex ?? -1;
						const slot = d?.slotPx ?? 0;
						return (
							<CheckplanPersonalNoteRow
								key={i}
								item={item}
								rowIndex={i}
								readOnly={readOnly}
								showDelete={showDelete}
								onTextChange={(e) => updatePersonalNoteItem(i, { text: e.target.value })}
								onRemove={() => removePersonalNoteItem(i)}
								onPersonalNoteDragHandlePointerDown={onPersonalNoteDragHandlePointerDown}
								onPersonalNoteDragHandlePointerMove={onPersonalNoteDragHandlePointerMove}
								onPersonalNoteDragHandlePointerUp={onPersonalNoteDragHandlePointerUp}
								onPersonalNoteDragHandlePointerCancel={onPersonalNoteDragHandlePointerCancel}
								personalNoteRowDragShiftPx={budgetRowSiblingShiftPx(i, from, over, slot)}
								personalNoteRowIsDragSource={d != null && d.fromIndex === i}
								personalNoteRowIsDropTarget={d != null && d.fromIndex !== d.overIndex && d.overIndex === i}
								personalNoteRowShiftTransition={d != null}
							/>
						);
					})}
					{personalNoteDragVisual && personalNotesItems[personalNoteDragVisual.fromIndex] != null && (
						<PersonalNotesDragFloatRow
							top={personalNoteDragVisual.floatTop}
							left={personalNoteDragVisual.floatLeft}
							width={personalNoteDragVisual.floatWidth}
							text={personalNotesItems[personalNoteDragVisual.fromIndex]?.text}
						/>
					)}
				</div>
				<div className={styles.bulletList}>
					{PERSONAL_NOTES.map((text, i) => (
						<div key={`fixed-${i}`} className={`paragraph ${styles.bulletItem}`} style={{ color: "var(--grayscale-dark-gray)" }}>
							{text}
						</div>
					))}
					{!readOnly && (
						<CheckplanAddRowButton onClick={addPersonalNoteItem} disabled={!canAddItem(personalNotesItems)} />
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
							isPreview={isPreview}
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
							isPreview={isPreview}
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
