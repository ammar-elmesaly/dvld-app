import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from '../Table/Table.js';
import { RowActionDef } from '../../types/table.js';
import { UserDTO } from '@dvld/shared';

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  users: UserDTO[];
  filterBy?: string;
  filterValue?: string;
  openMenuRow: string | null;
  setOpenMenuRow: Dispatch<SetStateAction<string | null>>;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ManageUsersTable<RowType, RowActionType>({
  users,
  filterBy = '',
  filterValue = '',
  openMenuRow,
  setOpenMenuRow,
  rowActions,
  ...rest
}: TableProps<RowType, RowActionType>
) {
  return (
    <Table
    data={users as unknown as Record<string, unknown>[]}
    filterBy={filterBy}
    filterValue={filterValue}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    {...rest}
    />
  );
}