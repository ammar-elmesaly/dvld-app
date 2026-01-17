import { getAllCountries } from '../../../api/country/country';
import { baseUrl } from '../../../api/urls';
import Button from '../../Button/Button';
import styles from './AddPersonForm.module.css';
import { CountryDTO } from "@dvld/shared/src/dtos/country.dto";

import { useState, useEffect } from 'react';

export default function AddPersonForm() {
  const minBirthdate = yearsAgo(100);
  const maxBirthdate = yearsAgo(18);

  const minDateString = toInputDate(minBirthdate);
  const maxDateString = toInputDate(maxBirthdate);
  // Person has to be from 18 to 100 years old.

  const [countries, setCountries] = useState<CountryDTO[]>([]);

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  return (
    <form onSubmit={onSubmit} method='POST' encType='multipart/form-data' className={styles.form}>
      <div className={styles.headerRow}>
        <h1>Add New Person</h1>
      </div>

      <div className={styles.personIdRow}>
        <label>Person ID:</label>
        <span>N/A</span>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>
          {/* Name Row: Spans across 4 inputs */}
          <div className={styles.formRow}>
            <label htmlFor='full name'>Name:</label>
            <div className={styles.nameGrid}>
              <div className={styles.inputGroup}>
                <i className="bi bi-person" />
                <input name="firstName" type="text" placeholder="First" required />
              </div>
              <div className={styles.inputGroup}>
                <input name="secondName" className={styles.input} type="text" placeholder="Second" required />
              </div>
              <div className={styles.inputGroup}>
                <input name="thirdName" className={styles.input} type="text" placeholder="Third" required />
              </div>
              <div className={styles.inputGroup}>
                <input name="lastName" className={styles.input} type="text" placeholder="Last" required />
              </div>
            </div>
          </div>

          {/* National No & DOB Row */}
          <div className={styles.splitRow}>
            <div className={styles.formRow}>
              <label htmlFor='national number'>National No:</label>
              <div className={styles.inputGroup}>
                <i className="bi bi-person-vcard-fill"></i>
                <input name="nationalId" type="text" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <label htmlFor='date of birth'>Date Of Birth:</label>
              <div className={styles.inputGroup}>
                <i className="bi bi-calendar3"></i>
                <input name="dateOfBirth" type="date" min={minDateString} max={maxDateString} required />
              </div>
            </div>
          </div>

          {/* Gender & Phone Row */}
          <div className={styles.splitRow}>
            <div className={styles.formRow}>
              <label htmlFor='gender'>Gender:</label>
              <div className={styles.radioGroup}>
                <label htmlFor='male'><input type="radio" name="gender" value="M" required /> Male</label>
                <label htmlFor='female'><input type="radio" name="gender" value="F" required /> Female</label>
              </div>
            </div>
            <div className={styles.formRow}>
              <label htmlFor='phone number'>Phone:</label>
              <div className={styles.inputGroup}>
                <i className="bi bi-telephone"></i>
                <input name="phoneNumber" type="text" required />
              </div>
            </div>
          </div>

          {/* Email & Country Row */}
          <div className={styles.splitRow}>
            <div className={styles.formRow}>
              <label htmlFor='email'>Email:</label>
              <div className={styles.inputGroup}>
                <i className="bi bi-envelope"></i>
                <input name="email" type="email" />
              </div>
            </div>
            <div className={styles.formRow}>
              <label htmlFor="nationalCountryId">Country</label>

              <div className={styles.selectWrapper}>
                <i className="bi bi-globe"></i>

                <select
                  id="nationalCountryId"
                  name="nationalCountryId"
                  className={styles.select}
                >
                  {countries.map((country, index) => (
                    <option
                      key={country.id ?? index}
                      value={country.id ?? index + 1}
                    >
                      {country.country_name}
                    </option>
                  ))}
                </select>

                <i className={`bi bi-chevron-down ${styles.arrow}`} />
              </div>
            </div>
          </div>

          {/* Address Row */}
          <div className={styles.formRow}>
            <label htmlFor='address'>Address:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-geo-alt"></i>
              <textarea name="address" rows={3} className={styles.addressTextarea}></textarea>
            </div>
          </div>
        </div>

        {/* Profile Image Column */}
        <div className={styles.imageColumn}>
          <div className={styles.imageBox}>
            <img src='../../assets/palestine.jpeg' alt='person photo'></img>
          </div>
          <div className={styles.imageLinkContainer}>
            <input name="personalImage" type="file" className={styles.imageLink} accept='.jpg,.png'></input>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <Button color='success' iconLeft='floppy-fill'>Save</Button>
      </div>
    </form>
  );
}

function yearsAgo(years: number): Date {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d;
}

// Format date object because <input> min attribute doesn't accept any other format
// except YYYY-MM-DD
function toInputDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const res = await fetch(`${baseUrl}/person/new`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  if (!res.ok) {
    const error = await res.json();
    alert(`Error: ${error.msg}`);
    return;
  }

  const person = await res.json();

  alert(`Person registered successfully with id: ${person.id}.`)
}