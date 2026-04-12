import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from '../Table/Table.js';
import { InternationalLicenseDTO } from '@dvld/shared';
import { RowActionDef } from '../../types/table.js';

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  internationalLicenses: InternationalLicenseDTO[];
  openMenuRow?: string | null;
  setOpenMenuRow?: Dispatch<SetStateAction<string | null>>;
  rowActions?: RowActionDef<RowType, RowActionType>[];
}

export default function ManageInternationalLicensesTable<RowType, RowActionType>({
  internationalLicenses,
  openMenuRow,
  setOpenMenuRow,
  rowActions,
  ...rest
}: TableProps<RowType, RowActionType>
) {
  return (
    <Table
    data={internationalLicenses as unknown as Record<string, unknown>[]}
    ignoreColumns={['notes']}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    {...rest}
    />
  );
}