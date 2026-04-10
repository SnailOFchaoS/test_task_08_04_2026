import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '../../../components'
import type { OfferFormFields, SetOfferFormField } from '../../../common/offerFormToApiFields.ts'
import type { AppDispatch, RootState } from '../../../store'
import type { Offer } from '../../../types/offer.ts'
import { createOffer, deleteOffer, updateOffer } from '../../../store/slices/offers/thunks.ts'

import { EditOfferFields } from './EditOfferFields/index.tsx'
import styles from './EditOffer.module.scss'

const emptyForm: OfferFormFields = {
	id: '',
	discipline: '',
	offerName: '',
	date: '',
	price: '',
	time: '',
	level: '',
	important: false,
}

const EditOfferForm = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { currentOffer, error: offersError, isLoading} = useSelector((state: RootState) => state.offers)
	const [formData, setFormData] = useState<OfferFormFields>(emptyForm)
	const { decodedToken } = useSelector((state: RootState) => state.auth)
	const isAdmin = decodedToken?.role === 'admin'

	const arrayToSlashField = (parts: string[] | undefined): string => {
		if (!parts?.length) {
			return ''
		}
		return parts.map((s) => s.trim()).filter(Boolean).join(' / ')
	}

	const offerToForm = (offer: Offer): OfferFormFields => ({
		id: String(offer.id ?? ''),
		discipline: arrayToSlashField(offer.discipline),
		offerName: String(offer.offerName ?? ''),
		date: String(offer.date ?? ''),
		price: String(offer.price ?? ''),
		time: String(offer.time ?? ''),
		level: arrayToSlashField(offer.level),
		important: Boolean(offer.important),
	})

	const setField = useCallback<SetOfferFormField>((key, value) => {
		setFormData((prev) => ({ ...prev, [key]: value }))
	}, [])

	const handleCreate = async () => {
		await dispatch(createOffer(formData)).unwrap()
	}

	const handleUpdate = async () => {
		if (!formData.id) {
			return
		}
		await dispatch(updateOffer({ id: formData.id, form: formData })).unwrap()
	}

	const handleDelete = async () => {
		if (!formData.id) {
			return
		}
		await dispatch(deleteOffer(formData.id)).unwrap()
	}

	useEffect(() => {
		if (currentOffer) {
			setFormData(offerToForm(currentOffer))
		} else {
			setFormData(emptyForm)
		}
	}, [currentOffer])

	return (
		<div className={styles.container}>
			<div className={styles.slide}>
				{!currentOffer?.id && !isAdmin ? (
					<div className={styles.noRightsText}>У вас нет прав на создание предложений</div>
				) : (
					<EditOfferFields
						formData={formData}
						setField={setField}
						isAdmin={isAdmin}
					/>
				)}
			</div>
			<div className={styles.buttonsForm}>
				{!isAdmin && currentOffer?.id ? (
					<div className={styles.noRightsText}>У вас нет прав на редактирование предложений</div>
				) : isAdmin ? (
					<>
						{offersError ? <p className={styles.apiError}>{offersError}</p> : null}
						<Button 
							type="button" 
							onClick={() => handleCreate()}
							disabled={isLoading}
						>
							<span className={styles.buttonText}>Добавить</span>
						</Button>
						{currentOffer?.id ? (
							<>
								<Button 
									type="button" 
									onClick={() => handleUpdate()}
									disabled={isLoading}
								>
									<span className={styles.buttonText}>Изменить</span>
								</Button>
								<Button 
									type="button" 
									onClick={() => handleDelete()}
									disabled={isLoading}
								>
									<span className={styles.buttonText}>Удалить</span>
								</Button>
							</>
						) : null}
					</>
				) : null}
			</div>
		</div>
	)
}

export default EditOfferForm
