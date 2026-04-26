"use client";

import { memo } from "react";
import Image from "next/image";
import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import { HAND_LUGGAGE_ITEMS, LUGGAGE_ITEMS, SORT_ITEMS } from "./create-checkplan-data";
import { canAddItem } from "./create-checkplan-utils";
import { CheckplanAddRowButton } from "./checkplan-add-row-button";
import { CheckplanChecklistCheckboxRow } from "./checkplan-editable-rows";
import styles from "./create-checkplan.module.css";

export const ChecklistSection = memo(function ChecklistSection({
	handLuggageItems,
	updateHandLuggageItem,
	addHandLuggageItem,
	removeHandLuggageItem,
	luggageItems,
	updateLuggageItem,
	addLuggageItem,
	removeLuggageItem,
	sortIndex,
	setSortIndex,
	readOnly = false,
	isPreview = false,
	allowToggleInReadOnly = false,
}) {
	const showSortDropdown = !readOnly && !isPreview;
	const showSortDropdownArea = !isPreview;
	const canShowDeleteHand = handLuggageItems.length >= 2;
	const canShowDeleteLuggage = luggageItems.length >= 2;
	const canToggleCheckboxesOnly = readOnly && isPreview && allowToggleInReadOnly;

	return (
		<div className={styles.checklistCard}>
			<div className={styles.checklistTitleRow}>
				<Image src="/icons/images/TrolleyBag.svg" alt="" width={24} height={24} className={styles.icon24} />
				<h2 className={`title_2 ${styles.checklistTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
					Что взять с собой
				</h2>
			</div>
			{(sortIndex === 0 || sortIndex === 1) && (
				<div className={styles.checklistGroup}>
					<h3 className={`subtitle_1 ${styles.sectionTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Ручная кладь
					</h3>
					{HAND_LUGGAGE_ITEMS.map((text, i) => (
						<div key={`fixed-${i}`} className={styles.checkboxItem}>
							<div className={styles.checkbox} aria-hidden />
							<span className={`paragraph ${styles.checkboxText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								{text}
							</span>
						</div>
					))}
					{handLuggageItems.map((item, i) => {
						const isEmpty = !(item.text || "").trim();
						const showDelete = !readOnly && canShowDeleteHand && isEmpty;
						return (
							<CheckplanChecklistCheckboxRow
								key={i}
								item={item}
								readOnly={readOnly}
								canToggleCheckboxesOnly={canToggleCheckboxesOnly}
								maxLength={92}
								showDelete={showDelete}
								onTextChange={(e) => updateHandLuggageItem(i, { text: e.target.value })}
								onCheckboxToggle={() => updateHandLuggageItem(i, { checked: !item.checked })}
								onRemove={() => removeHandLuggageItem(i)}
							/>
						);
					})}
					{!readOnly && (
						<CheckplanAddRowButton onClick={addHandLuggageItem} disabled={!canAddItem(handLuggageItems)} />
					)}
				</div>
			)}
			{sortIndex === 1 && (
				<div className={styles.checklistGroup}>
					<h3 className={`subtitle_1 ${styles.sectionTitle}`} style={{ color: "var(--grayscale-dark-gray)" }}>
						Багаж
					</h3>
					{LUGGAGE_ITEMS.map((text, i) => (
						<div key={`fixed-${i}`} className={styles.checkboxItem}>
							<div className={styles.checkbox} aria-hidden />
							<span className={`paragraph ${styles.checkboxText}`} style={{ color: "var(--grayscale-dark-gray)" }}>
								{text}
							</span>
						</div>
					))}
					{luggageItems.map((item, i) => {
						const isEmpty = !(item.text || "").trim();
						const showDelete = !readOnly && canShowDeleteLuggage && isEmpty;
						return (
							<CheckplanChecklistCheckboxRow
								key={i}
								item={item}
								readOnly={readOnly}
								canToggleCheckboxesOnly={canToggleCheckboxesOnly}
								maxLength={90}
								showDelete={showDelete}
								onTextChange={(e) => updateLuggageItem(i, { text: e.target.value })}
								onCheckboxToggle={() => updateLuggageItem(i, { checked: !item.checked })}
								onRemove={() => removeLuggageItem(i)}
							/>
						);
					})}
					{!readOnly && (
						<CheckplanAddRowButton onClick={addLuggageItem} disabled={!canAddItem(luggageItems)} />
					)}
				</div>
			)}
			{showSortDropdownArea && (
				<div className={styles.sortDropdownWrap}>
					{showSortDropdown ? (
						<Dropdown
							text={SORT_ITEMS[sortIndex]}
							items={SORT_ITEMS}
							selectedIndex={sortIndex}
							onSelect={setSortIndex}
							menuCentered
						/>
					) : (
						<span className="subinfo" style={{ color: "var(--grayscale-dark-gray)" }}>{SORT_ITEMS[sortIndex]}</span>
					)}
				</div>
			)}
		</div>
	);
});
