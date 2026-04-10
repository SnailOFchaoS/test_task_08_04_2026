import { createSlice } from '@reduxjs/toolkit'

import type { Offer } from '../../../types/offer.ts'

import {
	createOffer,
	deleteOffer,
	fetchOffers,
	fetchOffer,
	updateOffer,
} from './thunks'

const offersSlice = createSlice({
	name: 'offers',
	initialState: {
		offers: [] as Offer[],
		currentOffer: null as Offer | null,
		isLoading: false,
		error: null as string | null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchOffers.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchOffers.fulfilled, (state, action) => {
			state.isLoading = false
			state.error = null
			const list = action.payload ?? []
			state.offers = [...list].reverse()
		})
		builder.addCase(fetchOffers.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message ?? null
		})

		builder.addCase(fetchOffer.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchOffer.fulfilled, (state, action) => {
			state.isLoading = false
			state.error = null
			state.currentOffer = action.payload ?? null
		})
		builder.addCase(fetchOffer.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message ?? null
		})

		builder.addCase(createOffer.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(createOffer.fulfilled, (state) => {
			state.isLoading = false
			state.error = null
		})
		builder.addCase(createOffer.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message ?? null
		})

		builder.addCase(updateOffer.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(updateOffer.fulfilled, (state) => {
			state.isLoading = false
			state.error = null
		})
		builder.addCase(updateOffer.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message ?? null
		})

		builder.addCase(deleteOffer.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(deleteOffer.fulfilled, (state, action) => {
			state.isLoading = false
			state.error = null
			const deletedId = action.payload
			if (state.currentOffer && String(state.currentOffer.id) === String(deletedId)) {
				state.currentOffer = null
			}
		})
		builder.addCase(deleteOffer.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error.message ?? null
		})
	},
})

export const offersReducer = offersSlice.reducer;