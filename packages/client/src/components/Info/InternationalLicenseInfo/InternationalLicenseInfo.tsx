import { InternationalLicenseDTO } from "@dvld/shared/src/dtos/internationalLicense.dto";
import styles from '../../Forms/Forms.module.css';

interface InternationalLicenseInfoProps {
  internationalLicense: InternationalLicenseDTO;
}

export function InternationalLicenseInfo({ internationalLicense }: InternationalLicenseInfoProps) {
  return (
    <div className={styles.form}>
      <div className={styles.splitRow}>
        <div className={styles.formRow}>
          <label>License ID:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-hash"></i>
            <span>{internationalLicense.id}</span>
          </div>
        </div>
        <div className={styles.formRow}>
          <label>Driver ID:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-person-badge"></i>
            <span>{internationalLicense.driver_id}</span>
          </div>
        </div>
      </div>
      <div className={styles.splitRow}>
        <div className={styles.formRow}>
          <label>Issue Date:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-calendar-check"></i>
            <span>{new Date(internationalLicense.issue_date).toDateString()}</span>
          </div>
        </div>
        <div className={styles.formRow}>
          <label>Expiration Date:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-calendar-x"></i>
            <span>{new Date(internationalLicense.expiration_date).toDateString()}</span>
          </div>
        </div>
      </div>
      <div className={styles.splitRow}>
        <div className={styles.formRow}>
          <label>Is Active:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-check-circle"></i>
            <span>{internationalLicense.is_active ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <div className={styles.formRow}>
          <label>Issue Reason:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-question-circle"></i>
            <span>{internationalLicense.issue_reason}</span>
          </div>
        </div>
      </div>
      {internationalLicense.notes && (
        <div className={styles.formRow}>
          <label>Notes:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-journal-text"></i>
            <span>{internationalLicense.notes}</span>
          </div>
        </div>
      )}
    </div>
  );
}