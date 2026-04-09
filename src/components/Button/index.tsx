import type { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
	className,
	children,
	type = 'button',
	...rest
}: ButtonProps) => (
	<button
		type={type}
		className={[styles.button, className].filter(Boolean).join(' ')}
		{...rest}
	>
		{children}
	</button>
);

export {Button};
