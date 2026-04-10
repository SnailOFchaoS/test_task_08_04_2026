import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Header } from '../../components'
import styles from './MainPage.module.scss'
import type { AppDispatch, RootState } from '../../store'
import { fetchOffers } from '../../store/slices/offers/thunks'
import Offer from './Offer'
import EditOfferForm from './EditOfferForm'

const MainPage = () => {
	const dispatch = useDispatch<AppDispatch>()

	const { offers } = useSelector((state: RootState) => state.offers)
	const { decodedToken } = useSelector((state: RootState) => state.auth)
	
	useEffect(() => {
		dispatch(fetchOffers());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<Header />
			
			{!decodedToken ? (
				<div className={styles.noRightsText}>
					Войдите для просмотра предложений
				</div>
			) : (
				<>
					<div className={styles.editOfferFormContainer}>
						<EditOfferForm />
					</div>
					<div className={styles.offersContainer}>
						{offers.map((offer) => (
							<Offer key={offer.id} offer={offer} />
						))}
					</div>
				</>
			)}
			
		</div>
	)
}

export { MainPage }