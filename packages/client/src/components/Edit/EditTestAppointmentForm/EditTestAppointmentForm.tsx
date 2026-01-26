import Button from '../../Button/Button';
import styles from './EditTestAppointmentForm.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';
import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import { toInputDate } from '../../../helpers/date';
import { TestTypeDTO } from '@dvld/shared/src/dtos/testType.dto';
import { getTestTypeById } from '../../../api/test/testType';
import { TestAppointmentDTO } from '@dvld/shared/src/dtos/testAppointment.dto';

interface TestAppointmentFormProps {
  ldla: LocalDrivingLicenseApplicationDTO;
  testTypeId: number;
  testAppointment: TestAppointmentDTO;
}

export default function EditTestAppointmentForm({ ldla, testTypeId, testAppointment }: TestAppointmentFormProps) {
  const minDateString = toInputDate(new Date());
  const oldDateString = toInputDate(new Date(testAppointment.appointment_date));
  
  const [testType, setTestType] = useState<TestTypeDTO | undefined>(undefined);
  
  useEffect(() => {
    getTestTypeById(testTypeId).then(setTestType)
  }, [testTypeId]);

  return (
    <>
      <form method='POST' onSubmit={onSubmit} className={styles.form}>
        <div className={styles.headerRow}>
          <h1>Edit Test Appointment</h1>
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
              <span>0{/* TODO */}</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='appointment date'>Date:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-calendar3"></i>
              <input name="appointmentDate" type="date" defaultValue={oldDateString} min={minDateString} required />
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='test fees'>Fees:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-cash"></i>
              <span>{ testType?.type_fees }</span>
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

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const data = Object.fromEntries(formData.entries());

  const res = await apiFetch(`${baseUrl}/testAppointment/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  const testAppointmentId = await res.json();

  alert(`Test appointment updated successfully: ${testAppointmentId}.`);
}