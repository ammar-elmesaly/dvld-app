import { TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  licenses: LicenseDTO[];
}

export default function ManageLocalLicensesTable({
  licenses,
  ...rest
}: TableProps
) {
  return (
    <Table
    data={licenses as unknown as Record<string, unknown>[]}
    ignoreColumns={['notes']}
    {...rest}
    />
  );
}