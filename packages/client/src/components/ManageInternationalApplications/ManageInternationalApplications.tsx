import { useEffect, useState } from 'react';
import styles from './ManageInternationalApplications.module.css';
import Overlay from '../Overlay/Overlay';

import { InternationalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/internationalDrivingLicenseApplication.dto';
import { RowActionDef, ActiveRowAction, InternationalApplicationsActionType } from '../../types/table';
import { getAllInternationalDrivingLicenseApplications } from '../../api/application/application';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import IssueInternationalLicenseForm from '../Forms/IssueInternationalLicenseForm/IssueInternationalLicenseForm';
import DriverLicenseInfo from '../Info/DriverLicenseInfo/DriverLicenseInfo';
import { getAllLicensesWithDriverId, getLicenseWithPersonById } from '../../api/license/license';
import { LicensePersonDTO } from '@dvld/shared/src/dtos/licensePerson.dto';
import ManageInternationalApplicationsTable from '../Tables/ManageInternationalApplicationsTable';
import PersonInfo from '../Info/PersonInfo/PersonInfo';
import { LicenseHistoryInfo } from '../Info/LicenseHistoryInfo/LicenseHistoryInfo';
import { LicenseDTO } from '@dvld/shared/src/dtos/license.dto';
import { InternationalLicenseDTO } from '@dvld/shared/src/dtos/internationalLicense.dto';
import { getAllInternationalLicensesWithDriverId } from '../../api/license/intLicense';

export default function ManageInternationalApplications() {
  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<InternationalDrivingLicenseApplicationDTO, InternationalApplicationsActionType>>(null);

  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [newInternationalDrivingLicenseOpen, setNewInternationalDrivingLicenseOpen] = useState(false);

  const [applications, setApplications] = useState<InternationalDrivingLicenseApplicationDTO[]>([]);

  const [refreshKey, setRefreshKey] = useState(0);
  
  const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);

  const [localLicenses, setLocalLicenses] = useState<LicenseDTO[] | undefined>();
  const [intLicenses, setIntLicenses] = useState<InternationalLicenseDTO[] | undefined>();

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
      getAllInternationalDrivingLicenseApplications().then(setApplications);
  }, [refreshKey]);

  useEffect(() => {
    if (!activeRowAction?.row.local_license_id)
      return;

    const licenseId = activeRowAction.row.local_license_id;

    getLicenseWithPersonById(licenseId).then(setLicenseWithPerson)
  }, [activeRowAction]);

  useEffect(() => {
    if (!activeRowAction?.row.driver_id)
      return;

    getAllInternationalLicensesWithDriverId(activeRowAction.row.driver_id).then(setIntLicenses);
    getAllLicensesWithDriverId(activeRowAction.row.driver_id).then(setLocalLicenses);
  }, [activeRowAction]);

  const rowActions: RowActionDef<InternationalDrivingLicenseApplicationDTO, InternationalApplicationsActionType>[] = [
    {
      type: InternationalApplicationsActionType.ShowPerson,
      handler: (row) => setActiveRowAction({ row, type: InternationalApplicationsActionType.ShowPerson })
    },

    {
      type: InternationalApplicationsActionType.ShowLicense,
      handler: (row) => setActiveRowAction({ row, type: InternationalApplicationsActionType.ShowLicense }),
    },

    {
      type: InternationalApplicationsActionType.ShowHistory,
      handler: (row) => setActiveRowAction({ row, type: InternationalApplicationsActionType.ShowHistory })
    },
  ];

  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case InternationalApplicationsActionType.ShowPerson:
      selectedAction = (
        <PersonInfo person={licenseWithPerson?.person} />
      );
      break;

    case InternationalApplicationsActionType.ShowLicense: {
      selectedAction = (
        <>
          {
            licenseWithPerson &&
            <DriverLicenseInfo
            licenseWithPerson={licenseWithPerson}
            />
          }
        </>
      );
      break;
    }

    case InternationalApplicationsActionType.ShowHistory:
      selectedAction = (
        <LicenseHistoryInfo
        person={licenseWithPerson?.person}
        localLicenses={localLicenses ?? []}
        internationalLicenses={intLicenses ?? []}
        />
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
          <Button color='success' iconLeft="file-earmark-plus" onClick={() => setNewInternationalDrivingLicenseOpen(true)}>
            New International Driving Licens
          </Button>
        </div>
        <Overlay open={newInternationalDrivingLicenseOpen} onClose={() => setNewInternationalDrivingLicenseOpen(false)}>
          <IssueInternationalLicenseForm />
        </Overlay>
        { activeRowAction &&
        <Overlay zindex={999} open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          { selectedAction }
        </Overlay>
        }
      </div>
      <ManageInternationalApplicationsTable
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