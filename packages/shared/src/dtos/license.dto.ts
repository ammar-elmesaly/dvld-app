import { IssueReason } from '../types/license.js';
import { LicenseClassSystemName } from './licenseClass.dto.js';

export interface LicenseDTO {
    id: number;
    is_active: boolean;
    driver_id: number;
    expiration_date: string;
    issue_date: string;
    issue_reason: IssueReason;
    notes?: string;
    is_detained: boolean;
    license_class_name: string;
    license_system_name: LicenseClassSystemName;
}