import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../store/slices/auth/thunk.ts'
import type { AppDispatch, RootState } from '../../store'

import { Button, Input } from '../../components'
import styles from './EnterPage.module.scss'

const EnterPage = () => {
	const [loginValue, setLoginValue] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { isLoading, error } = useSelector((state: RootState) => state.auth)

	const dispatch = useDispatch<AppDispatch>()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			await dispatch(login({ username: loginValue, password })).unwrap()
			navigate('/')
		} catch {
		}
	}

	return (
		<div className={styles.container}>
			<form className={styles.formContainer} onSubmit={handleSubmit}>
				<div className={styles.fields}>
					<Input
						label="Логин"
						placeholder="Login"
						name="login"
						autoComplete="username"
						value={loginValue}
						onChange={(e) => setLoginValue(e.target.value)}
					/>
					<Input
						label="Пароль"
						type="password"
						placeholder="pass"
						name="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error ? <p className={styles.loginError}>{error}</p> : null}
				<Button type="submit" className={styles.submit} disabled={isLoading}>
					ВОЙТИ
				</Button>
			</form>
		</div>
	)
}

export { EnterPage }
