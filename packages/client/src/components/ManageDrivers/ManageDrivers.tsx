import { useEffect, useState } from 'react';
import styles from '../ManagePeople/ManagePeople.module.css';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import Overlay from '../Overlay/Overlay';
import ManageDriversTable from '../Tables/ManageDriversTable';
import { DriverDTO } from "@dvld/shared/src/dtos/driver.dto";
import { PersonDTO } from "@dvld/shared/src/dtos/person.dto";
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";
import { InternationalLicenseDTO } from "@dvld/shared/src/dtos/internationalLicense.dto";

import { RowActionDef, ActiveRowAction, DriversActionType } from '../../types/table';
import PersonInformation from '../Info/PersonInfo/PersonInfo';
import { LicenseHistoryInfo } from '../Info/LicenseHistoryInfo/LicenseHistoryInfo';
import { getAllDrivers } from '../../api/driver/driver';
import { getPersonById } from '../../api/person/person';
import { getAllLicensesWithDriverId } from '../../api/license/license';
import { getAllInternationalLicensesWithDriverId } from '../../api/license/intLicense';

export default function ManageDrivers() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [openMenuRow, setOpenMenuRow] = useState<string | null>(null);
  const [activeRowAction, setActiveRowAction] = useState<ActiveRowAction<DriverDTO, DriversActionType>>(null);

  const [person, setPerson] = useState<PersonDTO | undefined>(undefined);
  const [localLicenses, setLocalLicenses] = useState<LicenseDTO[]>([]);
  const [internationalLicenses, setInternationalLicenses] = useState<InternationalLicenseDTO[]>([]);

  const rowActions: RowActionDef<DriverDTO, DriversActionType>[] = [
    {
      type: DriversActionType.ShowPersonInfo,
      handler: async (row) => {
        const personData = await getPersonById(row.person_id);
        setPerson(personData);
        setActiveRowAction({ row, type: DriversActionType.ShowPersonInfo });
      }
    },

    {
      type: DriversActionType.ShowLicenseHistory,
      handler: async (row) => {
        const personData = await getPersonById(row.person_id);
        const localLicensesData = await getAllLicensesWithDriverId(row.driver_id);
        const intLicensesData = await getAllInternationalLicensesWithDriverId(row.driver_id);
        
        setPerson(personData);
        setLocalLicenses(localLicensesData);
        setInternationalLicenses(intLicensesData);
        setActiveRowAction({ row, type: DriversActionType.ShowLicenseHistory });
      }
    },
  ];

  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case DriversActionType.ShowPersonInfo:
      selectedAction = (
        <>
          <h1>View Person</h1>
          <PersonInformation person={person} />
        </>
      );
      break;

    case DriversActionType.ShowLicenseHistory:
      selectedAction = (
        <LicenseHistoryInfo
          person={person}
          localLicenses={localLicenses}
          internationalLicenses={internationalLicenses}
        />
      );
      break;
  }

  const [drivers, setDrivers] = useState<DriverDTO[]>([]);

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    getAllDrivers().then(setDrivers);
  }, [refreshKey]);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-person-vcard'></i> Manage Drivers</h1>
      </div>
      <div className={styles.controls}>
        <Filter
          options={Object.keys(drivers[0] ?? {})}
          ignoreOptions={[]}
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
        </div>

        {activeRowAction &&
          <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
            {selectedAction}
          </Overlay>
        }
      </div>
      <ManageDriversTable
        drivers={drivers}
        filterBy={filterBy}
        filterValue={filterValue}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}
