"use client";

import Input from "@/app/components/atomic/molecules/input/input";
import styles from "./search.module.css";

export default function Search({ value = "", onChange, onSearchSubmit }) {
    return (
        <div className={styles.wrap}>
            <Input
                typeOfInput="search"
                placeholder="Поиск"
                value={value}
                onChange={onChange}
                onSearchSubmit={onSearchSubmit}
            />
        </div>
    );
}
