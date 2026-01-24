import { ApplicationRepo } from "../repositories/ApplicationRepo";
import { LicenseClass  } from "../entities/LicenseClass";
import { LocalDrivingLicenseApplication } from "../entities/LocalDrivingLicenseApplication";
import { AppError } from "../types/errors";
import { PersonRepo } from "../repositories/PersonRepo";
import { ApplicationType } from "../entities/ApplicationType";
import { UserRepo } from "../repositories/UserRepo";
import { ApplicationStatus } from "@dvld/shared/src/types/application";
import { Not } from "typeorm";

export function getAllApplications() {
    return ApplicationRepo.find();
}

export function getAllLocalDrivingLicenseApplications() {
    return ApplicationRepo.getAllLocalDrivingLicenseApplication();
}

export async function newApplication(personId: number, applicationTypeId: number, createdByUserId: number) {
    const person = await PersonRepo.findOneBy({ id: personId });
    if (!person)
        throw new AppError('Person not found', 404);

    const applicationType = await ApplicationType.findOneBy({ id: applicationTypeId });
    if (!applicationType)
        throw new AppError('Application Type not found', 404);

    const createdByUser = await UserRepo.findOneBy({ id: createdByUserId });
    if (!createdByUser)
        throw new AppError('User not found', 404);

    const newApplication = ApplicationRepo.create({
        person,
        application_type: applicationType,
        created_by_user: createdByUser,
        last_status_date: new Date(),
        application_status: ApplicationStatus.New,
        paid_fees: 0
    });

    return newApplication.save();
}

export async function newLocalDrivingLicenseApp(licenseClassId: number, personId: number, createdByUserId: number) {
    const existingApp = await ApplicationRepo.findOne({
        where: {
            application_status: Not(ApplicationStatus.Cancelled),
            person: { id: personId },
            local_driving_license_application: {
                license_class: { id: licenseClassId }
            }
        },
        relations: {
            local_driving_license_application: true
        }
    });

    if (existingApp)
        throw new AppError("You can't have more than one license application within the same class.", 400);
    
    // local driving license application type id is 1 in the application_type table
    const LOCAL_LICENSE_APPLICATION_ID = 1;

    const application = await newApplication(personId, LOCAL_LICENSE_APPLICATION_ID, createdByUserId);
    
    const licenseClass = await LicenseClass.findOneBy({ id: licenseClassId });
    if (!licenseClass)
        throw new AppError('License Class not found', 404);

    const newLocalDrivingLicenseApp = LocalDrivingLicenseApplication.create({
        application,
        license_class: licenseClass
    });

    return newLocalDrivingLicenseApp.save();
}