import { authHeaders } from '../../common/authHeaders.ts'
import type { OfferWriteBody } from '../../common/offerFormToApiFields.ts'
import type { Offer } from '../../types/offer.ts'

const BASE = 'https://ralan.pro/api/offers'

type ApiEnvelope<T> = {
	success?: boolean
	message?: string
	data?: T
}

const readBody = async <T>(response: Response): Promise<ApiEnvelope<T> | null> => {
	try {
		return (await response.json()) as ApiEnvelope<T>
	} catch {
		return null
	}
}

export const getOffers = async (token: string): Promise<Offer[]> => {
	const response = await fetch(BASE, {
		method: 'GET',
		headers: authHeaders(token),
	})
	const json = await readBody<Offer[]>(response)
	if (!response.ok || !json?.success) {
		throw new Error(json?.message ?? response.statusText ?? 'Запрос не выполнен')
	}
	return json.data ?? []
}

export const getOffer = async (token: string, id: string): Promise<Offer> => {
	const response = await fetch(`${BASE}/${id}`, {
		method: 'GET',
		headers: authHeaders(token),
	})
	const json = await readBody<Offer>(response)
	if (!response.ok || !json?.success) {
		throw new Error(json?.message ?? response.statusText ?? 'Запрос не выполнен')
	}
	if (json.data === undefined) {
		throw new Error('Пустой ответ')
	}
	return json.data
}

export const createOffer = async (token: string, body: OfferWriteBody): Promise<Offer | undefined> => {
	const response = await fetch(BASE, {
		method: 'POST',
		headers: authHeaders(token),
		body: JSON.stringify(body),
	})
	const json = await readBody<Offer>(response)
	if (!response.ok || !json?.success) {
		throw new Error(json?.message ?? response.statusText ?? 'Запрос не выполнен')
	}
	return json.data
}

export const updateOffer = async (token: string, id: string, body: OfferWriteBody): Promise<Offer | undefined> => {
	const response = await fetch(`${BASE}/${id}`, {
		method: 'PUT',
		headers: authHeaders(token),
		body: JSON.stringify(body),
	})
	const json = await readBody<Offer>(response)
	if (!response.ok || !json?.success) {
		throw new Error(json?.message ?? response.statusText ?? 'Запрос не выполнен')
	}
	return json.data
}

export const deleteOffer = async (token: string, id: string): Promise<void> => {
	const response = await fetch(`${BASE}/${id}`, {
		method: 'DELETE',
		headers: authHeaders(token),
	})
	const json = await readBody<Offer>(response)
	if (!response.ok) {
		throw new Error(json?.message ?? response.statusText)
	}
	if (json && json.success === false) {
		throw new Error(json.message ?? 'Удаление не выполнено')
	}
}
