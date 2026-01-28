import { useEffect, useState } from 'react';
import styles from './ManageLocalApplications.module.css';
import Overlay from '../Overlay/Overlay';
import ManageApplicationsTable from '../Tables/ManageApplicationsTable';

import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import { RowActionDef, ActiveRowAction, ApplicationsActionType } from '../../types/table';
import { getAllLocalDrivingLicenseApplications } from '../../api/application/application';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import NewLocalLicenseForm from '../Forms/NewLocalLicenseForm/NewLocalLicenseForm';
import { ApplicationStatus } from '@dvld/shared/src/types/application';
import { ApplicationBasicInfo } from '../Info/ApplicationBasicInfo/ApplicationBasicInfo';
import { DrivingLicenseInfo } from '../Info/DrivingLicenseInfo/DrivingLicenseInfo';
import ManageTestAppointments from '../ManageTestAppointments/ManageTestAppointments';

export default function ManageLocalApplications() {
  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<LocalDrivingLicenseApplicationDTO, ApplicationsActionType>>(null);

  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newLocalDrivingLicenseOpen, setNewLocalDrivingLicenseOpen] = useState(false);

  const [applications, setApplications] = useState<LocalDrivingLicenseApplicationDTO[]>([]);

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
      getAllLocalDrivingLicenseApplications().then(setApplications);
  }, [refreshKey]);

  const rowActions: RowActionDef<LocalDrivingLicenseApplicationDTO, ApplicationsActionType>[] = [
    {
      type: ApplicationsActionType.View,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.View }),
    },

    {
      type: ApplicationsActionType.NewApp,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.NewApp }),
    },

    {
      type: ApplicationsActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.Edit })
    },

    {
      type: ApplicationsActionType.Delete,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.Delete })
    },

    {
      type: ApplicationsActionType.CancelApp,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.CancelApp })
    },

    {
      type: ApplicationsActionType.Vision,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.Vision }),
      isDisabled: (row) => row.passed_tests !== 0
    },
    
    {
      type: ApplicationsActionType.Written,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.Written }),
      isDisabled: (row) => row.passed_tests !== 1
    },

    {
      type: ApplicationsActionType.Street,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.Street }),
      isDisabled: (row) => row.passed_tests !== 2
    },

    {
      type: ApplicationsActionType.IssueLicense,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.IssueLicense }),
      isDisabled: (row) => row.passed_tests !== 3
    },

    {
      type: ApplicationsActionType.ShowLicense,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.ShowLicense }),
      isDisabled: (row) => row.status !== ApplicationStatus.Completed
    },

    {
      type: ApplicationsActionType.ShowHistory,
      handler: (row) => setActiveRowAction({ row, type: ApplicationsActionType.ShowHistory })
    },
  ];

  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case ApplicationsActionType.View:
      selectedAction = (
        <>
          <DrivingLicenseInfo
            dlAppId={activeRowAction.row.local_driving_license_application_id}
            licenseClass={activeRowAction.row.license_class_name}
            passedTests={`${activeRowAction.row.passed_tests}/3`}
          />
          <hr style={{ "margin": "15px 0px" }} />
          <ApplicationBasicInfo application={activeRowAction.row} />
          <hr style={{ "margin": "15px 0px" }} />
        </>
      );
      break;

    case ApplicationsActionType.NewApp: {
      selectedAction = (
        <NewLocalLicenseForm />
      );
      break;
    }

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

    case ApplicationsActionType.CancelApp:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;

    case ApplicationsActionType.Vision:
    case ApplicationsActionType.Written:
    case ApplicationsActionType.Street:

    {
      const localDrivingLicenseApplication = activeRowAction.row;

      selectedAction = (
        <>
          <DrivingLicenseInfo
            dlAppId={localDrivingLicenseApplication.local_driving_license_application_id}
            licenseClass={localDrivingLicenseApplication.license_class_name}
            passedTests={`${localDrivingLicenseApplication.passed_tests}/3`}
          />
          <hr style={{ "margin": "15px 0px" }} />
          <ApplicationBasicInfo application={localDrivingLicenseApplication} />
          <hr style={{ "margin": "15px 0px" }} />
          <ManageTestAppointments handleManageLocalApplicationsRefresh={handleRefresh} localDrivingLicenseApplication={localDrivingLicenseApplication} passedTests={localDrivingLicenseApplication.passed_tests}/>
        </>
      );
      break;
    }

    case ApplicationsActionType.IssueLicense:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;

    case ApplicationsActionType.ShowLicense:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;

    case ApplicationsActionType.ShowHistory:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
  }

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-window-dock'></i> Manage Local Driving License Applications</h1>
      </div>
      <div className={styles.controls}>
        <Filter
          options={Object.keys(applications[0] ?? {})}
          ignoreOptions={['application_id', 'application_fees', 'paid_fees', 'retake_test_fees',  'created_by_user_name', 'application_type_name']}
          filterBy={filterBy}
          filterValue={filterValue}
          setFilterBy={setFilterBy}
          setFilterValue={setFilterValue}
        />
        <div className={styles.refreshAdd}>
          <Button 
            color='primary' 
            icon="arrow-clockwise" 
            onClick={handleRefresh} 
          />
          <Button color='success' iconLeft="file-earmark-plus" onClick={() => setNewLocalDrivingLicenseOpen(true)}>New Local Driving License</Button>
        </div>
        <Overlay open={newLocalDrivingLicenseOpen} onClose={() => setNewLocalDrivingLicenseOpen(false)}>
          <NewLocalLicenseForm />
        </Overlay>
        { activeRowAction &&
        <Overlay zindex={999} open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          { selectedAction }
        </Overlay>
        }
      </div>
      <ManageApplicationsTable
        filterBy={filterBy}
        filterValue={filterValue}
        applications={applications}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}