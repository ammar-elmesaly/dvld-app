import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { RowActionDef } from "../../types/table";
import { TestAppointmentDTO } from '@dvld/shared/src/dtos/testAppointment.dto';

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  testAppointments: TestAppointmentDTO[];
  openMenuRow: string | null;
  setOpenMenuRow: Dispatch<SetStateAction<string | null>>;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ManageTestAppointmentsTable<RowType, RowActionType>({
  testAppointments,
  openMenuRow,
  setOpenMenuRow,
  rowActions,
  ...rest
}: TableProps<RowType, RowActionType>
) {
  return (
    <Table
    data={testAppointments as unknown as Record<string, unknown>[]}
    rowActions={rowActions}
    openMenuRow={openMenuRow}
    setOpenMenuRow={setOpenMenuRow}
    compact={true}
    {...rest}
    />
  );
}