import { createAsyncThunk } from '@reduxjs/toolkit'

export const LOGIN_CREDENTIALS_ERROR = 'Неверный пароль или имя пользователя'

type LoginResponse = {
	success?: boolean
	token?: string
	message?: string
	data?: { token?: string }
}

export const login = createAsyncThunk<
	{ token: string },
	{ username: string; password: string },
	{ rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
	try {
		const response = await fetch('https://ralan.pro/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: credentials.username,
				password: credentials.password,
			}),
		})

		let json = {} as LoginResponse
		try {
			json = (await response.json()) as LoginResponse
		} catch {
			return rejectWithValue(LOGIN_CREDENTIALS_ERROR)
		}

		if (!response.ok || !json.success) {
			return rejectWithValue(LOGIN_CREDENTIALS_ERROR)
		}

		const token = json.token ?? json.data?.token
		if (!token) {
			return rejectWithValue(LOGIN_CREDENTIALS_ERROR)
		}

		return { token }
	} catch {
		return rejectWithValue(LOGIN_CREDENTIALS_ERROR)
	}
})
