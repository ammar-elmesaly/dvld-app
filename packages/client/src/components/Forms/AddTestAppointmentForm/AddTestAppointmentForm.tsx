import Button from '../../Button/Button';
import styles from '../Forms.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';
import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import { toInputDate } from '../../../helpers/date';
import { TestTypeDTO } from '@dvld/shared/src/dtos/testType.dto';
import { RetakeTestInfo } from '../../Info/RetakeTestInfo/RetakeTestInfo';
import { TestAppointmentDTO } from '@dvld/shared/src/dtos/testAppointment.dto';
import { UserSession } from '../../../types/UserSession';
import { getCurrentUser } from '../../../api/user/user';
import { TestResult } from '@dvld/shared/src/types/test';
import { getTrialNumber } from '../../../api/test/testAppointment';

interface TestAppointmentFormProps {
  ldla: LocalDrivingLicenseApplicationDTO;
  testType: TestTypeDTO;
  lastTestAppointment?: TestAppointmentDTO;
  handleRefresh: () => void;
}

export default function AddTestAppointmentForm({ ldla, testType, lastTestAppointment, handleRefresh }: TestAppointmentFormProps) {
  // Minimum date you can select is today (now), you can't make an appointment in the past
  // obviously :)
  const minDateString = toInputDate(new Date());
  
  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });
  
  const [trialNumber, setTrialNumber] = useState(0);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    getTrialNumber(ldla.local_driving_license_application_id, testType.id).then(setTrialNumber);
  }, [ldla, testType]);

  return (
    <>
      <form method='POST' onSubmit={onSubmit} className={styles.form}>
        <div className={styles.headerRow}>
          <h1>New Test Appointment</h1>
        </div>

        <div className={styles.mainLayoutColumn}>
          <div className={styles.formRow}>
            <label htmlFor='dl_id'>D.L.App.ID:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-hash"></i>
              <span>{ldla.local_driving_license_application_id}</span>
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor='dl_class'>D.L.App Class:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-tag"></i>
              <span>{ldla.license_class_name}</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='applicant_fullname'>Name:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-person-fill"></i>
              <span>{ldla.full_name}</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='trial_no'>Trial:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-arrow-clockwise"></i>
              <span>{trialNumber}</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='appointment date'>Date:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-calendar3"></i>
              <input name="appointmentDate" type="date" min={minDateString} required />
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='test fees'>Fees:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-cash"></i>
              <span>{ testType?.type_fees }</span>
            </div>
          </div>

          {
            lastTestAppointment?.test_status === TestResult.Fail && (
            <div className={styles.retakeTestInfo}>
              <RetakeTestInfo testTypeFees={testType?.type_fees}
              retakeTestFees={ldla.retake_test_fees}
              />
            </div>
            )
          }
        </div>  
        <div className={styles.controls} >
          <Button
          color='success'
          iconLeft='floppy-fill'
          type='submit'
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      testTypeId: testType?.id,
      localDrivingLicenseApplicationId: ldla.local_driving_license_application_id,
      createdByUserId: user.userId
    };

    const res = await apiFetch(`${baseUrl}/testAppointment/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    const testAppointmentId = await res.json();
    alert(`Test appointment creation successfull with id: ${testAppointmentId}.`);
    handleRefresh();
  }
}