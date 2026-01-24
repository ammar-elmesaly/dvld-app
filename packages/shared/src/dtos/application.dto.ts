import { ApplicationStatus } from '../types/application';

export interface ApplicationDTO {
    application_id: number;
    national_id: string;
    full_name: string;
    application_date: string;
    passed_tests: number;
    status: ApplicationStatus;
}