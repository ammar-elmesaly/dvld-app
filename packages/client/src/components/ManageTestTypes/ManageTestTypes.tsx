import { useEffect, useState } from 'react';
import styles from './ManageTestTypes.module.css';
import Overlay from '../Overlay/Overlay';

import ManageTestTypesTable from '../Tables/ManageTestTypesTable';
import { TestTypeDTO } from '@dvld/shared/src/dtos/testType.dto';
import { RowActionDef, ActiveRowAction, TestTypesActionType } from '../../types/table';
import { getAllTestTypes } from '../../api/test/testType';
import { EditTestType } from '../Edit/EditTestType/EditTestType';
import Button from '../Button/Button';

export default function ManageTestTypes() {
  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);

  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<TestTypeDTO, TestTypesActionType>>(null);

  const rowActions: RowActionDef<TestTypeDTO, TestTypesActionType>[] = [
    {
      type: TestTypesActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: TestTypesActionType.Edit })
    }
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case TestTypesActionType.Edit:
      selectedAction = (
        <EditTestType testType={activeRowAction.row} />
      );
      break;
  }

  const [testTypes, setTestTypes] = useState<TestTypeDTO[]>([]);

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
      getAllTestTypes().then(setTestTypes);
  }, [refreshKey]);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-people-fill'></i> Manage Test Types</h1>
      </div>
      <div className={styles.controls}>
        <Button 
          color='primary' 
          icon="arrow-clockwise" 
          onClick={handleRefresh} 
        />
        { activeRowAction &&
        <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          { selectedAction }
        </Overlay>
        }
      </div>
      <ManageTestTypesTable
        testTypes={testTypes}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}