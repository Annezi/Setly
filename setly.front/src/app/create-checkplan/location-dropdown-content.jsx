"use client";

import { memo, useRef, useMemo, useEffect, useCallback } from "react";
import DropdownItem from "@/app/components/atomic/atoms/dropdown-item/dropdown-item";
import { filterLocations } from "@/app/data/locations-by-region";
import styles from "./create-checkplan.module.css";

/** Контент дропдауна «Место»: поле поиска + список вариантов (страна/город), стиль как у Тип/Люди */
export const LocationDropdownContent = memo(function LocationDropdownContent({ close, searchQuery, setSearchQuery, onSelect }) {
	const inputRef = useRef(null);
	const filtered = useMemo(() => filterLocations(searchQuery).slice(0, 80), [searchQuery]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSelect = useCallback(
		(item) => {
			onSelect(item.label, item.region);
			close();
		},
		[onSelect, close]
	);

	return (
		<div className={styles.locationDropdownContent}>
			<input
				ref={inputRef}
				type="text"
				className={`subinfo ${styles.locationDropdownSearch}`}
				placeholder="Страна или город..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onKeyDown={(e) => e.stopPropagation()}
				aria-label="Поиск локации"
			/>
			<div className={styles.locationDropdownList} role="listbox">
				{filtered.length === 0 ? (
					<div className={`subinfo ${styles.locationDropdownEmpty}`}>
						{searchQuery.trim() ? "Ничего не найдено" : "Введите страну или город"}
					</div>
				) : (
					filtered.map((item, index) => (
						<DropdownItem key={`${item.label}-${index}`} text={item.label} onClick={() => handleSelect(item)} />
					))
				)}
			</div>
		</div>
	);
});
