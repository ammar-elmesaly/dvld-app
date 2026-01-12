import { Person } from "../../types/person"

interface PersonInfoProps {
  person?: Person;
}

import styles from '../AddPersonForm/AddPersonForm.module.css'

export default function PersonInformation({ person }: PersonInfoProps) {
  const personToRender: Person = person ? person : {
    id: '??',
    first_name: '??',
    second_name: '??',
    third_name: '??',
    last_name: '??',
    national_id: '??',
    date_of_birth: '??',
    gender: 'M',
    phone_number: '??',
    email: '??',
    country_id: '??',
    address: '??',
    personal_photo_path: '??'
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
            <InfoRow label="Date Of Birth:" icon="bi-calendar3" value={new Date(personToRender.date_of_birth as string).toLocaleDateString()} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Gender:" value={personToRender.gender === 'M' ? 'Male' : 'Female'} />
            <InfoRow label="Phone:" icon="bi-telephone" value={personToRender.phone_number} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Email:" icon="bi-envelope" value={personToRender.email} />
            <InfoRow label="Country:" icon="bi-globe" value={personToRender.country_id} />
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
            <img src={personToRender.personal_photo_path} alt='person photo' />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className={styles.formRow}>
      <label>{label}</label>
      <div className={styles.inputGroup}>
        {icon && <i className={`bi ${icon}`} />}
        <span>{value}</span>
      </div>
    </div>
  );
}

function InfoBox({
  value,
  icon
}: {
  value: string;
  icon?: string;
}) {
  return (
    <div className={styles.inputGroup}>
      {icon && <i className={`bi ${icon}`} />}
      <span>{value}</span>
    </div>
  );
}

