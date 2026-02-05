import { ApplicationStatus } from "@dvld/shared/src/types/application";
import { License } from "../entities/License";
import { LicenseClass } from "../entities/LicenseClass";
import { ApplicationRepo } from "../repositories/ApplicationRepo";
import { AppError } from "../types/errors";

import { createNewDriver } from "./driverService";
import { IssueReason } from "@dvld/shared/src/types/license";
import { UserRepo } from "../repositories/UserRepo";
import { newApplication } from "./applicationService";
import { getPersonByDriverId } from "./personService";
import { Not } from "typeorm";

export async function issueLicenseFirstTime(
    createdByUserId: number,
    personId: number,
    licenseClassId: number,
    localDrivingLicenseApplicationId?: number,
    notes?: string,
) {
    // create new driver checks if a user exists
    const driverId = await createNewDriver(createdByUserId, personId);

    const application = await ApplicationRepo.findOne({
        where: {
            id: localDrivingLicenseApplicationId,
            application_type: { system_name: 'LOCAL_LICENSE_SERVICE' }
        },
        relations: {
            application_type: true
        }
    }); 
    // Find the local driving license application and link it with the new license
    if (!application)
        throw new AppError('Application not found', 404);

    application.last_status_date = new Date();
    application.application_status = ApplicationStatus.Completed;

    await ApplicationRepo.save(application);

    const licenseClass = await LicenseClass.findOneBy({ id: licenseClassId });
    if (!licenseClass)
        throw new AppError('License class not found', 404);

    const issueDate = new Date();
    const expirationDate = new Date(issueDate);
    expirationDate.setFullYear(
        expirationDate.getFullYear() + licenseClass.default_validity_length
    );

    const newLicense = await License.create({
        paid_fees: licenseClass.class_fees,
        notes,
        driver: { id: driverId },
        application,
        issue_date: issueDate,
        expiration_date: expirationDate,
        user: { id: createdByUserId },
        license_class: licenseClass,
        is_active: true,
        issue_reason: IssueReason.FirstTime
    }).save();

    return newLicense.id;
}

export async function renewLicense(createdByUserId: number, licenseId: number, notes?: string) {
    const userExists = await UserRepo.existsBy({ id: createdByUserId });
    if (!userExists)
        throw new AppError('User not found', 404);

    const oldLicense = await License.findOne({
        where: {
            id: licenseId,
        },
        relations: {
            license_class: true,
            driver: true
        }
    });
    if (!oldLicense)
        throw new AppError('License not found.', 404);
    
    const driverId = oldLicense.driver.id;

    const activeLicenseExits = await License.exists({
        where: {
            id: Not(oldLicense.id),
            driver: { id: driverId },
            license_class: oldLicense.license_class,
            is_active: true
        }
    });
    if (activeLicenseExits)
        throw new AppError('Cannot renew a license while having an active license of the same class', 400);

    const person = await getPersonByDriverId(driverId);
    if (!person)
        throw new AppError('Person not found', 404);

    const today = new Date();
    const oldLicenseExpirationDate = new Date(oldLicense.expiration_date);

    if (today < oldLicenseExpirationDate)
        throw new AppError('Cannot renew a license which has not expired yet', 400);

    // ======== End checks and start acting ========

    oldLicense.is_active = false;
    await License.save(oldLicense);  // Deactivate old license

    const applicationId = await newApplication(person.id, 'RENEW_LICENSE_SERVICE', createdByUserId);

    const issueDate = new Date();
    const expirationDate = new Date(issueDate);
    expirationDate.setFullYear(
        expirationDate.getFullYear() + oldLicense.license_class.default_validity_length
    );

    const newLicense = await License.create({
        paid_fees: oldLicense.license_class.class_fees,
        notes,
        driver: { id: driverId },
        application: { id: applicationId },
        issue_date: issueDate,
        expiration_date: expirationDate,
        user: { id: createdByUserId },
        license_class: oldLicense.license_class,
        is_active: true,
        issue_reason: IssueReason.Renew
    }).save();

    return newLicense.id;
}

export async function getLicenseById(licenseId: number) {
    const license = await License.findOne({
        where: {
            id: licenseId
        },
        relations: {
            driver: true,
            license_class: true
        }
    });

    if (!license)
        throw new AppError('License not found', 404);

    return license;
}

export async function getAllLicensesByDriverId(driverId: number) {
    return License.find({
        where: {
            driver: { id: driverId }
        },
        relations: {
            driver: true,
            license_class: true
        }
    });
}

export function getLicenseWithPersonById(licenseId: number) {
    return License.findOne({
        where: {
            id: licenseId
        },
        relations: {
            driver: {
                person: {
                    national_country: true
                }
            },
            license_class: true
        }
    });
}