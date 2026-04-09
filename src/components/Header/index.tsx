import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { Button } from '../../components'
import type { AppDispatch, RootState } from '../../store'
import { logout } from '../../store/slices/auth/index.ts'

import styles from './Header.module.scss'

const Header = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const { decodedToken } = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		console.log(decodedToken);
	}, [decodedToken])

	const handleLogout = () => {
		dispatch(logout())
		navigate('/enter')
	}

	return (
		<header className={styles.container}>
			{decodedToken?.username ? (
				<div className={styles.userInfo}>
					<span className={styles.userInfoText}>{decodedToken.username}</span>
					<Button onClick={() => handleLogout()}> 
						<span className={styles.buttonText}>ВЫЙТИ</span>
					</Button>
				</div>
				
			) : (
				<Button onClick={() => navigate('/enter')}> 
					<span className={styles.buttonText}>ВОЙТИ</span>
				</Button>
			)}
		</header>
	)
}

export { Header }