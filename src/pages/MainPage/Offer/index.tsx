import styles from './Offer.module.scss'
import { useDispatch} from 'react-redux'
import type { AppDispatch } from '../../../store'
import { fetchOffer } from '../../../store/slices/offers/thunks'


const Offer: React.FC<any> = ({offer}) => {
	const dispatch = useDispatch<AppDispatch>()

	const handleClick = () => {
		void dispatch(fetchOffer(offer.id))
	}

	return (
		<div className={styles.slide} onClick={handleClick}>
			<article className={styles.slideWrapper} aria-label={offer.offerName}>
				<div className={styles.slideInfoLine}>
					<div className={`${styles.halfLine} ${styles.discipline}`}>
						{offer.discipline ? offer.discipline.join('/') : ''}
					</div>
					<h3
						className={`${styles.halfLine} ${styles.offerName}`}
					>
						{offer.offerName}
					</h3>
				</div>
				<div className={styles.slideInfoLine}>
					<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
						{offer.date ?? ''}
					</div>
					<div className={`${styles.halfLine} ${styles.price}`}>
						{offer.price.toLocaleString('ru-RU')} р
					</div>
				</div>
				<div className={styles.slideInfoLine}>
					<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
						{offer.time ?? ''}
					</div>
					<div className={`${styles.halfLine} ${styles.ridingLevel}`}>
						{offer.level ? offer.level.join('/') : ''}
					</div>
				</div>
			</article>
		</div>
		
	);
}

export default Offer;
