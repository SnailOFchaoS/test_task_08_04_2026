import { useCallback, useId } from 'react'
import type { ChangeEvent } from 'react'

import { sanitizeRestrictedInput } from '../../common/sanitizeRestrictedInput.ts'
import type { InputProps } from './Input.types.ts'
import styles from './Input.module.scss'

const Input = ({
	label,
	type = 'text',
	placeholder,
	value,
	onChange,
	required = false,
	disabled = false,
	id: idProp,
	name,
	autoComplete,
	className,
	maxLength,
}: InputProps) => {
	const reactId = useId()
	const inputId = idProp ?? reactId

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value
			const sanitized = sanitizeRestrictedInput(raw)
			if (sanitized === raw) {
				onChange(e)
				return
			}
			const target = Object.assign(e.target, { value: sanitized })
			onChange({ ...e, target } as ChangeEvent<HTMLInputElement>)
		},
		[onChange],
	)

	return (
		<div className={[styles.inputGroup, className].filter(Boolean).join(' ')}>
			{label ? (
				<label className={styles.label} htmlFor={inputId}>
					{label}
				</label>
			) : null}
			<input
				id={inputId}
				type={type}
				className={styles.input}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				required={required}
				disabled={disabled}
				name={name}
				autoComplete={autoComplete}
				maxLength={maxLength}
			/>
		</div>
	)
}

export { Input }
export type { InputProps } from './Input.types.ts'
