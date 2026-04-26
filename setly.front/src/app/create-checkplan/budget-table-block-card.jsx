"use client";
/* eslint-disable @next/next/no-img-element -- иконки внутри вынесенного блока редактора */

import { memo, useState, useCallback, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { CheckplanAddRowButton } from "./checkplan-add-row-button";
import { ContentBlockToolbar } from "./content-block-toolbar";
import styles from "./create-checkplan.module.css";
import { computeIndexedRowDropIndex, budgetRowSiblingShiftPx } from "./sectioned-row-list-drag";
import { DEFAULT_BUDGET_ROWS_FALLBACK, parseBudgetNumber } from "./budget-table-constants";

function onlyNumericValue(v) {
	const s = String(v ?? "").replace(",", ".");
	const hasMinus = s.startsWith("-");
	const parts = s.replace("-", "").split(".");
	const intPart = (parts[0] ?? "").replace(/\D/g, "");
	const decPart = parts.length > 1 ? (parts[1] ?? "").replace(/\D/g, "").slice(0, 2) : "";
	if (parts.length > 2) return hasMinus ? `-${intPart}.${decPart}` : `${intPart}.${decPart}`;
	if (decPart === "") return hasMinus ? `-${intPart}` : intPart;
	return hasMinus ? `-${intPart}.${decPart}` : `${intPart}.${decPart}`;
}

function computeBudgetDropIndex(clientY, containerEl) {
	return computeIndexedRowDropIndex(clientY, containerEl, "data-budget-row-index");
}

const BudgetTableDragFloatRow = memo(function BudgetTableDragFloatRow({ top, left, width, row }) {
	if (typeof document === "undefined") return null;
	return createPortal(
		<div className={styles.budgetTableRowFloatRoot} style={{ top, left, width }}>
			<div className={styles.budgetTableRowFloatInner}>
				<div className={styles.budgetTableRow}>
					<div className={styles.budgetTableRowDragHandle} aria-hidden>
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
						icon={<img src="/icons/system/Cross.svg" alt="" width={20} height={20} />}
						aria-label="Удалить ряд"
						onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRequestRemove(); }}
					/>
				)}
			</div>
		</div>
	);
});

export const BudgetTableBlockCard = memo(function BudgetTableBlockCard({
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
	const rows = useMemo(() => block.rows ?? DEFAULT_BUDGET_ROWS_FALLBACK, [block.rows]);
	const rowsRef = useRef(rows);
	useEffect(() => {
		rowsRef.current = rows;
	}, [rows]);

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
		<div className={`${styles.budgetTableWrap} ${styles.contentBlockToolbarHost}`} data-block-id={block.id}>
			<div className={styles.budgetTable}>
				<div className={styles.whereToGoTitleRow}>
					<h3 className={`title_2 ${styles.whereToGoTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Таблица бюджета
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
				{!readOnly && <CheckplanAddRowButton onClick={addRow} />}
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
