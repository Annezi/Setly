"use client";

import { memo } from "react";
import Image from "next/image";
import { PERSONAL_NOTES, SUGGESTION_LINKS } from "./create-checkplan-data";
import { canAddItem } from "./create-checkplan-utils";
import { BudgetTableBlockCard } from "./budget-table-block-card";
import { CheckplanAddRowButton } from "./checkplan-add-row-button";
import { CheckplanPersonalNoteRow } from "./checkplan-editable-rows";
import { TextBlockCard } from "./checkplan-text-block-card";
import { UsefulContactsBlockCard } from "./useful-contacts-block-card";
import { WhereToGoBlockCard } from "./where-to-go-block-card";
import styles from "./create-checkplan.module.css";

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
				<div className={styles.notesItemsWrap}>
					{personalNotesItems.map((item, i) => {
						const isEmpty = !(item.text || "").trim();
						const showDelete = !readOnly && canShowDeleteOnEmpty && isEmpty;
						return (
							<CheckplanPersonalNoteRow
								key={i}
								item={item}
								readOnly={readOnly}
								showDelete={showDelete}
								onTextChange={(e) => updatePersonalNoteItem(i, { text: e.target.value })}
								onRemove={() => removePersonalNoteItem(i)}
							/>
						);
					})}
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
