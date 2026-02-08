import Button from '../../Button/Button';
import styles from '../Forms.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';
import { getDetainedLicenseWithLicenseId, getLicenseWithPersonById } from '../../../api/license/license';
import DriverLicenseInfo from '../../Info/DriverLicenseInfo/DriverLicenseInfo';

import { LicensePersonDTO } from '@dvld/shared/src/dtos/licensePerson.dto';
import { ApplicationTypeDTO } from '@dvld/shared/src/dtos/applicationType.dto';
import { DetainedLicenseDTO } from "@dvld/shared/src/dtos/detainedLicense.dto";

import { getApplicationTypeByName } from '../../../api/application/applicationType';
import { UserSession } from '../../../types/UserSession';
import { getCurrentUser } from '../../../api/user/user';

interface ReleaseLicenseFormProps {
  handleRefresh?: () => void;
}

export default function ReleaseLicenseForm({ handleRefresh }: ReleaseLicenseFormProps) {
  const [filterValue, setFilterValue] = useState("");
  const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);
  const [detainedLicense, setDetainedLicense] = useState<DetainedLicenseDTO | undefined>(undefined);
  const [releaseApplicationType, setReleaseApplicationType] = useState<ApplicationTypeDTO | undefined>(undefined);

  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });

  useEffect(() => {
    getApplicationTypeByName('RELEASE_DETAINED_SERVICE').then(setReleaseApplicationType);
  }, []);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <>
      <form method='POST' onSubmit={onSubmit} className={styles.form}>
        <div className={styles.headerRow}>
          <h1>Release Detained License</h1>
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
                onClick={() => searchLicense(filterValue, setLicenseWithPerson, setDetainedLicense)}
              />
            </div>

            <div className={styles.licenseInfoRow}>
              {licenseWithPerson && <DriverLicenseInfo licenseWithPerson={licenseWithPerson} />}
            </div>

            {licenseWithPerson && detainedLicense && (
              <div className={styles.tripleSplitRow}>
                <div className={styles.formRow}>
                  <label htmlFor='fine_fees'>Fine Fees:</label>
                  <div className={styles.inputGroup}>
                    <i className="bi bi-cash"></i>
                    <span>{detainedLicense.fine_fees}</span>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <label htmlFor='release_fees'>Release Fees:</label>
                  <div className={styles.inputGroup}>
                    <i className="bi bi-cash"></i>
                    <span>{releaseApplicationType?.type_fees}</span>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <label htmlFor='total_fees'>Total Fees:</label>
                  <div className={styles.inputGroup}>
                    <i className="bi bi-cash"></i>
                    <span>
                      {Number(detainedLicense.fine_fees) + Number(releaseApplicationType?.type_fees)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.controls}>
          <Button color='success' iconLeft='unlock-fill' type='submit'>
            Release
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

    const confirm = window.confirm("Are you sure to release this detained license?");

    if (!confirm) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      licenseId: licenseWithPerson.license.id,
      releasedByUserId: user.userId,
    };

    const res = await apiFetch(`${baseUrl}/license/release`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    const licenseId = await res.json();
    alert(`License with id: ${licenseId} released successfully.`);
    if (handleRefresh)
      handleRefresh();
  }
}

async function searchLicense(
  filterValue: string,
  setLicenseWithPerson: React.Dispatch<LicensePersonDTO | undefined>,
  setDetainedLicense: React.Dispatch<DetainedLicenseDTO | undefined>
) {
  const licenseId = Number(filterValue);

  if (!Number.isInteger(licenseId)) {
    alert('Error: Id must be a number');
    return;
  }

  const licenseWithPerson: LicensePersonDTO = await getLicenseWithPersonById(licenseId);
  const detainedLicense: DetainedLicenseDTO = await getDetainedLicenseWithLicenseId(licenseId);

  setLicenseWithPerson(licenseWithPerson);
  setDetainedLicense(detainedLicense);
}
