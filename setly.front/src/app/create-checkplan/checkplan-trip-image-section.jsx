"use client";
/* eslint-disable @next/next/no-img-element -- обложка: динамический URL / storage */

import { memo } from "react";
import styles from "./create-checkplan.module.css";

export const TripImageSection = memo(function TripImageSection({
	coverImage,
	coverLoading,
	coverError,
	coverInputRef,
	onCoverChange,
	onCoverClick,
	readOnly = false,
}) {
	return (
		<div className={styles.tripImageWrap}>
			<div className={styles.coverImageLayer}>
				<img src={coverImage} alt="Обложка поездки" className={styles.tripImage} />
			</div>
			{coverLoading && (
				<div className={styles.coverLoadingOverlay} aria-live="polite">
					Загрузка…
				</div>
			)}
			{coverError && <span className={styles.coverErrorText}>{coverError}</span>}
			{!readOnly && (
				<div
					className={styles.coverUploadTrigger}
					onClick={onCoverClick}
					onKeyDown={(e) => e.key === "Enter" && onCoverClick()}
					role="button"
					tabIndex={0}
					aria-label="Загрузить обложку"
				>
					<input
						ref={coverInputRef}
						type="file"
						accept="image/*"
						className={styles.coverHiddenInput}
						aria-hidden
						onChange={onCoverChange}
					/>
				</div>
			)}
		</div>
	);
});
