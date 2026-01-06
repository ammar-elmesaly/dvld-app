import { useState } from 'react';
import styles from './ManagePeople.module.css';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import Overlay from '../Overlay/Overlay';
import AddPersonForm from '../AddPersonForm/AddPersonForm';
import ManagePeopleTable from '../Tables/ManagePeopleTable';
import { Person } from '../../types/person';

import { RowActionDef, ActiveRowAction, PeopleActionType } from '../../types/table';
import { ViewPerson } from '../ViewPerson/ViewPerson';

const data: Person[] = [
  {
    name: 'عمار علي عبدالحميد المصلي',
    age: 21,
    gender: 'male',
    salary: 4200,
    isActive: true,
    id: 2
  },
  {
    name: 'علي عبدالجليل أحمد حبيش',
    age: 21,
    gender: 'male',
    salary: 4200,
    isActive: true,
    id: 5
  },
  {
    name: 'Ammar',
    age: 21,
    gender: 'male',
    salary: 4200,
    isActive: true,
    id: 7
  },

  {
    name: 'Ahmed',
    age: 23,
    gender: 'male',
    salary: 2000,
    isActive: false,
    id: 8
  },

  {
    name: 'Salma',
    age: 40,
    gender: 'female',
    salary: 2300,
    isActive: true,
    id: 9
  },

  {
    name: 'Salma',
    age: 40,
    gender: 'female',
    salary: 2300,
    isActive: true,
    id: 10
  },

  {
    name: 'Salma',
    age: 40,
    gender: 'female',
    salary: 2300,
    isActive: true,
    id: 11
  },

  {
    name: 'Salma',
    age: 40,
    gender: 'female',
    salary: 2300,
    isActive: true,
    id: 12
  }
]

export default function People() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [addPersonOpen, setAddPersonOpen] = useState(false);

  const [ openMenuRow, setOpenMenuRow ] = useState(null);
  // This sets which row action is active, which could be
  // View, Delete, Call, etc..
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<Person, PeopleActionType>>(null);

  const rowActions: RowActionDef<Person, PeopleActionType>[] = [
    {
      type: PeopleActionType.View,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.View })
    },

    {
      type: PeopleActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: PeopleActionType.Edit })
    }
  ];

  let overlay: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case PeopleActionType.View:
      overlay = (
        <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          <ViewPerson
            person={ activeRowAction.row }
          />
        </Overlay>
      );
      break;

    case PeopleActionType.Edit:
      overlay = (
        <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          <AddPersonForm />
        </Overlay>
      );
      break;
  }

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-people-fill'></i> Manage People</h1>
      </div>
      <div className={styles.controls}>
        <Filter
          options={Object.keys(data[0] ?? {})}
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
          overlay
        }
      </div>
      <ManagePeopleTable
        data={data}
        filterBy={filterBy}
        filterValue={filterValue}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}