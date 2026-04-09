import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchOffers = createAsyncThunk(
	'offers/fetchOffers',
	async () => {
		const response = await fetch('https://ralan.pro/api/offers')
		if(!response.ok){
			throw new Error('Failed to fetch users');
		}
		const json = (await response.json()) as {
			success?: boolean
			data?: unknown[]
		}
		if (!json.success) {
			throw new Error('Invalid offers response')
		}
		return json.data
	}
)

export const fetchOffer = createAsyncThunk(
	'offers/fetchOffer', 
	async (id: string) => {
		const response = await fetch(`https://ralan.pro/api/offers/${id}`)
		if(!response.ok){
			throw new Error('Failed to fetch offer');
		}
		const json = (await response.json()) as {
			success?: boolean
			data?: unknown
		}
		if (!json.success) {
			throw new Error('Invalid offer response')
		}
		return json.data
	}
)