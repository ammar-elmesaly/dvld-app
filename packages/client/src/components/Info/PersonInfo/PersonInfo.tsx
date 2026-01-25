import { uploadUrl } from "../../../api/urls";
import { PersonDTO } from "@dvld/shared/src/dtos/person.dto";
import { Gender } from "@dvld/shared/src/types/person";
interface PersonInfoProps {
  person?: PersonDTO;
}

import styles from '../../Forms/AddPersonForm/AddPersonForm.module.css'
import { InfoBox, InfoRow } from "../../../helpers/info";

export default function PersonInfo({ person }: PersonInfoProps) {
  const personToRender: PersonDTO = person ? person : {
    id: 0,
    first_name: '??',
    second_name: '??',
    third_name: '??',
    last_name: '??',
    national_id: '??',
    date_of_birth: '??',
    gender: Gender.Male,
    phone_number: '??',
    email: '??',
    national_country: '??',
    address: '??',
    personal_photo: '??'
  }

  return (
    <section className={styles.form}>
      <div className={styles.personIdRow}>
        <label>Person ID:</label>
        <span>{personToRender.id}</span>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>

          <div className={styles.formRow}>
            <label>Name:</label>
            <div className={styles.nameGrid}>
              <InfoBox icon="bi-person" value={personToRender.first_name} />
              <InfoBox value={personToRender.second_name} />
              <InfoBox value={personToRender.third_name} />
              <InfoBox value={personToRender.last_name} />
            </div>
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="National No:" icon="bi-person-vcard-fill" value={personToRender.national_id} />
            <InfoRow label="Date Of Birth:" icon="bi-calendar3" value={personToRender.date_of_birth} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Gender:" value={personToRender.gender === 'M' ? 'Male' : 'Female'} />
            <InfoRow label="Phone:" icon="bi-telephone" value={personToRender.phone_number} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Email:" icon="bi-envelope" value={personToRender.email} />
            <InfoRow label="Country:" icon="bi-globe" value={personToRender.national_country} />
          </div>

          <div className={styles.formRow}>
            <label>Address:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-geo-alt"></i>
              <span>{personToRender.address}</span>
            </div>
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