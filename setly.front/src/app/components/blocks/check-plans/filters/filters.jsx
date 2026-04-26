"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import PublicImage from "@/app/components/globals/public-image";
import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import DropdownFilterMenu from "@/app/components/atomic/molecules/dropdown-filter-menu/dropdown-filter-menu";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import FilterTag from "@/app/components/atomic/atoms/filter-tag/filter-tag";
import styles from "./filters.module.css";
import { CHECK_PLANS_SORT_ITEMS } from "@/app/lib/checkplan-list-utils";

const FILTER_MENU_TRANSITION_MS = 350;

const FILTER_ICON_CLIP_ID = "filter-icon-clip";

function FilterIcon() {
  return (
    <span aria-hidden>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath={`url(#${FILTER_ICON_CLIP_ID})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.747151 4.4888C-0.865079 2.87383 0.292462 0 2.6257 0H17.3733C19.7066 0 20.8641 2.87381 19.2519 4.48878L19.249 4.49168L13.4275 10.3914V15.5493C13.4275 16.3778 13.0251 17.2566 12.2522 17.7359L9.39651 19.6967L9.38471 19.7047C8.74871 20.1281 8.01661 20.0552 7.49046 19.7447C6.97511 19.4406 6.57156 18.8626 6.57156 18.1538V10.3914L0.747151 4.4888ZM2.05521 2.40276C1.94879 2.66089 1.99741 2.91085 2.16334 3.07657L2.1685 3.08172L8.28341 9.27869C8.46801 9.46579 8.57161 9.71809 8.57161 9.98099V17.837L11.1421 16.0721C11.159 16.0604 11.1764 16.0493 11.1941 16.0387C11.3008 15.9747 11.4275 15.7878 11.4275 15.5493V9.98099C11.4275 9.71809 11.531 9.46579 11.7157 9.27869L17.8357 3.07655C18.0016 2.91083 18.0503 2.66089 17.9438 2.40276C17.8396 2.14985 17.6315 2 17.3733 2H2.6257C2.36759 2 2.15949 2.14985 2.05521 2.40276Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id={FILTER_ICON_CLIP_ID}>
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

export default function Filters({
  appliedFilterTags: controlledTags,
  onApplyFilters: onApplyFiltersProp,
  onRemoveAppliedTag: onRemoveAppliedTagProp,
  sortIndex,
  onSortSelect,
} = {}) {
  const [internalTags, setInternalTags] = useState([]);
  const isControlled = controlledTags != null && onApplyFiltersProp != null && onRemoveAppliedTagProp != null;
  const appliedFilterTags = isControlled ? controlledTags : internalTags;
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  useEffect(() => {
    if (!filterMenuOpen) return;
    const raf = requestAnimationFrame(() => {
      setFilterMenuVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [filterMenuOpen]);

  useEffect(() => {
    if (filterMenuOpen && !filterMenuVisible) {
      const t = setTimeout(() => setFilterMenuOpen(false), FILTER_MENU_TRANSITION_MS);
      return () => clearTimeout(t);
    }
  }, [filterMenuOpen, filterMenuVisible]);

  const closeFilterMenu = useCallback(() => setFilterMenuVisible(false), []);
  const openFilterMenu = useCallback(() => setFilterMenuOpen(true), []);

  const handleApplyFilters = useCallback(
    (tags) => {
      if (isControlled) onApplyFiltersProp(tags);
      else setInternalTags(tags);
    },
    [isControlled, onApplyFiltersProp]
  );

  const removeAppliedTag = useCallback(
    (index) => {
      if (isControlled) onRemoveAppliedTagProp(index);
      else setInternalTags((prev) => prev.filter((_, i) => i !== index));
    },
    [isControlled, onRemoveAppliedTagProp]
  );

  const handleApplyAndCloseDropdown = useCallback(
    (tags, close) => {
      handleApplyFilters(tags);
      close();
    },
    [handleApplyFilters]
  );

  const handleApplyAndClosePanel = useCallback(
    (tags) => {
      handleApplyFilters(tags);
      closeFilterMenu();
    },
    [handleApplyFilters, closeFilterMenu]
  );

  const renderFilterDropdownContent = useCallback(
    (close) => (
      <DropdownFilterMenu
        appliedTags={appliedFilterTags}
        onClose={close}
        onApply={(tags) => handleApplyAndCloseDropdown(tags, close)}
      />
    ),
    [appliedFilterTags, handleApplyAndCloseDropdown]
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.filtersLeft}>
        <div className={styles.filtersDropdownFilters}>
        <Dropdown
          text="Фильтры"
          dropdownContent={renderFilterDropdownContent}
          bgView={false}
          dropdownMenuClassName={styles.filtersDropdownPanel}
          icon={
            <PublicImage
              src="/icons/system/ArrowDown.svg"
              alt=""
              width={20}
              height={20}
              draggable={false}
            />
          }
        />
      </div>
      <div className={styles.filtersRoundButton}>
        <RoundButton
          variant="hover"
          icon={<FilterIcon />}
          onClick={openFilterMenu}
          aria-label="Открыть фильтры"
        />
      </div>
      </div>
      <div className={styles.filtersTags}>
        {appliedFilterTags.map((tag, index) => (
          <FilterTag
            key={`${tag}-${index}`}
            selected
            onRemove={() => removeAppliedTag(index)}
          >
            {tag}
          </FilterTag>
        ))}
      </div>
      <div className={styles.filtersDropdownSort}>
        <Dropdown
          text="Сортировать по"
          items={CHECK_PLANS_SORT_ITEMS}
          selectedIndex={sortIndex}
          defaultSelectedIndex={1}
          onSelect={onSortSelect}
          menuCentered
          icon={
            <PublicImage
              src="/icons/system/ArrowDown.svg"
              alt=""
              width={20}
              height={20}
              draggable={false}
            />
          }
        />
      </div>
      {typeof document !== "undefined" &&
        filterMenuOpen &&
        createPortal(
          <>
            <div
              className={`${styles.filterOverlay} ${filterMenuVisible ? styles.isOpen : ""}`}
              onClick={closeFilterMenu}
              aria-hidden
            />
            <div
              className={`${styles.filterPanel} ${filterMenuVisible ? styles.isOpen : ""}`}
              aria-label="Окно фильтров"
              aria-hidden={!filterMenuVisible}
            >
              <div className={`${styles.filterPanelContent} ${filterMenuVisible ? styles.isOpen : ""}`}>
                <DropdownFilterMenu
                  className={styles.filterMenuInPanel}
                  appliedTags={appliedFilterTags}
                  onClose={closeFilterMenu}
                  onApply={handleApplyAndClosePanel}
                />
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
