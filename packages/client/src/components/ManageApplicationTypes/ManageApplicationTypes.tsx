import { useEffect, useState } from 'react';
import styles from './ManageApplicationTypes.module.css';
import Overlay from '../Overlay/Overlay';
import ManageApplicationTypesTable from '../Tables/ManageApplicationTypesTable';

import { ApplicationTypeDTO } from '@dvld/shared/src/dtos/applicationType.dto';
import { RowActionDef, ActiveRowAction, ApplicationTypesActionType } from '../../types/table';
import { getAllApplicationTypes } from '../../api/application/applicationType';
import { EditApplicationType } from '../Edit/EditApplicationType/EditApplicationType';

export default function ManageApplicationTypes() {
  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);

  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<ApplicationTypeDTO, ApplicationTypesActionType>>(null);

  const rowActions: RowActionDef<ApplicationTypeDTO, ApplicationTypesActionType>[] = [
    {
      type: ApplicationTypesActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: ApplicationTypesActionType.Edit })
    }
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case ApplicationTypesActionType.Edit:
      selectedAction = (
        <EditApplicationType applicationType={activeRowAction.row} />
      );
      break;
  }

  const [applicationTypes, setApplicationTypes] = useState<ApplicationTypeDTO[]>([]);

  useEffect(() => {
      getAllApplicationTypes().then(setApplicationTypes);
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
      <ManageApplicationTypesTable
        applicationTypes={applicationTypes}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}