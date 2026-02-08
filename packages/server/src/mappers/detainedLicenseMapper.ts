import { DetainedLicense } from "../entities/DetainedLicense";
import { DetainedLicenseDTO } from "@dvld/shared/src/dtos/detainedLicense.dto";

export const toDetainedLicenseDTO = (detainedLicense: DetainedLicense): DetainedLicenseDTO => {
    return {
        detain_id: detainedLicense.id,
        license_id: detainedLicense.license.id,
        driver_id: detainedLicense.license.driver.id,
        detain_date: new Date(detainedLicense.detain_date).toDateString(),
        release_date: detainedLicense.release_date ? new Date(detainedLicense.release_date).toDateString() : undefined,
        fine_fees: detainedLicense.fine_fees,
        release_application_id: detainedLicense.release_application?.id
    };
};
