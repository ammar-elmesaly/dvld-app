import { useEffect, useState } from 'react';
import styles from './ManagePeople.module.css';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import Overlay from '../Overlay/Overlay';
import AddPersonForm from '../Forms/AddPersonForm/AddPersonForm';
import ManagePeopleTable from '../Tables/ManagePeopleTable';
import { PersonDTO } from "@dvld/shared/src/dtos/person.dto";

import { RowActionDef, ActiveRowAction, PeopleActionType } from '../../types/table';
import PersonInformation from '../PersonInformation/PersonInformation';
import { getAllPersons } from '../../api/person/person';

export default function People() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [addPersonOpen, setAddPersonOpen] = useState(false);

  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);
  // This sets which row action is active, which could be
  // View, Delete, Call, etc..
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<PersonDTO, PeopleActionType>>(null);

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
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.Email })
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
        <AddPersonForm />
      );
      break;

    case PeopleActionType.Edit:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
    
    case PeopleActionType.Delete:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
    
    case PeopleActionType.Email:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;

    case PeopleActionType.Call:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
  }

  const [persons, setPeople] = useState<PersonDTO[]>([]);

  useEffect(() => {
      getAllPersons().then(setPeople);
  }, []);

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
        <Button color='success' iconLeft="person-fill-add" onClick={() => setAddPersonOpen(true)}>Add a person</Button>
        <Overlay open={addPersonOpen} onClose={() => setAddPersonOpen(false)}>
          <AddPersonForm />
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