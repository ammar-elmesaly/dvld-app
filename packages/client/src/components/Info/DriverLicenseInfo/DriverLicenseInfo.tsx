import { uploadUrl } from "../../../api/urls";
import { PersonDTO } from "@dvld/shared/src/dtos/person.dto";
import { LicensePersonDTO } from "@dvld/shared/src/dtos/licensePerson.dto";

interface PersonInfoProps {
  licenseWithPerson: LicensePersonDTO;
}

import styles from '../../Forms/Forms.module.css';
import { InfoRow } from "../../../helpers/info";
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";

export default function DriverLicenseInfo({ licenseWithPerson }: PersonInfoProps) {
  const personToRender: PersonDTO = licenseWithPerson.person;
  const licenseToRender: LicenseDTO = licenseWithPerson.license;

  return (
    <section className={styles.form}>
      <div className={styles.personIdRow}>
        <label>Person ID:</label>
        <span>{personToRender.id}</span>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>
          <div className={styles.splitRow}>
            <InfoRow label="Class Name:" icon="bi-card-list" value={licenseToRender.license_class_name} />
            <InfoRow label="Name:" icon="bi-person-fill" value={personToRender.full_name ?? 'Error'} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="License ID:" icon="bi-hash" value={licenseToRender.id.toString()} />
            <InfoRow label="Is Active:" icon="bi-check" value={licenseToRender.is_active ? 'Yes' : 'No'} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="National No:" icon="bi-person-vcard-fill" value={personToRender.national_id} />
            <InfoRow label="Date Of Birth:" icon="bi-calendar3" value={personToRender.date_of_birth} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Gender:" icon="bi-gender-ambiguous" value={personToRender.gender === 'M' ? 'Male' : 'Female'} />
            <InfoRow label="Driver ID:" icon="bi-hash" value={licenseToRender.driver_id.toString()} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Issue Date:" icon="bi-calendar-check" value={new Date(licenseToRender.issue_date).toDateString()} />
            <InfoRow label="Expiration Date:" icon="bi-calendar-x" value={new Date(licenseToRender.expiration_date).toDateString()} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Issue Reason:" icon="bi-question-circle" value={licenseToRender.issue_reason} />
            <InfoRow label="Is Detained:" icon="bi-lock-fill" value={licenseToRender.is_detained ? 'Yes' : 'No'} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Notes:" icon="bi-journal-text" value={licenseToRender.notes ? licenseToRender.notes : 'No content' } />
          </div>
        </div>
        <div className={styles.imageColumn}>
          <div className={styles.imageBox}>
            <img src={`${uploadUrl}/${personToRender.personal_photo}`} alt='person photo' />
          </div>
        </div>
      </div>

    </section>
  );
}