import { ApplicationStatus } from '../types/application';

export interface ApplicationDTO {
    application_id: number;
    applicant_person_id: number;
    national_id: string;
    full_name: string;
    created_by_user_name: string;
    application_fees: number;

    application_date: string;
    application_type_name: string;
    
    passed_tests: number;
    paid_fees: number;
    retake_test_fees: number;
    
    status: ApplicationStatus;
    license_id?: number;
}