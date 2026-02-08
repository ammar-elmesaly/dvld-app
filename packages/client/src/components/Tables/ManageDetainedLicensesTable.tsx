import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { RowActionDef } from "../../types/table";
import { DetainedLicenseDTO } from "@dvld/shared/src/dtos/detainedLicense.dto";

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  licenses: DetainedLicenseDTO[];
  filterBy?: string;
  filterValue?: string;
  openMenuRow: string | null;
  setOpenMenuRow: Dispatch<SetStateAction<string | null>>;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ManageDetainedLicensesTable<RowType, RowActionType>({
  licenses,
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
    data={licenses as unknown as Record<string, unknown>[]}
    filterBy={filterBy}
    filterValue={filterValue}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    ignoreColumns={["notes"]}
    {...rest}
    />
  );
}
