import { useEffect, useState } from 'react';
import styles from '../ManagePeople/ManagePeople.module.css';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import Overlay from '../Overlay/Overlay';
import ManageDetainedLicensesTable from '../Tables/ManageDetainedLicensesTable';
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";
import { DetainedLicenseDTO } from "@dvld/shared/src/dtos/detainedLicense.dto";
import { PersonDTO } from "@dvld/shared/src/dtos/person.dto";
import { LicensePersonDTO } from '@dvld/shared/src/dtos/licensePerson.dto';
import { RowActionDef, ActiveRowAction, DetainedLicensesActionType } from '../../types/table';
import PersonInformation from '../Info/PersonInfo/PersonInfo';
import DriverLicenseInfo from '../Info/DriverLicenseInfo/DriverLicenseInfo';
import { LicenseHistoryInfo } from '../Info/LicenseHistoryInfo/LicenseHistoryInfo';
import DetainLicenseForm from '../Forms/DetainLicenseForm/DetainLicenseForm';
import ReleaseLicenseForm from '../Forms/ReleaseLicenseForm/ReleaseLicenseForm';
import { getAllDetainedLicenses, getLicenseWithPersonById, getAllLicensesWithDriverId } from '../../api/license/license';
import { getPersonByDriverId } from '../../api/person/person';
import { getAllInternationalLicensesWithDriverId } from '../../api/license/intLicense';
import { InternationalLicenseDTO } from '@dvld/shared/src/dtos/internationalLicense.dto';

export default function ManageDetainedLicenses() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [detainFormOpen, setDetainFormOpen] = useState(false);
  const [releaseFormOpen, setReleaseFormOpen] = useState(false);

  const [openMenuRow, setOpenMenuRow] = useState<string | null>(null);
  const [activeRowAction, setActiveRowAction] = useState<ActiveRowAction<DetainedLicenseDTO, DetainedLicensesActionType>>(null);

  const [person, setPerson] = useState<PersonDTO | undefined>(undefined);
  const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);
  const [localLicenses, setLocalLicenses] = useState<LicenseDTO[]>([]);
  const [internationalLicenses, setInternationalLicenses] = useState<InternationalLicenseDTO[]>([]);

  const [licenses, setLicenses] = useState<DetainedLicenseDTO[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    getAllDetainedLicenses().then(setLicenses);
  }, [refreshKey]);

  useEffect(() => {
    if (!activeRowAction?.row) return;

    getPersonByDriverId(activeRowAction.row.driver_id).then(setPerson);
  }, [activeRowAction]);

  useEffect(() => {
    if (!activeRowAction?.row) return;

    getLicenseWithPersonById(activeRowAction.row.license_id).then(setLicenseWithPerson);
  }, [activeRowAction]);

  useEffect(() => {
    if (!activeRowAction?.row) return;

    getAllLicensesWithDriverId(activeRowAction.row.driver_id).then(setLocalLicenses);
    getAllInternationalLicensesWithDriverId(activeRowAction.row.driver_id).then(setInternationalLicenses);
  }, [activeRowAction]);

  const rowActions: RowActionDef<DetainedLicenseDTO, DetainedLicensesActionType>[] = [
    {
      type: DetainedLicensesActionType.ShowPersonInfo,
      handler: (row) => setActiveRowAction({ row, type: DetainedLicensesActionType.ShowPersonInfo })
    },

    {
      type: DetainedLicensesActionType.ShowLicense,
      handler: (row) => setActiveRowAction({ row, type: DetainedLicensesActionType.ShowLicense })
    },

    {
      type: DetainedLicensesActionType.ShowLicenseHistory,
      handler: (row) => setActiveRowAction({ row, type: DetainedLicensesActionType.ShowLicenseHistory })
    },
  ];

  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case DetainedLicensesActionType.ShowPersonInfo:
      selectedAction = (
        <>
          <h1>View Person</h1>
          <PersonInformation person={person} />
        </>
      );
      break;

    case DetainedLicensesActionType.ShowLicense:
      selectedAction = (
        <>
          <h1>View License</h1>
          {licenseWithPerson && <DriverLicenseInfo licenseWithPerson={licenseWithPerson} />}
        </>
      );
      break;

    case DetainedLicensesActionType.ShowLicenseHistory:
      selectedAction = (
        <LicenseHistoryInfo
          person={person}
          localLicenses={localLicenses}
          internationalLicenses={internationalLicenses}
        />
      );
      break;
  }

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-lock-fill'></i> Manage Detained Licenses</h1>
      </div>
      <div className={styles.controls}>
        <Filter
          options={Object.keys(licenses[0] ?? {})}
          ignoreOptions={["notes"]}
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
          <Button 
            color='warning' 
            iconLeft="lock-fill" 
            onClick={() => setDetainFormOpen(true)}
          >
            Detain License
          </Button>
          <Button 
            color='success' 
            iconLeft="unlock-fill" 
            onClick={() => setReleaseFormOpen(true)}
          >
            Release License
          </Button>
        </div>

        <Overlay open={detainFormOpen} onClose={() => setDetainFormOpen(false)}>
          <DetainLicenseForm handleRefresh={handleRefresh} />
        </Overlay>

        <Overlay open={releaseFormOpen} onClose={() => setReleaseFormOpen(false)}>
          <ReleaseLicenseForm handleRefresh={handleRefresh} />
        </Overlay>

        {activeRowAction &&
          <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
            {selectedAction}
          </Overlay>
        }
      </div>
      <ManageDetainedLicensesTable
        licenses={licenses}
        filterBy={filterBy}
        filterValue={filterValue}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}
