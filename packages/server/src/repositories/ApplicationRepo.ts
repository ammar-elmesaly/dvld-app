import { AppDataSource } from "../dataSource";
import { Application } from "../entities/Application";

export const ApplicationRepo = AppDataSource.getRepository(Application).extend({
    getAllLocalDrivingLicenseApplication() {
        return ApplicationRepo.createQueryBuilder('application')
            .innerJoinAndSelect(
                'application.local_driving_license_application', 
                'ldla'
            )
            .innerJoinAndSelect('ldla.license_class', 'lclass')
            .innerJoinAndSelect('application.person', 'person')
            .getMany();
    }
});