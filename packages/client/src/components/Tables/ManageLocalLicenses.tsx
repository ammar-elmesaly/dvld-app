import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";
import { RowActionDef } from "../../types/table";

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  licenses: LicenseDTO[];
  openMenuRow?: string | null;
  setOpenMenuRow?: Dispatch<SetStateAction<string | null>>;
  rowActions?: RowActionDef<RowType, RowActionType>[];
}

export default function ManageLocalLicensesTable<RowType, RowActionType>({
  licenses,
  openMenuRow,
  setOpenMenuRow,
  rowActions,
  ...rest
}: TableProps<RowType, RowActionType>
) {
  return (
    <Table
    data={licenses as unknown as Record<string, unknown>[]}
    ignoreColumns={['notes', 'license_system_name', 'issue_reason']}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    {...rest}
    />
  );
}