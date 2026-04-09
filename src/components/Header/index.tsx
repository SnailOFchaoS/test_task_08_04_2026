import { Button } from '../../components'

import styles from './Header.module.scss'

const Header = () => {
	return (
		<header className={styles.container}>
			<Button> 
				<span className={styles.buttonText}>ВОЙТИ</span>
			</Button>
		</header>
	)
}

export { Header }