import { useEffect, useState } from 'react';
import styles from './ManageTestAppointments.module.css';
import Overlay from '../Overlay/Overlay';

import { RowActionDef, ActiveRowAction, TestAppoitnmentsActionType } from '../../types/table';
import { TestAppointmentDTO } from '@dvld/shared/src/dtos/testAppointment.dto';
import ManageTestAppointmentsTable from '../Tables/ManageAppointmentsTable';
import { getAllTestAppointments } from '../../api/test/testAppointment';
import Button from '../Button/Button';
import AddTestAppointmentForm from '../Forms/AddTestAppointmentForm/AddTestAppointmentForm';
import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import EditTestAppointmentForm from '../Edit/EditTestAppointmentForm/EditTestAppointmentForm';

interface ManageTestAppointmentsProps {
  localDrivingLicenseApplication: LocalDrivingLicenseApplicationDTO;
  passedTests: number;
}

export default function ManageTestAppointments({ localDrivingLicenseApplication, passedTests }: ManageTestAppointmentsProps) {
  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);

  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<TestAppointmentDTO, TestAppoitnmentsActionType>>(null);

  const rowActions: RowActionDef<TestAppointmentDTO, TestAppoitnmentsActionType>[] = [
    {
      type: TestAppoitnmentsActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: TestAppoitnmentsActionType.Edit })
    },

    {
      type: TestAppoitnmentsActionType.TakeTest,
      handler: (row) => setActiveRowAction({ row, type: TestAppoitnmentsActionType.TakeTest })
    }
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case TestAppoitnmentsActionType.Edit:
      selectedAction = (
        <EditTestAppointmentForm testAppointment={activeRowAction.row} testTypeId={passedTests + 1} ldla={localDrivingLicenseApplication} />
      );
      break;

    case TestAppoitnmentsActionType.TakeTest:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
  }

  const [testAppointments, setTestAppointments] = useState<TestAppointmentDTO[]>([]);
  const [addTestAppointmentOpen, setAddTestAppointmentOpen] = useState(false);

  useEffect(() => {
      getAllTestAppointments(localDrivingLicenseApplication.local_driving_license_application_id).then(setTestAppointments);
  }, [localDrivingLicenseApplication]);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.h1}><i className='bi bi-window-fullscreen'></i> Manage Test Appointments</h2>
      </div>
      <div className={styles.controls}>
        <Button color='success' icon="file-earmark-plus-fill" onClick={() => setAddTestAppointmentOpen(true)} />
        <Overlay open={addTestAppointmentOpen} onClose={() => setAddTestAppointmentOpen(false)}>
          {/*
          Test appointment form takes passedTests + 1, meaning if no passed test, then passedTests = 0,
          then testTypeId = 1 (vision Test), and so on
          */}
          <AddTestAppointmentForm testTypeId={passedTests + 1} ldla={localDrivingLicenseApplication} />
        </Overlay>
        { activeRowAction &&
        <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          { selectedAction }
        </Overlay>
        }
      </div>
      <ManageTestAppointmentsTable
        testAppointments={testAppointments}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}