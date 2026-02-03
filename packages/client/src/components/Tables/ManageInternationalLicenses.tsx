import { TableHTMLAttributes } from "react";
import Table from "../Table/Table";
import { InternationalLicenseDTO } from "@dvld/shared/src/dtos/internationalLicense.dto";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  internationalLicenses: InternationalLicenseDTO[];
}

export default function ManageInternationalLicensesTable({
  internationalLicenses,
  ...rest
}: TableProps
) {
  return (
    <Table
    data={internationalLicenses as unknown as Record<string, unknown>[]}
    ignoreColumns={['notes']}
    {...rest}
    />
  );
}