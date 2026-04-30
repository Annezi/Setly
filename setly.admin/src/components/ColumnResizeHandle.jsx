"use client";

/**
 * Ручка изменения ширины столбца таблицы (правый край заголовка).
 */
export default function ColumnResizeHandle({ onMouseDown }) {
  return (
    <span
      role="separator"
      aria-hidden
      title="Потяните, чтобы изменить ширину столбца"
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown(e);
      }}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 20,
        height: "100%",
        cursor: "col-resize",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        color: "var(--color-text-muted)",
      }}
    >
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.85, pointerEvents: "none" }}
      >
        <circle cx="4" cy="3" r="1.35" fill="currentColor" />
        <circle cx="8" cy="3" r="1.35" fill="currentColor" />
        <circle cx="4" cy="8" r="1.35" fill="currentColor" />
        <circle cx="8" cy="8" r="1.35" fill="currentColor" />
        <circle cx="4" cy="13" r="1.35" fill="currentColor" />
        <circle cx="8" cy="13" r="1.35" fill="currentColor" />
      </svg>
    </span>
  );
}
