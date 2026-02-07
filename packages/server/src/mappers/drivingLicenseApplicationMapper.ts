import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import { Application } from '../entities/Application';
import { InternationalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/internationalDrivingLicenseApplication.dto';

export const toLocalDrivingLicenseApplicationDTO = (application: Application, retakeTestFees: number | undefined): LocalDrivingLicenseApplicationDTO => {
    return {
        application_id: application.id,
        applicant_person_id: application.person.id,
        local_driving_license_application_id: application.local_driving_license_application.id,
        national_id: application.person.national_id,
        full_name: application.person.full_name,

        application_date: application.application_date.toDateString(),
        application_fees: application.application_type.type_fees,

        passed_tests: application.local_driving_license_application.passed_tests, 
        paid_fees: application.paid_fees,
        retake_test_fees: retakeTestFees || 0,
        
        driver_id: application.person.driver?.id,
        
        application_type_name: application.application_type.type_name,
        created_by_user_name: application.created_by_user.username,

        status: application.application_status,

        license_class_name: application.local_driving_license_application.license_class.class_name,
        license_class_id: application.local_driving_license_application.license_class.id,
        license_id: application.license?.id
    };
};

export const toInternationalDrivingLicenseApplicationDTO = (application: Application): InternationalDrivingLicenseApplicationDTO => {
    const local_license = application.international_license.local_license;
    
    return {
        application_id: application.id,
        local_license_id: local_license.id,
        international_id: application.international_license.id,
        driver_id: application.international_license.driver.id,
        is_active: application.international_license.is_active,
        issue_date: new Date(application.international_license.issue_date).toLocaleDateString(),
        expiration_date: new Date(application.international_license.expiration_date).toLocaleDateString()
    };
}