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
    return ApplicationRepo.getAllLocalDrivingLicenseApplications();
}

export function getAllInternationalDrivingLicenseApplications() {
    return ApplicationRepo.getAllInternationalDrivingLicenseApplications();
}

export async function newApplication(personId: number, applicationTypeSystemName: string, createdByUserId: number) {
    // TODO: Add entity transaction manager as a parameter
    const [person, applicationType, createdByUser] = await Promise.all([
        PersonRepo.findOneBy({ id: personId }),
        ApplicationType.findOneBy({ system_name: applicationTypeSystemName }),
        UserRepo.findOneBy({ id: createdByUserId })
    ]);

    if (!person) throw new AppError('Person not found', 404);
    if (!applicationType) throw new AppError('Application Type not found', 404);
    if (!createdByUser) throw new AppError('User not found', 404);  

    const initialStatus =
    applicationType.system_name === 'LOCAL_LICENSE_SERVICE'
    ? ApplicationStatus.New
    : ApplicationStatus.Completed;

    const newApplication = await ApplicationRepo.create({
        person,
        application_type: applicationType,
        created_by_user: createdByUser,
        last_status_date: new Date(),
        application_status: initialStatus,
        paid_fees: applicationType.type_fees
    }).save();

    return newApplication.id;
}

export async function newLocalDrivingLicenseApp(licenseClassId: number, personId: number, createdByUserId: number) {
    const [appExists, licenseClass] = await Promise.all([
        ApplicationRepo.exists({
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
        }),
        LicenseClass.findOneBy({ id: licenseClassId })
    ]);

    if (appExists) throw new AppError("You can't have more than one license application within the same class.", 400);
    if (!licenseClass) throw new AppError('License Class not found', 404);

    return await ApplicationRepo.manager.transaction(async (transactionalEntityManager) => {
        const applicationId = await newApplication(personId, 'LOCAL_LICENSE_SERVICE', createdByUserId);
        
        const newLdlApp = transactionalEntityManager.create(LocalDrivingLicenseApplication, {
            application: { id: applicationId },
            license_class: licenseClass
        });

        const saved = await transactionalEntityManager.save(newLdlApp);
        return saved.id;
    });
}