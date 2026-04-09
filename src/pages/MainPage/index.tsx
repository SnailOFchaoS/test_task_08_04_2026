import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Header } from '../../components'
import styles from './MainPage.module.scss'
import type { AppDispatch } from '../../store'
import { fetchOffers } from '../../store/slices/offers/thunks'
import Offer from './Offer'
import EditOfferForm from './EditOfferForm'

const MainPage = () => {
	const dispatch = useDispatch<AppDispatch>()

	const {offers, currentOffer, isLoading, error} = useSelector((state: any) => state.offers);

	useEffect(() => {
		if(error){
			console.error(error);
		}
		if(isLoading){
			console.log('Loading...');
		}
		if(offers.length > 0){
			console.log(offers);
		}
		if(currentOffer){
			console.log(currentOffer);
		}
	}, [offers, isLoading, error, currentOffer]);

	useEffect(() => {
		void dispatch(fetchOffers());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.editOfferFormContainer}>
				<EditOfferForm />
			</div>
			<div className={styles.offersContainer}>
				{offers.map(offer => (
					<Offer key={offer.id} offer={offer} />
				))}
			</div>
		</div>
	)
}

export { MainPage }