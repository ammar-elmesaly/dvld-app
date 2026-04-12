import { useEffect, useState } from 'react';
import styles from './ManageTestAppointments.module.css';
import Overlay from '../Overlay/Overlay.js';

import { RowActionDef, ActiveRowAction, TestAppoitnmentsActionType } from '../../types/table.js';
import { TestAppointmentDTO } from '@dvld/shared';
import ManageTestAppointmentsTable from '../Tables/ManageAppointmentsTable.js';
import { getAllTestAppointments } from '../../api/test/testAppointment.js';
import Button from '../Button/Button.js';
import AddTestAppointmentForm from '../Forms/AddTestAppointmentForm/AddTestAppointmentForm.js';
import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared';
import EditTestAppointmentForm from '../Edit/EditTestAppointmentForm/EditTestAppointmentForm.js';
import TakeTestForm from '../Forms/TakeTestForm/TakeTestForm.js';
import { TestTypeDTO } from '@dvld/shared';

interface ManageTestAppointmentsProps {
  localDrivingLicenseApplication: LocalDrivingLicenseApplicationDTO;
  nextTest: TestTypeDTO;
  handleManageLocalApplicationsRefresh: () => void;  // Parent component refresh
}

export default function ManageTestAppointments({ localDrivingLicenseApplication, nextTest, handleManageLocalApplicationsRefresh }: ManageTestAppointmentsProps) {
  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<TestAppointmentDTO, TestAppoitnmentsActionType>>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const rowActions: RowActionDef<TestAppointmentDTO, TestAppoitnmentsActionType>[] = [
    {
      type: TestAppoitnmentsActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: TestAppoitnmentsActionType.Edit }),
      isDisabled: (row) => row.is_locked
    },

    {
      type: TestAppoitnmentsActionType.TakeTest,
      handler: (row) => setActiveRowAction({ row, type: TestAppoitnmentsActionType.TakeTest }),
      isDisabled: (row) => row.is_locked
    }
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case TestAppoitnmentsActionType.Edit:
      selectedAction = (
        <EditTestAppointmentForm testAppointment={activeRowAction.row} testType={nextTest} ldla={localDrivingLicenseApplication} handleRefresh={handleRefresh} />
      );
      break;

    case TestAppoitnmentsActionType.TakeTest:
      selectedAction = (
        <TakeTestForm testAppointment={activeRowAction.row} testType={nextTest} ldla={localDrivingLicenseApplication} handleManageLocalApplicationsRefresh={handleManageLocalApplicationsRefresh} handleRefresh={handleRefresh}/>
      );
      break;
  }

  const [testAppointments, setTestAppointments] = useState<TestAppointmentDTO[]>([]);
  const [addTestAppointmentOpen, setAddTestAppointmentOpen] = useState(false);

  useEffect(() => {
      getAllTestAppointments(localDrivingLicenseApplication.local_driving_license_application_id).then(setTestAppointments);
  }, [localDrivingLicenseApplication, refreshKey]);


  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.h1}><i className='bi bi-window-fullscreen'></i> Manage Test Appointments</h2>
      </div>
      <div className={styles.controls}>
        <Button 
          color='primary' 
          icon="arrow-clockwise" 
          onClick={handleRefresh} 
        />
        <Button color='success' icon="file-earmark-plus-fill" onClick={() => setAddTestAppointmentOpen(true)} />
        <Overlay open={addTestAppointmentOpen} onClose={() => setAddTestAppointmentOpen(false)}>
          <AddTestAppointmentForm lastTestAppointment={testAppointments[0]} testType={nextTest} ldla={localDrivingLicenseApplication} handleRefresh={handleRefresh} />
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