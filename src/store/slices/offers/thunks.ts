import { createAsyncThunk } from '@reduxjs/toolkit'

import * as offersApi from '../../../api/offers/index.ts'
import type { OfferFormFields } from '../../../common/offerFormToApiFields.ts'
import { offerFormToWriteBody } from '../../../common/offerFormToApiFields.ts'
import type { Offer } from '../../../types/offer.ts'

import type { AppDispatch, RootState } from '../../index.ts'

type ThunkConfig = { state: RootState; dispatch: AppDispatch }

const selectToken = (state: RootState) => state.auth.token ?? ''

export const fetchOffers = createAsyncThunk<Offer[], void, { state: RootState }>(
	'offers/fetchOffers',
	async (_, { getState }) => {
		const token = selectToken(getState())
		return offersApi.getOffers(token)
	},
)

export const fetchOffer = createAsyncThunk<Offer, string, { state: RootState }>(
	'offers/fetchOffer',
	async (id, { getState }) => {
		const token = selectToken(getState())
		return offersApi.getOffer(token, id)
	},
)

export const createOffer = createAsyncThunk<void, OfferFormFields, ThunkConfig>(
	'offers/createOffer',
	async (form, { getState, dispatch }) => {
		const token = selectToken(getState())
		await offersApi.createOffer(token, offerFormToWriteBody(form))
		await dispatch(fetchOffers())
	},
)

export const updateOffer = createAsyncThunk<
	void,
	{ id: string; form: OfferFormFields },
	ThunkConfig
>('offers/updateOffer', async ({ id, form }, { getState, dispatch }) => {
	const token = selectToken(getState())
	await offersApi.updateOffer(token, id, offerFormToWriteBody(form))
	await dispatch(fetchOffers())
	await dispatch(fetchOffer(id))
})

export const deleteOffer = createAsyncThunk<string, string, ThunkConfig>(
	'offers/deleteOffer',
	async (id, { getState, dispatch }) => {
		const token = selectToken(getState())
		await offersApi.deleteOffer(token, id)
		await dispatch(fetchOffers())
		return id
	},
)
