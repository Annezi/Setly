"use client";

import { useState, useCallback } from "react";
import { useAnimatedClosing } from "./use-animated-closing";

export function useCheckplanDeleteTargets({ setContentBlocks, removeContentBlock }) {
	const [deleteBlockTarget, setDeleteBlockTarget] = useState(null); // { index, type }
	const [deleteConfirmClosing, setDeleteConfirmClosing] = useState(false);
	const [deleteRowTarget, setDeleteRowTarget] = useState(null); // { blockIndex, rowIndex }
	const [deleteRowConfirmClosing, setDeleteRowConfirmClosing] = useState(false);

	const openDeleteBlockConfirm = useCallback((index, blockType) => {
		setDeleteBlockTarget({ index, type: blockType });
	}, []);

	const closeDeleteConfirm = useAnimatedClosing(
		setDeleteConfirmClosing,
		useCallback(() => {
			setDeleteBlockTarget(null);
		}, [])
	);

	const confirmDeleteBlock = useCallback(() => {
		if (deleteBlockTarget != null) {
			removeContentBlock(deleteBlockTarget.index);
		}
		closeDeleteConfirm();
	}, [closeDeleteConfirm, deleteBlockTarget, removeContentBlock]);

	const openDeleteRowConfirm = useCallback((blockIndex, rowIndex) => {
		setDeleteRowTarget({ blockIndex, rowIndex });
	}, []);

	const closeDeleteRowConfirm = useAnimatedClosing(
		setDeleteRowConfirmClosing,
		useCallback(() => {
			setDeleteRowTarget(null);
		}, [])
	);

	const removeBudgetRow = useCallback((blockIndex, rowIndex) => {
		setContentBlocks((prev) => {
			const next = [...prev];
			const block = next[blockIndex];
			if (block?.type !== "budgetTable" || !block.rows || block.rows.length <= 1) return prev;
			const newRows = block.rows.filter((_, i) => i !== rowIndex);
			next[blockIndex] = { ...block, rows: newRows };
			return next;
		});
	}, [setContentBlocks]);

	const confirmDeleteRow = useCallback(() => {
		if (deleteRowTarget != null) {
			removeBudgetRow(deleteRowTarget.blockIndex, deleteRowTarget.rowIndex);
		}
		closeDeleteRowConfirm();
	}, [closeDeleteRowConfirm, deleteRowTarget, removeBudgetRow]);

	return {
		deleteBlockTarget,
		deleteConfirmClosing,
		deleteRowTarget,
		deleteRowConfirmClosing,
		openDeleteBlockConfirm,
		closeDeleteConfirm,
		confirmDeleteBlock,
		openDeleteRowConfirm,
		closeDeleteRowConfirm,
		confirmDeleteRow,
	};
}
