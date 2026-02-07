import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { RowActionDef } from "../../types/table";
import { DriverDTO } from "@dvld/shared/src/dtos/driver.dto";

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  drivers: DriverDTO[];
  filterBy?: string;
  filterValue?: string;
  openMenuRow: string | null;
  setOpenMenuRow: Dispatch<SetStateAction<string | null>>;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ManageDriversTable<RowType, RowActionType>({
  drivers,
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
    data={drivers as unknown as Record<string, unknown>[]}
    filterBy={filterBy}
    filterValue={filterValue}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    ignoreColumns={[]}
    {...rest}
    />
  );
}
