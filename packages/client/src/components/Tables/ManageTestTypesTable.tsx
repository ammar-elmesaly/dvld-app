import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { RowActionDef } from "../../types/table";
import { TestTypeDTO } from '@dvld/shared/src/dtos/testType.dto';

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  testTypes: TestTypeDTO[];
  filterBy?: string;
  filterValue?: string;
  openMenuRow: string | null;
  setOpenMenuRow: Dispatch<SetStateAction<string | null>>;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ManageTestTypesTable<RowType, RowActionType>({
  testTypes,
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
    data={testTypes as unknown as Record<string, unknown>[]}
    filterBy={filterBy}
    filterValue={filterValue}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    {...rest}
    />
  );
}