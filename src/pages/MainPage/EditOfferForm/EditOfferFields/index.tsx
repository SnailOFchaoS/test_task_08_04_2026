import type { OfferFormFields } from '../../../../common/offerFormToApiFields.ts'

import styles from './EditOfferFields.module.scss'

export type EditOfferFieldsProps = {
	formData: OfferFormFields
	setField: <K extends keyof OfferFormFields>(key: K, value: OfferFormFields[K]) => void
	isAdmin: boolean
}

export const EditOfferFields = ({ formData, setField, isAdmin }: EditOfferFieldsProps) => (
	<article className={styles.slideWrapper}>
		<div className={styles.slideInfoLine}>
			<div className={`${styles.halfLine} ${styles.discipline}`}>
				<input
					type="text"
					className={styles.fieldInput}
					value={formData.discipline}
					onChange={(e) => setField('discipline', e.target.value)}
					placeholder="Дисциплины"
					aria-label="Дисциплины"
					autoComplete="off"
					disabled={!isAdmin}
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
					disabled={!isAdmin}
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
					disabled={!isAdmin}
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
					disabled={!isAdmin}
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
					disabled={!isAdmin}
				/>
			</div>
			<div className={`${styles.halfLine} ${styles.ridingLevel}`}>
				<input
					type="text"
					className={styles.fieldInput}
					value={formData.level}
					onChange={(e) => setField('level', e.target.value)}
					placeholder="Уровень"
					aria-label="Уровень"
					autoComplete="off"
					disabled={!isAdmin}
				/>
			</div>
		</div>
		{isAdmin ? (
			<label className={styles.importantRow}>
				<input
					type="checkbox"
					checked={formData.important}
					onChange={(e) => setField('important', e.target.checked)}
					aria-label="Важное предложение"
				/>
				<span>Важное</span>
			</label>
		) : null}
	</article>
)
