import { LocalDrivingLicenseApplicationDTO } from '@dvld/shared/src/dtos/localDrivingLicenseApplication.dto';
import { Application } from '../entities/Application';

export const toLocalDrivingLicenseApplicationDTO = (application: Application): LocalDrivingLicenseApplicationDTO => {
    const { first_name, second_name, third_name, last_name } = application.person;
    
    const personFullName = `${first_name} ${second_name} ${third_name} ${last_name}`;

    return {
        application_id: application.id,
        local_driving_license_application_id: application.local_driving_license_application.id,
        national_id: application.person.national_id,
        full_name: personFullName,
        application_date: application.application_date.toDateString(),
        passed_tests: 0,  // TODO
        status: application.application_status,
        license_class_name: application.local_driving_license_application.license_class.class_name,
    };
};
