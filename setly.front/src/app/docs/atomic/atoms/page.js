"use client";

import "@/app/globals.css";
import { ButtonsDemo } from "@/app/components/atomic/atoms/buttons/buttons";
import { ButtonsRoundDemo } from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import { ButtonCardDemo } from '@/app/components/atomic/atoms/buttons-card/buttons-card'
import { ItemsDemo } from "@/app/components/atomic/atoms/items/items";
import { DropdownDemo } from "@/app/components/atomic/atoms/dropdown/dropdown";
import { TogglerDemo } from "@/app/components/atomic/atoms/toggler/toggler";
import { FilterTagDemo } from "@/app/components/atomic/atoms/filter-tag/filter-tag";
import { CheckboxDemo } from "@/app/components/atomic/atoms/checkbox/checkbox";
import { ButtonsMiniDemo } from "@/app/components/atomic/atoms/buttons-mini/buttons-mini";
import { ProfilePhotoDemo } from "@/app/components/atomic/atoms/profile-photo/profile-photo";
import { QuestionsDemo } from "@/app/components/atomic/atoms/questions/questions";
import { SelectionFieldDemo } from "@/app/components/atomic/atoms/selection-field/selection-field";
import { UserDemo } from "@/app/components/atomic/atoms/user/user";

export default function Home() {
	return (
		<div className="LandingBox">
			<section className="ButtonShowcase" aria-label="Варианты кнопок">
				<ButtonsDemo />
			</section>
			<section className="ButtonShowcase" aria-label="Круглые кнопки">
				<ButtonsRoundDemo />
			</section>
			<section className="ButtonShowcase" aria-label="Кнопка карточки">
                <ButtonCardDemo />
            </section>
			<section className="ButtonShowcase" aria-label="Пункты">
				<ItemsDemo />
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Выпадающий список">
				<DropdownDemo />
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Toggler">
				<TogglerDemo />
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Теги фильтра">
				<FilterTagDemo />
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Чекбокс">
				<CheckboxDemo />
			</section>

			<section className="ButtonShowcaseCol1" aria-label="Кнопки состояний">
				<ButtonsMiniDemo/>
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Фото профиля">
				<ProfilePhotoDemo />
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Вопросы">
				<QuestionsDemo />
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Поле выбора">
				<SelectionFieldDemo />
			</section>
			<section className="ButtonShowcaseCol1" aria-label="Пользователь">
				<UserDemo />
			</section>
			{/* <section className="ButtonShowcaseCol1" aria-label="Элементы выпадающего списка">
				<DropdownItem text="Пункт" />
				<DropdownItem text="Пункт" selected />
				<DropdownItem text="Пункт" />
				<DropdownItem text="Пункт" />
			</section> */}
		</div>
	);
}
