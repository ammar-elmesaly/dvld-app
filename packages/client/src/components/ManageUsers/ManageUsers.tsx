import { useEffect, useState } from 'react';
import styles from './ManageUsers.module.css';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import Overlay from '../Overlay/Overlay';
import AddUserForm from '../AddUserForm/AddUserForm';
import ManageUsersTable from '../Tables/ManageUsersTable';

import { RowActionDef, ActiveRowAction, UserActionType } from '../../types/table';
import ViewUser from '../ViewUser/ViewUser';
import { getAllUsers } from '../../api/user/user';

export default function ManageUsers() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [addUserOpen, setAddUserOpen] = useState(false);

  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);
  // This sets which row action is active, which could be
  // View, Delete, Call, etc..
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<Person, UserActionType>>(null);

  const rowActions: RowActionDef<Person, UserActionType>[] = [
    {
      type: UserActionType.View,
      handler: (row) => setActiveRowAction({ row, type: UserActionType.View })
    },

    {
      type: UserActionType.NewUser,
      handler: (row) => setActiveRowAction({ row, type: UserActionType.NewUser })
    },

    {
      type: UserActionType.Edit,
      handler: (row) => setActiveRowAction({ row, type: UserActionType.Edit })
    },


    {
      type: UserActionType.Delete,
      handler: (row) => setActiveRowAction({ row, type: UserActionType.Delete })
    },

    {
      type: UserActionType.Email,
      handler: (row) => setActiveRowAction({ row, type: UserActionType.Email })
    },

    {
      type: UserActionType.Call,
      handler: (row) => setActiveRowAction({ row, type: UserActionType.Call })
    },
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case UserActionType.View:
      selectedAction = (
        <ViewUser
          user={ activeRowAction.row }
        />
      );
      break;
    
    case UserActionType.NewUser:
      selectedAction = (
        <AddUserForm />
      );
      break;

    case UserActionType.Edit:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
    
    case UserActionType.Delete:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
    
    case UserActionType.Email:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;

    case UserActionType.Call:
      selectedAction = (
        <h1 className='stub'>STUB!</h1>
      );
      break;
  }

  const [users, setUsers] = useState<Person[]>([]);

  useEffect(() => {
      getAllUsers().then(setUsers);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h1 className={styles.h1}><i className='bi bi-people-fill'></i> Manage Users</h1>
      </div>
      <div className={styles.controls}>
        <Filter
          options={Object.keys(users[0] ?? {})}
          filterBy={filterBy}
          filterValue={filterValue}
          setFilterBy={setFilterBy}
          setFilterValue={setFilterValue}
        />
        <Button color='success' iconLeft="person-fill-add" onClick={() => setAddUserOpen(true)}>Add a user</Button>
        <Overlay open={addUserOpen} onClose={() => setAddUserOpen(false)}>
          <AddUserForm />
        </Overlay>

        { activeRowAction &&
        <Overlay open={activeRowAction !== null} onClose={() => setActiveRowAction(null)}>
          { selectedAction }
        </Overlay>
        }
      </div>
      <ManageUsersTable
        users={users}
        filterBy={filterBy}
        filterValue={filterValue}
        openMenuRow={openMenuRow}
        setOpenMenuRow={setOpenMenuRow}
        rowActions={rowActions}
      />
    </section>
  );
}