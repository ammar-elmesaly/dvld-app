import Button from '../../Button/Button';
import styles from '../Forms.module.css';
import { useEffect, useState } from 'react';
import { getLicenseWithPersonById } from '../../../api/license/license';
import DriverLicenseInfo from '../../Info/DriverLicenseInfo/DriverLicenseInfo';
import { LicensePersonDTO } from '@dvld/shared/src/dtos/licensePerson.dto';
import { apiFetch } from '../../../api/apiFetch';
import { baseUrl } from '../../../api/urls';
import { getCurrentUser } from '../../../api/user/user';
import { UserSession } from '../../../types/UserSession';

export default function DetainLicenseForm() {
  const [filterValue, setFilterValue] = useState("");
  const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);

  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <>
      <form method='POST' onSubmit={onSubmit} className={styles.form}>
        <div className={styles.headerRow}>
          <h1>Detain License</h1>
        </div>

        <div className={styles.mainLayout}>
          <div className={styles.fieldsContainer}>
            <div className={styles.filterRow}>
              <div className={styles.inputGroup}>
                <input
                  type='text'
                  onChange={(e) => setFilterValue(e.target.value)}
                  value={filterValue}
                  placeholder='Enter license id'
                />
              </div>
              <Button
                color='primary'
                icon='link'
                type='button'
                onClick={() => searchLicense(filterValue, setLicenseWithPerson)}
              />
            </div>

            <div className={styles.licenseInfoRow}>
              {licenseWithPerson && <DriverLicenseInfo licenseWithPerson={licenseWithPerson} />}
            </div>

            {licenseWithPerson && (
              <div className={styles.splitRow}>
                <div className={styles.formRow}>
                  <label htmlFor='fineFees'>Fine Fees:</label>
                  <div className={styles.inputGroup}>
                    <i className="bi bi-cash"></i>
                    <input name='fineFees' type='number' min='0' step='0.01' required />
                  </div>
                </div>
              </div>

            )}
          </div>
        </div>

        <div className={styles.controls}>
          <Button color='success' iconLeft='floppy-fill' type='submit'>
            Detain
          </Button>
        </div>
      </form>
    </>
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const confirm = window.confirm("Are you sure to detain this license?");

    if (!confirm) return;

    if (!licenseWithPerson) {
      alert('Error: Please link a license first');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      licenseId: licenseWithPerson.license.id,
      createdByUserId: user.userId
    };

    const res = await apiFetch(`${baseUrl}/license/detain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    const detainedLicenseId = await res.json();
    alert(`License detained successfully with detained license id: ${detainedLicenseId}.`);
  }
}

async function searchLicense(
  filterValue: string,
  setLicenseWithPerson: React.Dispatch<LicensePersonDTO | undefined>
) {
  const licenseId = Number(filterValue);

  if (!Number.isInteger(licenseId)) {
    alert('Error: Id must be a number');
    return;
  }

  const licenseWithPerson: LicensePersonDTO = await getLicenseWithPersonById(licenseId);
  setLicenseWithPerson(licenseWithPerson);
}
