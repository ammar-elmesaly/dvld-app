import { ApplicationDTO } from "./application.dto";

export interface LocalDrivingLicenseApplicationDTO extends ApplicationDTO {
    local_driving_license_application_id: number;
    license_class_name: string;
    license_class_id: number;
    driver_id?: number;
}