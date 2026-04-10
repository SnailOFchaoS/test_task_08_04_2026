import { splitSlashSeparated } from './splitSlashSeparated.ts'

export type OfferFormFields = {
	id: string
	discipline: string
	offerName: string
	date?: string
	price: string
	time?: string
	level: string
	important: boolean
}

export type SetOfferFormField = <K extends keyof OfferFormFields>(key: K, value: OfferFormFields[K]) => void

export type OfferWriteBody = {
	discipline: string[]
	offerName: string
	date: string
	price: number
	time?: string
	level: string[]
	important: boolean
}

function parseOfferPrice(raw: string): number {
	const n = Number(String(raw).replace(/\s/g, '').replace(',', '.'))
	return Number.isFinite(n) ? n : 0
}

export function offerFormToWriteBody(form: OfferFormFields): OfferWriteBody {
	return {
		discipline: splitSlashSeparated(form.discipline),
		offerName: form.offerName,
		date: form.date ?? '',
		price: parseOfferPrice(form.price),
		...(form.time != null && form.time !== '' ? { time: form.time } : {}),
		level: splitSlashSeparated(form.level),
		important: form.important,
	}
}
