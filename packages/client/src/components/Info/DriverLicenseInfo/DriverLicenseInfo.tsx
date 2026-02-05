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
            <InfoRow label="Class Name:" icon="bi-telephone" value={licenseToRender.license_class_name} />
            <InfoRow label="Name:" icon="bi-tag" value={
              `${personToRender.first_name} ${personToRender.second_name} ${personToRender.third_name} ${personToRender.last_name}`
              }
            />
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
            <InfoRow label="Gender:" icon="bi-envelope" value={personToRender.gender === 'M' ? 'Male' : 'Female'} />
            <InfoRow label="Driver ID:" icon="bi-globe" value={licenseToRender.driver_id.toString()} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Issue Date:" icon="bi-envelope" value={new Date(licenseToRender.issue_date).toDateString()} />
            <InfoRow label="Expiration Date:" icon="bi-globe" value={new Date(licenseToRender.expiration_date).toDateString()} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Issue Reason:" icon="bi-envelope" value={licenseToRender.issue_reason} />
            <InfoRow label="Is Detained:" icon="bi-globe" value={licenseToRender.is_detained ? 'Yes' : 'No'} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Notes:" icon="bi-envelope" value={licenseToRender.notes ? licenseToRender.notes : 'No content' } />
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