export interface InternationalDrivingLicenseApplicationDTO {
    application_id: number;
    local_license_id: number;
    international_id: number;
    driver_id: number;
    issue_date: string;
    expiration_date: string;
    is_active: boolean;
}