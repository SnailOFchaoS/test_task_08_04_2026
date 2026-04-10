import { createSlice } from '@reduxjs/toolkit'
import { decodeJwtPayload } from '../../../common/decodeJWT'
import { login } from './thunk'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: '',
		decodedToken: null,
		isLoading: false,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.token = ''
			state.decodedToken = null
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoading = true
			state.error = null
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false
			state.token = action.payload.token
			state.decodedToken = decodeJwtPayload(action.payload.token)
		})
		builder.addCase(login.rejected, (state, action) => {
			state.isLoading = false
			state.error =
				typeof action.payload === 'string'
					? action.payload
					: (action.error.message ?? null)
		})
		
	}
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer