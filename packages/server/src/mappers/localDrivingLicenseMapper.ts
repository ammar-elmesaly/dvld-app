import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import { Application } from '../entities/Application';

export const toLocalDrivingLicenseApplicationDTO = (application: Application, retakeTestFees: number | undefined): LocalDrivingLicenseApplicationDTO => {
    const { first_name, second_name, third_name, last_name } = application.person;
    
    const personFullName = `${first_name} ${second_name} ${third_name} ${last_name}`;

    return {
        application_id: application.id,
        local_driving_license_application_id: application.local_driving_license_application.id,
        national_id: application.person.national_id,
        full_name: personFullName,

        application_date: application.application_date.toDateString(),
        application_fees: application.application_type.type_fees,

        passed_tests: application.local_driving_license_application.passed_tests, 
        paid_fees: application.paid_fees,
        retake_test_fees: retakeTestFees || 0,
        
        application_type_name: application.application_type.type_name,
        created_by_user_name: application.created_by_user.username,

        status: application.application_status,
        license_class_name: application.local_driving_license_application.license_class.class_name,
    };
};
