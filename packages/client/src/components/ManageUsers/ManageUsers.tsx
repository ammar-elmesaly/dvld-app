import { useEffect, useState } from 'react';
import styles from './ManageUsers.module.css';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import Overlay from '../Overlay/Overlay';
import AddUserForm from '../Forms/AddUserForm/AddUserForm';
import ManageUsersTable from '../Tables/ManageUsersTable';

import { UserDTO } from '@dvld/shared/src/dtos/user.dto';
import { RowActionDef, ActiveRowAction, UserActionType } from '../../types/table';
import UserInfo from '../Info/UserInfo/UserInfo';
import { getAllUsers } from '../../api/user/user';
import DeleteUserForm from '../Delete/DeleteUserForm';
import EditUser from '../Edit/EditUser/EditUser';

export default function ManageUsers() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [addUserOpen, setAddUserOpen] = useState(false);

  const [ openMenuRow, setOpenMenuRow ] = useState<string | null>(null);
  // This sets which row action is active, which could be
  // View, Delete, Call, etc..
  const [ activeRowAction, setActiveRowAction ] = useState<ActiveRowAction<UserDTO, UserActionType>>(null);

  const [users, setUsers] = useState<UserDTO[]>([]);

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };
  useEffect(() => {
      getAllUsers().then(setUsers);
  }, [refreshKey]);

  const rowActions: RowActionDef<UserDTO, UserActionType>[] = [
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
    }
  ];


  let selectedAction: React.ReactNode = null;

  switch (activeRowAction?.type) {
    case UserActionType.View:
      selectedAction = (
        <UserInfo
          user={ activeRowAction.row }
        />
      );
      break;
    
    case UserActionType.NewUser:
      selectedAction = (
        <AddUserForm handleRefresh={handleRefresh} />
      );
      break;

    case UserActionType.Edit:
      selectedAction = (
        <EditUser user={activeRowAction.row} handleRefresh={handleRefresh} />
      );
      break;
    
    case UserActionType.Delete:
      selectedAction = (
        <DeleteUserForm user={activeRowAction.row} handleRefresh={handleRefresh} />
      );
      break;
  }

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
        <div className={styles.refreshAdd}>
          <Button 
            color='primary' 
            icon="arrow-clockwise" 
            onClick={handleRefresh} 
          />
          <Button color='success' iconLeft="person-fill-add" onClick={() => setAddUserOpen(true)}>Add a user</Button>
        </div>
        <Overlay open={addUserOpen} onClose={() => setAddUserOpen(false)}>
          <AddUserForm handleRefresh={handleRefresh} />
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