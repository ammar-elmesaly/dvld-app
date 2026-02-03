import { ApplicationStatus } from "@dvld/shared/src/types/application";
import { License } from "../entities/License";
import { LicenseClass } from "../entities/LicenseClass";
import { ApplicationRepo } from "../repositories/ApplicationRepo";
import { AppError } from "../types/errors";

import { createNewDriver } from "./driverService";

export async function issueLicense(
    createdByUserId: number,
    personId: number,
    licenseClassId: number,
    applicationId: number,
    notes?: string,
) {
    const driverId = await createNewDriver(createdByUserId, personId);

    const application = await ApplicationRepo.findOneBy({ id: applicationId });
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
        is_active: true, // TODO
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