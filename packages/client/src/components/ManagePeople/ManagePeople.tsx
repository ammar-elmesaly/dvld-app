import { useEffect, useState } from 'react';
import styles from './ManagePeople.module.css';
import Button from '../Button/Button.js';
import Filter from '../Filter/Filter.js';
import Overlay from '../Overlay/Overlay.js';
import AddPersonForm from '../Forms/AddPersonForm/AddPersonForm.js';
import ManagePeopleTable from '../Tables/ManagePeopleTable.js';
import { PersonDTO } from '@dvld/shared';

import { RowActionDef, ActiveRowAction, PeopleActionType } from '../../types/table.js';
import PersonInformation from '../Info/PersonInfo/PersonInfo.js';
import { getAllPersons } from '../../api/person/person.js';
import EditPerson from '../Edit/EditPerson/EditPerson.js';
import DeletePersonForm from '../Delete/DeletePersonForm.js';
import SendEmail from '../Forms/SendEmail/SendEmail.js';
import PhoneCall from '../Forms/PhoneCall/PhoneCall.js';

export default function People() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [addPersonOpen, setAddPersonOpen] = useState(false);

  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);
  // This sets which row action is active, which could be
  // View, Delete, Call, etc..
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<PersonDTO, PeopleActionType>>(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
      getAllPersons().then(setPeople);
  }, [refreshKey]);

  const rowActions: RowActionDef<PersonDTO, PeopleActionType>[] = [
    {
      type: PeopleActionType.View,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.View })
    },

    {
      type: PeopleActionType.NewPerson,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.NewPerson })
    },

    {
      type: PeopleActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.Edit })
    },


    {
      type: PeopleActionType.Delete,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.Delete })
    },

    {
      type: PeopleActionType.Email,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.Email }),
      isDisabled: (row) => !row.email
    },

    {
      type: PeopleActionType.Call,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.Call })
    },
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case PeopleActionType.View:
      selectedAction = (
        <>
          <h1>View Person</h1>
          <PersonInformation
            person={ activeRowAction.row }
          />
        </>
      );
      break;
    
    case PeopleActionType.NewPerson:
      selectedAction = (
        <AddPersonForm handleRefresh={handleRefresh} />
      );
      break;

    case PeopleActionType.Edit:
      selectedAction = (
        <EditPerson person={activeRowAction.row} handleRefresh={handleRefresh} />
      );
      break;
    
    case PeopleActionType.Delete:
      selectedAction = (
        <DeletePersonForm person={activeRowAction.row} handleRefresh={handleRefresh} />
      );
      break;
    
    case PeopleActionType.Email:
      selectedAction = (
        <SendEmail email={activeRowAction.row.email} />
      );
      break;

    case PeopleActionType.Call:
      selectedAction = (
        <PhoneCall phone={activeRowAction.row.phone_number} />
      );
      break;
  }

  const [persons, setPeople] = useState<PersonDTO[]>([]);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-people-fill'></i> Manage People</h1>
      </div>
      <div className={styles.controls}>
        <Filter
          options={Object.keys(persons[0] ?? {})}
          ignoreOptions={["personal_photo"]}
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
          <Button color='success' iconLeft="person-fill-add" onClick={() => setAddPersonOpen(true)}>Add a person</Button>
        </div>
        <Overlay open={addPersonOpen} onClose={() => setAddPersonOpen(false)}>
          <AddPersonForm handleRefresh={handleRefresh} />
        </Overlay>

        { activeRowAction &&
        <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          { selectedAction }
        </Overlay>
        }
      </div>
      <ManagePeopleTable
        people={persons}
        filterBy={filterBy}
        filterValue={filterValue}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}