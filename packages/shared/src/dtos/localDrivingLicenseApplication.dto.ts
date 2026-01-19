import { ApplicationDTO } from "./application.dto";
import { LicenseClassDTO } from "./licenseClass.dto";

export interface LocalDrivingLicenseApplicationDTO {
    id: number;
    application: ApplicationDTO;
    license_class: LicenseClassDTO;
}