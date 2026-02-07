import { ApplicationStatus } from "@dvld/shared/src/types/application";
import { License } from "../entities/License";
import { LicenseClass } from "../entities/LicenseClass";
import { ApplicationRepo } from "../repositories/ApplicationRepo";
import { AppError } from "../types/errors";

import { createOrGetDriver } from "./driverService";
import { IssueReason, ReplacementType } from "@dvld/shared/src/types/license";
import { UserRepo } from "../repositories/UserRepo";
import { newApplication } from "./applicationService";
import { getPersonByDriverId } from "./personService";
import { Not } from "typeorm";
import { isExpired } from "../utils/dateUtil";

export async function issueLicenseFirstTime(
    createdByUserId: number,
    personId: number,
    licenseClassId: number,
    localDrivingLicenseApplicationId?: number,
    notes?: string,
) {
    // TODO: Fix logic
    // create new driver checks if a user exists
    const driverId = await createOrGetDriver(createdByUserId, personId);

    // check if a previous active license with the same class exists
    const activeLicenseExists = await License.exists({
        where: {
            driver: { id: driverId },
            license_class: { id: licenseClassId },
            is_active: true
        }
    });
    if (activeLicenseExists)
        throw new AppError('Cannot issue a new license while having an active license of the same class', 400);

    // Find the local driving license application and link it with the new license
    const application = await ApplicationRepo.findOne({
        where: {
            id: localDrivingLicenseApplicationId,
            application_type: { system_name: 'LOCAL_LICENSE_SERVICE' }
        },
        relations: {
            application_type: true
        }
    }); 
    if (!application)
        throw new AppError('Application not found', 404);

    const licenseClass = await LicenseClass.findOneBy({ id: licenseClassId });
    if (!licenseClass)
        throw new AppError('License class not found', 404);
    
    application.last_status_date = new Date();
    application.application_status = ApplicationStatus.Completed;
    await ApplicationRepo.save(application);  // Update local driving license application

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

    const oldLicenseExpirationDate = new Date(oldLicense.expiration_date);
    const licenseExpired = isExpired(oldLicenseExpirationDate);

    if (!licenseExpired)
        throw new AppError('Cannot renew a license which has not expired yet', 400);
    
    // ======== End checks and start acting ========
    
    const person = await getPersonByDriverId(driverId);

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

export async function replaceLicense(
    createdByUserId: number,
    licenseId: number,
    replacementType: ReplacementType,
    notes?: string
) {
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
    
    if (!oldLicense.is_active)
        throw new AppError('Cannot replace an inactive license', 400);

    const oldLicenseExpirationDate = new Date(oldLicense.expiration_date);
    const licenseExpired = isExpired(oldLicenseExpirationDate);

    if (licenseExpired)
        throw new AppError('Cannot replace an expired license, renew it instead', 400);

    // ======== End checks and start acting ========

    const driverId = oldLicense.driver.id;
    const person = await getPersonByDriverId(driverId);

    let applicationId;

    if (replacementType === ReplacementType.Damaged) {
        applicationId = await newApplication(person.id, 'REPLACE_DAMAGED_SERVICE', createdByUserId);
    } else if (replacementType === ReplacementType.Lost) {
        applicationId = await newApplication(person.id, 'REPLACE_LOST_SERVICE', createdByUserId);
    } else {
        throw new AppError('Unexpected error', 500);
    }

    oldLicense.is_active = false;
    await License.save(oldLicense);  // Deactivate old license

    const issueDate = new Date();

    const newLicense = await License.create({
        paid_fees: oldLicense.license_class.class_fees,
        notes,
        driver: { id: driverId },
        application: { id: applicationId },
        issue_date: issueDate,
        expiration_date: oldLicense.expiration_date,
        user: { id: createdByUserId },
        license_class: oldLicense.license_class,
        is_active: true,
        issue_reason:
            replacementType === ReplacementType.Damaged
            ? IssueReason.ReplaceDamaged
            : IssueReason.ReplaceLost
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