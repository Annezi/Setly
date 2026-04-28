"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createViewportAutoScrollController } from "@/app/lib/drag-auto-scroll";

/** Индекс вставки по Y внутри контейнера строк; attrName — data-* на корне каждой строки */
export function computeIndexedRowDropIndex(clientY, containerEl, attrName) {
  if (!containerEl) return 0;
  const rowEls = [...containerEl.querySelectorAll(`[${attrName}]`)];
  if (rowEls.length === 0) return 0;
  for (let i = 0; i < rowEls.length; i++) {
    const r = rowEls[i].getBoundingClientRect();
    const mid = r.top + r.height / 2;
    if (clientY < mid) {
      return Number.parseInt(rowEls[i].getAttribute(attrName) ?? "0", 10) || 0;
    }
  }
  return Number.parseInt(rowEls[rowEls.length - 1].getAttribute(attrName) ?? "0", 10) || 0;
}

/**
 * Как computeIndexedRowDropIndex, но только по строкам внутри одной секции;
 * если курсор выше/ниже блока секции — зажимаем к первой/последней строке.
 */
export function computeSectionRowDropIndex(clientY, sectionBodyEl) {
  if (!sectionBodyEl) return 0;
  const attr = "data-rowlist-row-index";
  const rowEls = [...sectionBodyEl.querySelectorAll(`[${attr}]`)];
  if (rowEls.length === 0) return 0;
  const bounds = sectionBodyEl.getBoundingClientRect();
  const firstIdx = Number.parseInt(rowEls[0].getAttribute(attr) ?? "0", 10) || 0;
  const lastIdx =
    Number.parseInt(rowEls[rowEls.length - 1].getAttribute(attr) ?? "0", 10) || rowEls.length - 1;
  if (clientY < bounds.top) return firstIdx;
  if (clientY > bounds.bottom) return lastIdx;
  return computeIndexedRowDropIndex(clientY, sectionBodyEl, attr);
}

export function useSectionedRowListDrag({ readOnly, rootRef, reorderInSection }) {
  const [rowlistDragVisual, setRowlistDragVisual] = useState(null);
  const rowlistDragFromRef = useRef(null);
  const rowlistDragSectionKeyRef = useRef(null);
  const rowlistDragUserSelectRef = useRef(null);
  const rowlistDragRafRef = useRef(null);
  const rowlistDragPendingRef = useRef(null);
  const autoScrollRef = useRef(createViewportAutoScrollController());

  useEffect(
    () => () => {
      if (rowlistDragRafRef.current != null) cancelAnimationFrame(rowlistDragRafRef.current);
      autoScrollRef.current.stop();
    },
    []
  );

  const onRowlistDragHandlePointerDown = useCallback(
    (sectionKey, rowIndex, e) => {
      if (readOnly || e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const rowEl = e.currentTarget.closest("[data-rowlist-row-index]");
      const sectionBody = rowEl?.closest("[data-rowlist-section-body]");
      if (!rowEl || !sectionBody) return;
      const sk = sectionBody.getAttribute("data-rowlist-section-key");
      if (sk !== sectionKey) return;
      const rect = rowEl.getBoundingClientRect();
      const grabOffsetY = e.clientY - rect.top;
      let slotPx = rect.height + 20;
      const nextEl = rowEl.nextElementSibling;
      if (nextEl?.hasAttribute?.("data-rowlist-row-index")) {
        slotPx = Math.max(1, nextEl.getBoundingClientRect().top - rect.top);
      }
      rowlistDragFromRef.current = rowIndex;
      rowlistDragSectionKeyRef.current = sectionKey;
      rowlistDragUserSelectRef.current = document.body.style.userSelect;
      document.body.style.userSelect = "none";
      setRowlistDragVisual({
        sectionKey,
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

  const onRowlistDragHandlePointerMove = useCallback(
    (e) => {
      if (rowlistDragFromRef.current === null || !rowlistDragSectionKeyRef.current) return;
      e.preventDefault();
      rowlistDragPendingRef.current = { clientY: e.clientY };
      autoScrollRef.current.update(e.clientY);
      if (rowlistDragRafRef.current != null) return;
      rowlistDragRafRef.current = requestAnimationFrame(() => {
        rowlistDragRafRef.current = null;
        const p = rowlistDragPendingRef.current;
        const sk = rowlistDragSectionKeyRef.current;
        if (!p || sk == null || rowlistDragFromRef.current === null) return;
        const body = rootRef.current?.querySelector(
          `[data-rowlist-section-body][data-rowlist-section-key="${sk}"]`
        );
        const over = body ? computeSectionRowDropIndex(p.clientY, body) : rowlistDragFromRef.current;
        setRowlistDragVisual((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            overIndex: over,
            floatTop: p.clientY - prev.grabOffsetY,
          };
        });
      });
    },
    [rootRef]
  );

  const onRowlistDragHandlePointerUp = useCallback(
    (e) => {
      document.body.style.userSelect = rowlistDragUserSelectRef.current ?? "";
      rowlistDragUserSelectRef.current = null;
      if (rowlistDragRafRef.current != null) {
        cancelAnimationFrame(rowlistDragRafRef.current);
        rowlistDragRafRef.current = null;
      }
      autoScrollRef.current.stop();
      rowlistDragPendingRef.current = null;
      const sk = rowlistDragSectionKeyRef.current;
      const from = rowlistDragFromRef.current;
      rowlistDragSectionKeyRef.current = null;
      rowlistDragFromRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      setRowlistDragVisual(null);
      if (sk == null || from == null) return;
      const body = rootRef.current?.querySelector(
        `[data-rowlist-section-body][data-rowlist-section-key="${sk}"]`
      );
      const to = body ? computeSectionRowDropIndex(e.clientY, body) : from;
      reorderInSection(sk, from, to);
    },
    [rootRef, reorderInSection]
  );

  const onRowlistDragHandlePointerCancel = useCallback((e) => {
    document.body.style.userSelect = rowlistDragUserSelectRef.current ?? "";
    rowlistDragUserSelectRef.current = null;
    rowlistDragSectionKeyRef.current = null;
    rowlistDragFromRef.current = null;
    if (rowlistDragRafRef.current != null) {
      cancelAnimationFrame(rowlistDragRafRef.current);
      rowlistDragRafRef.current = null;
    }
    autoScrollRef.current.stop();
    rowlistDragPendingRef.current = null;
    setRowlistDragVisual(null);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    rowlistDragVisual,
    onRowlistDragHandlePointerDown,
    onRowlistDragHandlePointerMove,
    onRowlistDragHandlePointerUp,
    onRowlistDragHandlePointerCancel,
  };
}

/** Сдвиг соседних строк при перетаскивании (бюджет и секционные списки). */
export function budgetRowSiblingShiftPx(rowIndex, from, over, slotPx) {
  if (from < 0 || over < 0 || !(slotPx > 0)) return 0;
  if (rowIndex === from) return 0;
  if (from < over) {
    if (rowIndex > from && rowIndex <= over) return -slotPx;
  } else if (from > over) {
    if (rowIndex >= over && rowIndex < from) return slotPx;
  }
  return 0;
}
