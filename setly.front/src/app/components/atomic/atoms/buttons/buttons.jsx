"use client";

import { useState } from 'react';
import PublicImage from '@/app/components/globals/public-image';
import styles from './buttons.module.css';

export default function Button({
	color = 'white',
	size = '',
	icon,
	hoverIcon,
	Text,
	...props
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			className={`${styles.button} ${styles[`button--${color}`]} ${styles[`button--${size}`]}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			{...props}
		>
			{icon && (
				<span className={styles.icon}>
					{hoverIcon && isHovered ? hoverIcon : icon}
				</span>
			)}
			<span className={styles.subinfo} style={{ zIndex: 5, position: 'relative' }}>
				{Text}
			</span>
		</button>
	);
}

export function ButtonsDemo() {
	return (

		<div className="ButtonShowcase">
			<Button Text="Button" color="white" />
			<Button Text="Button" color="blue" />
			<Button Text="Button" color="inactive" disabled />
			<Button Text="Button" color="outline" />
			<Button Text="Button" color="dangerFilled" />

			<Button Text="Button" color="white" size="small" />
			<Button Text="Button" color="blue" size="small" />
			<Button Text="Button" color="inactive" disabled size="small" />
			<Button Text="Button" color="outline" size="small" />
			<Button Text="Button" color="dangerFilled" size="small" />

			<Button
				Text="Button"
				color="white"
				icon={
					<PublicImage
						src="/icons/system/TG.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
			/>
			<Button
				Text="Button"
				color="blue"
				icon={
					<PublicImage
						src="/icons/system/Search.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
			/>
			<Button Text="Button" color="inactive" disabled style={{ visibility: 'hidden' }} />
			<Button Text="Button" color="outline" style={{ visibility: 'hidden' }} />
			<Button
				Text="Button"
				color="dangerFilled"
				icon={
					<PublicImage
						src="/icons/system/Trash-red.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
				hoverIcon={
					<PublicImage
						src="/icons/system/Trash-white.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
			/>

			{/* Ряд 4: с иконками */}
			<Button
				Text="Button"
				color="white"
				icon={
					<PublicImage
						src="/icons/system/TG.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
				size="small"
			/>
			<Button
				Text="Button"
				color="blue"
				icon={
					<PublicImage
						src="/icons/system/Search.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
				size="small"
			/>
			<Button Text="Button" color="inactive" disabled style={{ visibility: 'hidden' }} />
			<Button Text="Button" color="outline" style={{ visibility: 'hidden' }} />
			<Button
				Text="Button"
				color="dangerFilled"
				icon={
					<PublicImage
						src="/icons/system/Trash-red.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
				hoverIcon={
					<PublicImage
						src="/icons/system/Trash-white.svg"
						alt=""
						width={16}
						height={16}
					/>
				}
				size="small"
			/>
		</div>



	);
}

