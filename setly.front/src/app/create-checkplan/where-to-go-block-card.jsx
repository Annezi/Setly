"use client";
/* eslint-disable @next/next/no-img-element -- иконки внутри вынесенного блока редактора */

import { memo, useState, useRef, useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { CheckplanAddRowButton, CheckplanAddSectionTitleButton } from "./checkplan-add-row-button";
import { CheckplanSectionHeadingDelete } from "./checkplan-section-heading-delete";
import { ContentBlockToolbar } from "./content-block-toolbar";
import styles from "./create-checkplan.module.css";
import { useSectionedRowListDrag, budgetRowSiblingShiftPx } from "./sectioned-row-list-drag";
import {
  WHERE_TO_GO_SECTIONS,
  DEFAULT_WHERE_TO_GO_SECTION_ROWS,
  EMPTY_REMOVED_WHERE_KEYS,
  canAddWhereToGoRow,
} from "./where-to-go-constants";

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

export const WhereToGoDragFloatRow = memo(function WhereToGoDragFloatRow({ top, left, width, rowIndex, row }) {
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

export const WhereToGoSectionRow = memo(function WhereToGoSectionRow({
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
						icon={<img src="/icons/system/Cross.svg" alt="" width={20} height={20} />}
						aria-label="Удалить пункт"
						onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove?.(); }}
					/>
				)}
			</div>
		</div>
	);
});

export const WhereToGoBlockCard = memo(function WhereToGoBlockCard({
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
	const sections = useMemo(
		() => block.sections ?? DEFAULT_WHERE_TO_GO_SECTION_ROWS,
		[block.sections]
	);
	const removedWhereToGoSectionKeys = useMemo(
		() => block.removedWhereToGoSectionKeys ?? EMPTY_REMOVED_WHERE_KEYS,
		[block.removedWhereToGoSectionKeys]
	);

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
		<div ref={rowlistRootRef} className={`${styles.whereToGoBlockWrap} ${styles.contentBlockToolbarHost}`} data-block-id={block.id}>
			<div className={styles.whereToGoBlock}>
				<div className={styles.whereToGoTitleRow}>
					<h3 className={`title_2 ${styles.whereToGoTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Заметки куда сходить
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
										<CheckplanSectionHeadingDelete sectionTitle={title} onRemove={() => removeWhereToGoSection(key)} />
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
					{!readOnly && removedWhereToGoSectionKeys.length > 0 && (
						<div className={`${styles.whereToGoSection} ${styles.usefulContactsAddSections}`}>
							{WHERE_TO_GO_SECTIONS.filter((s) => removedWhereToGoSectionKeys.includes(s.key)).map((init) => (
								<CheckplanAddSectionTitleButton
									key={init.key}
									quotedTitle={init.title}
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
