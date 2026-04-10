import { createAsyncThunk } from '@reduxjs/toolkit'

export const LOGIN_CREDENTIALS_ERROR = 'Неверный пароль или имя пользователя'

type LoginResponse = {
	success?: boolean
	token?: string
	data?: { token?: string }
}

export const login = createAsyncThunk<
	{ token: string },
	{ username: string; password: string },
	{ rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
	
	const reject = () => rejectWithValue(LOGIN_CREDENTIALS_ERROR)

	try {
		const response = await fetch('https://ralan.pro/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: credentials.username,
				password: credentials.password,
			}),
		})

		const json = (await response.json().catch(() => null)) as LoginResponse | null
		const token = json?.token ?? json?.data?.token

		if (response.ok && json?.success && token) {
			return { token }
		}
		return reject()
	} catch {
		return reject()
	}
})
