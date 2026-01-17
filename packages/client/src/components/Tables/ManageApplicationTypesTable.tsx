import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { RowActionDef } from "../../types/table";
import { ApplicationTypeDTO } from '@dvld/shared/src/dtos/applicationType.dto';

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  applicationTypes: ApplicationTypeDTO[];
  filterBy?: string;
  filterValue?: string;
  openMenuRow: string | null;
  setOpenMenuRow: Dispatch<SetStateAction<string | null>>;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ManageApplicationTypesTable<RowType, RowActionType>({
  applicationTypes,
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
    data={applicationTypes as unknown as Record<string, unknown>[]}
    filterBy={filterBy}
    filterValue={filterValue}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    {...rest}
    />
  );
}