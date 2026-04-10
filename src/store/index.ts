import { configureStore } from '@reduxjs/toolkit'
import { offersReducer, authReducer } from './slices'

export const store = configureStore({
	reducer: {
		offers: offersReducer,
		auth: authReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch