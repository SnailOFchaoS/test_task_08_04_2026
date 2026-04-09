import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import styles from './EditOffer.module.scss'

interface OfferShort {
	id: string
	discipline?: string[]
	offerName: string
	date?: string
	price: string
	time?: string
	level?: string[]
}

const emptyForm: OfferShort = {
	id: '',
	discipline: [],
	offerName: '',
	date: '',
	price: '',
	time: '',
	level: [],
}

function offerToForm(offer: Record<string, unknown>): OfferShort {
	return {
		id: String(offer.id ?? ''),
		discipline: Array.isArray(offer.discipline) ? (offer.discipline as string[]) : [],
		offerName: String(offer.offerName ?? ''),
		date: String(offer.date ?? ''),
		price: String(offer.price ?? ''),
		time: String(offer.time ?? ''),
		level: Array.isArray(offer.level) ? (offer.level as string[]) : [],
	}
}

const EditOfferForm: React.FC = () => {
	const { currentOffer } = useSelector((state: { offers: { currentOffer: Record<string, unknown> | null } }) => state.offers)
	const [formData, setFormData] = useState<OfferShort>(emptyForm)

	useEffect(() => {
		if (currentOffer) {
			setFormData(offerToForm(currentOffer))
		} else {
			setFormData(emptyForm)
		}
	}, [currentOffer])

	const setField = useCallback(
		<K extends keyof OfferShort>(key: K, value: OfferShort[K]) => {
			setFormData((prev) => ({ ...prev, [key]: value }))
		},
		[],
	)

	const onDisciplineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		setField(
			'discipline',
			raw ? raw.split('/').map((s) => s.trim()).filter(Boolean) : [],
		)
	}

	const onLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		setField('level', raw ? raw.split('/').map((s) => s.trim()).filter(Boolean) : [])
	}

	return (
		<div className={styles.slide}>
			<article
				className={styles.slideWrapper}
				aria-label={(currentOffer?.offerName as string) || formData.offerName || 'Редактирование оффера'}
			>
				<div className={styles.slideInfoLine}>
					<div className={`${styles.halfLine} ${styles.discipline}`}>
						<input
							type="text"
							className={styles.fieldInput}
							value={formData.discipline?.join('/') ?? ''}
							onChange={onDisciplineChange}
							placeholder="Дисциплины"
							aria-label="Дисциплины"
							autoComplete="off"
						/>
					</div>
					<div className={`${styles.halfLine} ${styles.offerName}`}>
						<textarea
							rows={2}
							className={styles.fieldTextarea}
							value={formData.offerName}
							onChange={(e) => setField('offerName', e.target.value)}
							placeholder="Название"
							aria-label="Название предложения"
							autoComplete="off"
						/>
					</div>
				</div>
				<div className={styles.slideInfoLine}>
					<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
						<input
							type="text"
							className={styles.fieldInput}
							value={formData.date ?? ''}
							onChange={(e) => setField('date', e.target.value)}
							placeholder="Дата"
							aria-label="Дата"
							autoComplete="off"
						/>
					</div>
					<div className={`${styles.halfLine} ${styles.price} ${styles.priceRow}`}>
						<input
							type="text"
							inputMode="decimal"
							className={styles.fieldInput}
							value={formData.price}
							onChange={(e) => setField('price', e.target.value)}
							placeholder="0"
							aria-label="Цена"
							autoComplete="off"
						/>
						<span className={styles.currencySuffix} aria-hidden>
							{'\u00a0'}р
						</span>
					</div>
				</div>
				<div className={styles.slideInfoLine}>
					<div className={`${styles.halfLine} ${styles.dateAndTime}`}>
						<input
							type="text"
							className={styles.fieldInput}
							value={formData.time ?? ''}
							onChange={(e) => setField('time', e.target.value)}
							placeholder="Время"
							aria-label="Время"
							autoComplete="off"
						/>
					</div>
					<div className={`${styles.halfLine} ${styles.ridingLevel}`}>
						<input
							type="text"
							className={styles.fieldInput}
							value={formData.level?.join('/') ?? ''}
							onChange={onLevelChange}
							placeholder="Уровень"
							aria-label="Уровень"
							autoComplete="off"
						/>
					</div>
				</div>
			</article>
		</div>
	)
}

export default EditOfferForm
