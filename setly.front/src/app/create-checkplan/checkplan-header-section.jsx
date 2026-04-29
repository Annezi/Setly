"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import checkPlansStyles from "@/app/components/blocks/check-plans/plans/check-plans/check-plans.module.css";
import { TYPE_OPTIONS, TRAVELER_OPTIONS } from "./create-checkplan-data";
import { TripImageSection } from "./checkplan-trip-image-section";
import styles from "./create-checkplan.module.css";

export const CheckplanHeaderSection = memo(function CheckplanHeaderSection({
	isPreview,
	fromAccount,
	readOnly,
	planTitle,
	description,
	titleRef,
	descriptionRef,
	setPlanTitle,
	setDescription,
	adjustTitleHeight,
	adjustDescriptionHeight,
	currentVisibility,
	creatorAvatar,
	creatorName,
	creatorProfileHref,
	handleHeaderLikeClick,
	canLikeFromHeader,
	headerLiked,
	likesLabel,
	datesLabel,
	datesDropdownContent,
	datesRange,
	locationLabel,
	locationDropdownContent,
	typeIndex,
	setTypeIndex,
	peopleIndex,
	setPeopleIndex,
	coverImage,
	coverLoading,
	coverError,
	coverInputRef,
	handleCoverFileChange,
	handleCoverClick,
}) {
	const backHref = isPreview
		? (fromAccount ? "/account" : "/check-plans")
		: (readOnly ? (fromAccount ? "/account" : "/check-plans") : "/account");
	const backLabel = "Назад";
	const backAriaLabel = isPreview
		? (fromAccount ? "Назад в личный кабинет" : "Назад к чек-планам")
		: (readOnly ? (fromAccount ? "Назад в личный кабинет" : "Назад к чек-планам") : "Назад в личный кабинет");

	return (
		<>
			<Link href={backHref} className={styles.backRow} aria-label={backAriaLabel}>
				<span className={styles.backButton}>
					<Image src="/icons/system/ArrowLeft.svg" alt="" width={20} height={20} className={styles.icon20} />
				</span>
				<span className={`${styles.backLabel} subinfo`} style={{ color: "var(--grayscale-dark-gray)" }}>
					{backLabel}
				</span>
			</Link>

			<div className={styles.topRow}>
				<div className={`${styles.card} ${readOnly ? styles.cardReadOnly : ""}`} data-main-info-card>
					<div className={styles.cardMain}>
						{readOnly ? (
							<>
								<h1 className={styles.cardTitleTextarea} style={{ resize: "none", border: "none", background: "transparent", padding: 0 }}>
									{planTitle || "Без названия"}
								</h1>
								<p className={`subinfo ${styles.cardDescriptionTextarea}`} style={{ resize: "none", border: "none", background: "transparent", padding: 0 }}>
									{description || "—"}
								</p>
							</>
						) : (
							<>
								<textarea
									ref={titleRef}
									className={styles.cardTitleTextarea}
									placeholder="Введите название"
									value={planTitle}
									onChange={(e) => setPlanTitle(e.target.value.slice(0, 50))}
									onInput={adjustTitleHeight}
									rows={1}
									maxLength={26}
									aria-label="Название чеклиста"
								/>
								<textarea
									ref={descriptionRef}
									className={`subinfo ${styles.cardDescriptionTextarea}`}
									placeholder="Введите описание"
									value={description}
									onChange={(e) => setDescription(e.target.value.slice(0, 200))}
									onInput={adjustDescriptionHeight}
									rows={1}
									maxLength={120}
									aria-label="Описание чеклиста"
								/>
							</>
						)}
						<p className="subinfo" style={{ color: "var(--grayscale-gray)" }}>
							{currentVisibility === "public" ? "Публичный чек-план" : "Приватный чек-план"}
						</p>
						<div className={styles.cardAuthorLikesRow}>
							<div className={styles.cardAuthorRow}>
								<Image
									src={creatorAvatar}
									alt={creatorName}
									width={24}
									height={24}
									className={styles.cardAuthorAvatar}
									unoptimized={typeof creatorAvatar === "string" && creatorAvatar.startsWith("http")}
								/>
								{creatorProfileHref ? (
									<Link href={creatorProfileHref} className={`paragraph ${styles.cardAuthorName}`}>
										{creatorName}
									</Link>
								) : (
									<span className={`paragraph ${styles.cardAuthorName}`}>{creatorName}</span>
								)}
							</div>
							<button
								type="button"
								className={checkPlansStyles.likesRow}
								onClick={handleHeaderLikeClick}
								aria-pressed={canLikeFromHeader ? headerLiked : undefined}
								aria-disabled={!canLikeFromHeader}
							>
								<Image
									src={headerLiked ? "/icons/images/HeartFull.svg" : "/icons/images/Heart.svg"}
									alt=""
									width={20}
									height={20}
									className={checkPlansStyles.likesIcon}
								/>
								<span className={checkPlansStyles.likesCount}>{likesLabel}</span>
							</button>
						</div>
						<div className={styles.datesBlock}>
							<div className={styles.cardDropdownRow}>
								<div className={styles.cardDropdownLabel}>
									<Image src="/icons/images/Calender.svg" alt="" width={20} height={20} />
									<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Даты:</span>
								</div>
								<div className={styles.cardDropdown}>
									{readOnly ? (
										<span className="subinfo">{datesLabel || "—"}</span>
									) : (
										<Dropdown
											text={datesLabel}
											items={[]}
											dropdownContent={datesDropdownContent}
											bgView={false}
											hasValue={datesRange[0] != null && datesRange[1] != null}
											mobileAdaptiveMenu
											mobileAdaptiveBreakpoint={900}
											mobileFullWidthBreakpoint={900}
											mobileAdaptiveNoHeightClamp
											menuMatchContainerSelector="[data-main-info-card]"
											mobileAlignToContainerLeft
											mobileAlignPanelToTriggerIfWide
											dropdownMenuClassName={styles.datesDropdownMenu}
										/>
									)}
								</div>
							</div>
							<div className={styles.cardDropdownRow}>
								<div className={styles.cardDropdownLabel}>
									<Image src="/icons/images/Location.svg" alt="" width={20} height={20} />
									<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Место:</span>
								</div>
								<div className={styles.cardDropdown}>
									{readOnly ? (
										<span className="subinfo">{locationLabel || "Не выбрано"}</span>
									) : (
										<Dropdown
											text={locationLabel || "Не выбрано"}
											items={[]}
											dropdownContent={locationDropdownContent}
											hasValue={!!locationLabel}
											mobileAdaptiveMenu
											mobileAdaptiveBreakpoint={899}
											mobileFullWidthBreakpoint={768}
											mobileAdaptiveNoHeightClamp
											menuMatchContainerSelector="[data-main-info-card]"
											mobileAlignToContainerLeft
											dropdownMenuClassName={styles.cardInfoDropdownMenu}
										/>
									)}
								</div>
							</div>
							<div className={styles.cardDropdownRow}>
								<div className={styles.cardDropdownLabel}>
									<Image src="/icons/images/Aeroplane.svg" alt="" width={20} height={20} />
									<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Тип:</span>
								</div>
								<div className={styles.cardDropdown}>
									{readOnly ? (
										<span className="subinfo">{typeIndex >= 0 ? TYPE_OPTIONS[typeIndex] : "Не выбрано"}</span>
									) : (
										<Dropdown
											text={typeIndex >= 0 ? TYPE_OPTIONS[typeIndex] : "Не выбрано"}
											items={TYPE_OPTIONS}
											selectedIndex={typeIndex}
											onSelect={(i) => setTypeIndex(i)}
											mobileAdaptiveMenu
											mobileAdaptiveBreakpoint={899}
											mobileFullWidthBreakpoint={768}
											menuMatchContainerSelector="[data-main-info-card]"
											mobileAlignToContainerLeft
											dropdownMenuClassName={styles.cardInfoDropdownMenu}
										/>
									)}
								</div>
							</div>
							<div className={styles.cardDropdownRow}>
								<div className={styles.cardDropdownLabel}>
									<Image src="/icons/images/UsersBig.svg" alt="" width={20} height={20} />
									<span className="subtitle_2" style={{ color: "var(--grayscale-dark-gray)" }}>Люди:</span>
								</div>
								<div className={styles.cardDropdown}>
									{readOnly ? (
										<span className="subinfo">{peopleIndex >= 0 ? TRAVELER_OPTIONS[peopleIndex] : "Не выбрано"}</span>
									) : (
										<Dropdown
											text="Не выбрано"
											items={TRAVELER_OPTIONS}
											selectedIndex={peopleIndex}
											onSelect={(i) => setPeopleIndex(i)}
											mobileAdaptiveMenu
											mobileAdaptiveBreakpoint={899}
											mobileFullWidthBreakpoint={768}
											menuMatchContainerSelector="[data-main-info-card]"
											mobileAlignToContainerLeft
											dropdownMenuClassName={styles.cardInfoDropdownMenu}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<TripImageSection
					coverImage={coverImage}
					coverLoading={coverLoading}
					coverError={coverError}
					coverInputRef={coverInputRef}
					onCoverChange={readOnly ? undefined : handleCoverFileChange}
					onCoverClick={readOnly ? undefined : handleCoverClick}
					readOnly={readOnly}
				/>
			</div>
		</>
	);
});
