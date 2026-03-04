"use client";
import "@/app/globals.css";

import CalendarDropdown from "@/app/components/atomic/molecules/calendar/calendar";
import { DecoratedInputDemo } from "@/app/components/atomic/molecules/decorated-input/decorated-input";
import { InputDemo } from "@/app/components/atomic/molecules/input/input";
import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import DropdownFilterMenu, { DropdownFilterMenuDemo } from "@/app/components/atomic/molecules/dropdown-filter-menu/dropdown-filter-menu";
import { HeaderNavMenu } from "@/app/components/atomic/molecules/header-nav-menu/header-nav-menu";

export default function Home() {
    return (
        <div className="LandingBox">
            <section className="ButtonShowcase" aria-label="Календарь">
                <CalendarDropdown />
            </section>
            <section className="ButtonShowcaseCol1" aria-label="Декорированный инпут" style={{ backgroundColor: "white" }}>
                <DecoratedInputDemo />
            </section>
            <section className="ButtonShowcaseCol1" aria-label="Инпуты">
                <InputDemo />
            </section>
            <section className="ButtonShowcaseCol1" aria-label="Меню фильтров">
                <DropdownFilterMenuDemo />
            </section>
            <section className="ButtonShowcaseCol1" aria-label="Меню фильтров В кнопке">
                <Dropdown
                    bgView={false}
                    dropdownContent={<DropdownFilterMenu />}
                ></Dropdown>
            </section>
            <section className="ButtonShowcaseCol1" aria-label="Навигационное меню хедера">
                <HeaderNavMenu />
            </section>
        </div>
    );
}