export interface DetainedLicenseDTO {
    detain_id: number;
    license_id: number;
    driver_id: number;
    detain_date: string;
    release_date?: string;
    fine_fees: number;
    release_application_id?: number;
}