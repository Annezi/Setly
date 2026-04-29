"use client";

import styles from "./dropdown-item.module.css";

export default function DropdownItem({
    text = "Пункт",
    selected = false,
    disabled = false,
    onClick,
    ...props
}) {


    return (
        
        <button
            type="button"
            className={`${styles.dropdownItem} ${selected ? styles["dropdownItem--selected"] : ""}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            <span className={`subinfo ${styles.dropdownItemText}`}>{text}</span>
        </button>
    );
}
