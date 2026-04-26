"use client";
/* eslint-disable @next/next/no-img-element -- иконки в кнопке добавления строки */

import { memo } from "react";
import ButtonCard from "@/app/components/atomic/atoms/buttons-card/buttons-card";

const CHECKPLAN_MINI_PLUS_ICONS = {
	icon: <img src="/icons/system/CrossMini.svg" alt="" width={9} height={9} />,
	hoverIcon: <img src="/icons/system/CrossMiniDark.svg" alt="" width={9} height={9} />,
};

/** Кнопка «Добавить пункт…» с фиксированными иконками (чеклисты, заметки, секции блоков) */
export const CheckplanAddRowButton = memo(function CheckplanAddRowButton({ onClick, disabled = false }) {
	return (
		<ButtonCard
			text="Добавить пункт..."
			icon={CHECKPLAN_MINI_PLUS_ICONS.icon}
			hoverIcon={CHECKPLAN_MINI_PLUS_ICONS.hoverIcon}
			onClick={onClick}
			disabled={disabled}
		/>
	);
});

/** Кнопка «Добавить „{title}“» — восстановление секции в блоках редактора */
export const CheckplanAddSectionTitleButton = memo(function CheckplanAddSectionTitleButton({ quotedTitle, onClick }) {
	return (
		<ButtonCard
			text={`Добавить "${quotedTitle}"`}
			icon={CHECKPLAN_MINI_PLUS_ICONS.icon}
			hoverIcon={CHECKPLAN_MINI_PLUS_ICONS.hoverIcon}
			onClick={onClick}
		/>
	);
});
