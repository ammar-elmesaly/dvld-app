import { useEffect, useState } from 'react';
import styles from './ManageApplications.module.css';
import Overlay from '../Overlay/Overlay';
import ManageApplicationsTable from '../Tables/ManageApplicationsTable';

import { ApplicationDTO } from '@dvld/shared/src/dtos/application.dto';
import { RowActionDef, ActiveRowAction, ApplicationsActionType } from '../../types/table';
import { getAllLocalDrivingLicenseApplications } from '../../api/application/application';

export default function ManageApplications() {
  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);

  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<ApplicationDTO, ApplicationsActionType>>(null);

  const rowActions: RowActionDef<ApplicationDTO, ApplicationsActionType>[] = [
    {
      type: ApplicationsActionType.View,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.View })
    },

    {
      type: ApplicationsActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.Edit })
    },
    
    {
      type: ApplicationsActionType.Delete,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.Delete })
    }
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {

    case ApplicationsActionType.View:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;

    case ApplicationsActionType.Edit:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;

    case ApplicationsActionType.Delete:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
  }

  const [applications, setApplications] = useState<ApplicationDTO[]>([]);

  useEffect(() => {
      getAllLocalDrivingLicenseApplications().then(setApplications);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-people-fill'></i> Manage Application Types</h1>
      </div>
      <div className={styles.controls}>
        { activeRowAction &&
        <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          { selectedAction }
        </Overlay>
        }
      </div>
      <ManageApplicationsTable
        applications={applications}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}