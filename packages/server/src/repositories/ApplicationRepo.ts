import { AppDataSource } from "../dataSource";
import { Application } from "../entities/Application";

export const ApplicationRepo = AppDataSource.getRepository(Application).extend({
    getAllLocalDrivingLicenseApplications() {
        return ApplicationRepo.createQueryBuilder('application')
            .innerJoinAndSelect(
                'application.local_driving_license_application', 
                'ldla'
            ) // selecting local driving license application which is basically a join table (kind of)
            .innerJoinAndSelect('ldla.license_class', 'lclass')  // selecting license_class table
            .innerJoinAndSelect('application.person', 'person')  // selecting person
            .leftJoinAndSelect('person.driver', 'driver')
            .innerJoinAndSelect('application.created_by_user', 'user')  // selecting created_by_user
            .innerJoinAndSelect('application.application_type', 'type') // selecting application type
            .leftJoinAndSelect('application.license', 'license')
            .getMany();
    },

    getAllInternationalDrivingLicenseApplications() {
        return ApplicationRepo.createQueryBuilder('application')
        .innerJoinAndSelect('application.international_license', 'international_license')
        .innerJoinAndSelect('international_license.local_license', 'local_license')
        .innerJoinAndSelect('international_license.driver', 'driver')
            .getMany();
    }
});