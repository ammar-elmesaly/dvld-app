import Button from '../../Button/Button.js';
import styles from '../Forms.module.css';

interface PhoneCallProps {
	phone: string;
}

export default function PhoneCall({ phone }: PhoneCallProps) {
	return (
		<section className={styles.form}>
			<div className={styles.headerRow}>
				<h1>Call Phone</h1>
			</div>

			<div className={styles.formRow}>
				<label>Phone:</label>
				<div className={styles.inputGroup}>
					<i className='bi bi-telephone-plus-fill' />
					<span>{phone}</span>
				</div>
			</div>

			<div className={styles.controls}>
        <a href={`tel:${phone}`}>
          <Button color='info' iconLeft='telephone-fill'>Call</Button>
        </a>
			</div>
		</section>
	);
}
