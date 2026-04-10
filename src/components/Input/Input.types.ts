import type { ChangeEvent } from 'react'

export type InputProps = {
	label?: string
	type?: 'text' | 'password' | 'email'
	placeholder?: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	required?: boolean
	disabled?: boolean
	id?: string
	name?: string
	autoComplete?: string
	className?: string
	maxLength?: number
}
