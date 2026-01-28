import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { RowActionDef } from "../../types/table";
import { ApplicationDTO } from '@dvld/shared/src/dtos/application.dto';

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  applications: ApplicationDTO[];
  filterBy?: string;
  filterValue?: string;
  openMenuRow: string | null;
  setOpenMenuRow: Dispatch<SetStateAction<string | null>>;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ManageApplicationsTable<RowType, RowActionType>({
  applications,
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
    ignoreColumns={['application_id', 'application_fees', 'paid_fees', 'retake_test_fees', 'created_by_user_name', 'application_type_name']}
    data={applications as unknown as Record<string, unknown>[]}
    filterBy={filterBy}
    filterValue={filterValue}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    {...rest}
    />
  );
}