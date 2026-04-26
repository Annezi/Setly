"use client";

import { memo, useCallback } from "react";
import DecoratedInput from "@/app/components/atomic/molecules/decorated-input/decorated-input";
import { ContentBlockToolbar } from "./content-block-toolbar";
import styles from "./create-checkplan.module.css";

export const TextBlockCard = memo(function TextBlockCard({
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
	const onUpdate = useCallback((updates) => updateContentBlock(index, updates), [updateContentBlock, index]);
	const onMoveUp = useCallback(() => moveContentBlockUp(index), [moveContentBlockUp, index]);
	const onMoveDown = useCallback(() => moveContentBlockDown(index), [moveContentBlockDown, index]);
	const onRemove = useCallback(() => onRequestRemoveContentBlock(index, block.type), [onRequestRemoveContentBlock, index, block.type]);

	return (
		<div className={`${styles.textBlockWrap} ${styles.contentBlockToolbarHost}`} data-block-id={block.id}>
			<div className={styles.textBlock}>
				<div className={styles.textBlockTitleRow}>
					<div className={styles.textBlockTitleCell}>
						{readOnly ? (
							<span className={`title_2 ${styles.textBlockTitleInput}`} style={{ color: "var(--grayscale-dark-gray)" }}>{block.title || "—"}</span>
						) : (
							<DecoratedInput
								decorator="none"
								multiline
								placeholder="Введите название блока..."
								value={block.title}
								onChange={(e) => onUpdate({ title: e.target.value })}
								className={styles.textBlockTitleInput}
								inputTextClass="title_2"
								maxLength={32}
							/>
						)}
					</div>
					<ContentBlockToolbar
						readOnly={readOnly}
						canMoveUp={canMoveUp}
						canMoveDown={canMoveDown}
						onMoveUp={onMoveUp}
						onMoveDown={onMoveDown}
						onRemove={onRemove}
					/>
				</div>
				{readOnly ? (
					<p className={`paragraph ${styles.textBlockDescInput} ${styles.textBlockDescReadOnly}`} style={{ color: "var(--grayscale-dark-gray)", margin: 0 }}>{block.description || "—"}</p>
				) : (
					<DecoratedInput
						decorator="none"
						multiline
						placeholder="Тут можно написать что угодно, например любой длинный текст"
						value={block.description}
						onChange={(e) => onUpdate({ description: e.target.value })}
						className={styles.textBlockDescInput}
						inputTextClass="paragraph"
					/>
				)}
			</div>
		</div>
	);
});
