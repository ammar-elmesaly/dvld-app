import Button from '../../Button/Button.js';
import styles from '../Forms.module.css';

interface SendEmailProps {
	email?: string;
}

export default function SendEmail({ email }: SendEmailProps) {
	return (
		<section className={styles.form}>
			<div className={styles.headerRow}>
				<h1>Send Email</h1>
			</div>

			<div className={styles.formRow}>
				<label>Email:</label>
				<div className={styles.inputGroup}>
					<i className='bi bi-at' />
					<span>{email}</span>
				</div>
			</div>

			<div className={styles.controls}>
        <a href={`mailto:${email}`}>
          <Button color='info' iconLeft='send-fill'>Send</Button>
        </a>
			</div>
		</section>
	);
}
