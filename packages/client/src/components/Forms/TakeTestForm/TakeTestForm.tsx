import Button from '../../Button/Button';
import styles from '../Forms.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';
import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import { TestTypeDTO } from '@dvld/shared/src/dtos/testType.dto';
import { getTestTypeById } from '../../../api/test/testType';
import { TestAppointmentDTO } from '@dvld/shared/src/dtos/testAppointment.dto';
import { UserSession } from '../../../types/UserSession';
import { getCurrentUser } from '../../../api/user/user';
import { getTrialNumber } from '../../../api/test/testAppointment';

interface TestAppointmentFormProps {
  ldla: LocalDrivingLicenseApplicationDTO;
  testTypeId: number;
  testAppointment: TestAppointmentDTO;
  handleRefresh: () => void;
  handleManageLocalApplicationsRefresh: () => void;
}

export default function TakeTestForm({ ldla, testTypeId, testAppointment, handleManageLocalApplicationsRefresh, handleRefresh }: TestAppointmentFormProps) {
  const [testType, setTestType] = useState<TestTypeDTO | undefined>(undefined);
  
  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });
  const [trialNumber, setTrialNumber] = useState(0);

  useEffect(() => {
    getTestTypeById(testTypeId).then(setTestType)
  }, [testTypeId]);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    getTrialNumber(ldla.local_driving_license_application_id, testTypeId).then(setTrialNumber);
  }, [ldla, testTypeId]);

  return (
    <>
      <form method='POST' onSubmit={(e) => onSubmit(e, testAppointment.id, user.userId, handleManageLocalApplicationsRefresh, handleRefresh)} className={styles.takeTestFormForm}>
        <div className={styles.headerRow}>
          <h1>Take Test</h1>
        </div>

        <div className={styles.mainLayout}>
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
              <span>{ testAppointment.appointment_date }</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='test fees'>Fees:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-cash"></i>
              <span>{ testType?.type_fees }</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='Test Result'>Result:</label>
            <div className={styles.radioGroup}>
              <label htmlFor='test result succeeded'><input type="radio" name="testStatus" value="1" required /> Success</label>
              <label htmlFor='test result failed'><input type="radio" name="testStatus" value="0" required /> Fail</label>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='test_notes'>Notes:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-text-paragraph"></i>
              <textarea name="testNotes" className={styles.notesTextArea} />
            </div>
          </div>  

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
}

async function onSubmit(
  e: React.FormEvent<HTMLFormElement>,
  testAppointmentId: number,
  createdByUserId: number,
  handleManageLocalApplicationsRefresh: () => void,
  handleRefresh: () => void
) {
  e.preventDefault();

  const confirm = window.confirm("Are you sure to record test result? This can't be modified later.");

  if (!confirm)
    return;

  const formData = new FormData(e.currentTarget);

  const data = Object.fromEntries(formData.entries());

  const payload = {
    ...data,
    testAppointmentId,
    createdByUserId,
  };

  const res = await apiFetch(`${baseUrl}/test/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include'
  });

  const testId = await res.json();
  alert(`Test taken successfully with id: ${testId}.`);
  handleRefresh();
  handleManageLocalApplicationsRefresh(); // Basically refreshes the main Manage Local Driving License Applications Page
}