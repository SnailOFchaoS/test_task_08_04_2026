import { createSlice } from '@reduxjs/toolkit'
import { fetchOffers, fetchOffer } from './thunks'

const offersSlice = createSlice({
	name: 'offers',
	initialState: {
		offers: [],
		currentOffer: null,
		isLoading: false,
		error: null,
	},
	reducers: {
	},
	extraReducers: (builder) => {

		builder.addCase(fetchOffers.pending, (state) => {
			state.isLoading = true;
		})
		builder.addCase(fetchOffers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.offers = action.payload;
		})
		builder.addCase(fetchOffers.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		})

		builder.addCase(fetchOffer.pending, (state) => {
			state.isLoading = true;
		})
		builder.addCase(fetchOffer.fulfilled, (state, action) => {
			state.isLoading = false;
			state.currentOffer = action.payload;
		})
		builder.addCase(fetchOffer.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		})
	}
})

export const offersReducer = offersSlice.reducer;