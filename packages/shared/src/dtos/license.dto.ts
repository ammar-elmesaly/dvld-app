export interface LicenseDTO {
    id: number;
    is_active: boolean;
    driver_id: number;
    expiration_date: Date;
    issue_date: Date;
    issue_reason: string;
    notes?: string;
    is_detained: boolean;
    license_class_name: string;
}