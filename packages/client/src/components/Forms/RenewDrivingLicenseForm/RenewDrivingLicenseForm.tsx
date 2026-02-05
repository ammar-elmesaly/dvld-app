import Button from '../../Button/Button';
import styles from '../Forms.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';
import { getLicenseWithPersonById } from '../../../api/license/license';
import DriverLicenseInfo from '../../Info/DriverLicenseInfo/DriverLicenseInfo';
import { LicensePersonDTO } from '@dvld/shared/src/dtos/licensePerson.dto';
import { ApplicationTypeDTO } from '@dvld/shared/src/dtos/applicationType.dto';
import { getApplicationTypeByName } from '../../../api/application/applicationType';
import { UserSession } from '../../../types/UserSession';
import { getCurrentUser } from '../../../api/user/user';

export default function RenewDrivingLicenseForm() {
  const [filterValue, setFilterValue] = useState("");
  const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);
  const [renewApplicationType, setRenewApplicationType] = useState<ApplicationTypeDTO | undefined>(undefined);

  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });

  useEffect(() => {
    getApplicationTypeByName('RENEW_DRIVING_LICENSE_SERVICE').then(setRenewApplicationType);
  }, []);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <>
      <form method='POST' onSubmit={onSubmit} className={styles.form}>
        <div className={styles.headerRow}>
          <h1>Renew Driving License</h1>
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
              <Button color='primary' icon='link' type='button'
                onClick={() => searchLicense(filterValue, setLicenseWithPerson)}
              />
            </div>
            <div className={styles.licenseInfoRow}>
              {
                licenseWithPerson &&
                <DriverLicenseInfo licenseWithPerson={licenseWithPerson} />
              }
            </div>
            <div className={styles.applicationInfoRow}>
              {
                licenseWithPerson &&
                <>
                  <div className={styles.formRow}>
                    <label htmlFor='renewal_fees'>Fees:</label>
                    <div className={styles.inputGroup}>
                      <i className="bi bi-cash"></i>
                      <span>{ renewApplicationType?.type_fees }</span>
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor='notes'>Notes:</label>
                    <div className={styles.inputGroup}>
                      <i className="bi bi-text-paragraph"></i>
                      <textarea name="notes" className={styles.notesTextArea} />
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
        <div className={styles.controls} >
          <Button
          color='success'
          iconLeft='arrow-clockwise'
          type='submit'
          >
            Renew
          </Button>
        </div>
      </form>
    </>
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!licenseWithPerson) {
      alert('Error: Please link a license first');
      return;
    }

    const confirm = window.confirm("Are you sure to renew license?");

    if (!confirm)
      return;

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      createdByUserId: user.userId,
      licenseId: licenseWithPerson.license.id,
    };

    const res = await apiFetch(`${baseUrl}/license/renew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    const renewedLicenseId = await res.json();
    alert(`License renewed successfully with new license id: ${renewedLicenseId}.`);
  }
}

async function searchLicense(
  filterValue: string,
  setLicense: React.Dispatch<React.SetStateAction<LicensePersonDTO | undefined>>
) {
    const licenseId = Number(filterValue);

    if (!Number.isInteger(licenseId)) {
      alert('Error: Id must be a number');
      return;
    }

    const license = await getLicenseWithPersonById(licenseId);
    setLicense(license);
}
