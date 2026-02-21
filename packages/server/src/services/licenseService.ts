import { ApplicationStatus } from "@dvld/shared/src/types/application";
import { License } from "../entities/License";
import { AppError } from "../types/errors";

import { createOrGetDriver } from "./driverService";
import { IssueReason, ReplacementType } from "@dvld/shared/src/types/license";
import { UserRepo } from "../repositories/UserRepo";
import { newApplication } from "./applicationService";
import { getPersonByDriverId } from "./personService";
import { Not } from "typeorm";
import { isExpired } from "../utils/dateUtil";
import { LocalDrivingLicenseApplication } from "../entities/LocalDrivingLicenseApplication";
import { ApplicationRepo } from "../repositories/ApplicationRepo";
import { TestType } from "../entities/TestType";
import { LicenseRepo } from "../repositories/LicenseRepo";

export async function issueLicenseFirstTime(
    createdByUserId: number,
    localDrivingLicenseApplicationId: number,
    notes?: string,
) {
    // Find the local driving license application and link it with the new license
    const ldla = await LocalDrivingLicenseApplication.findOne({
        where: {
            id: localDrivingLicenseApplicationId,
        },
        relations: {
            application: { 
                application_type: true,
                person: true
            },
            license_class: true
        }
    }); 
    if (!ldla)
        throw new AppError('Application not found', 404);

    const testTypesCount = await TestType.count();

    if (ldla.passed_tests !== testTypesCount)
        throw new AppError('You have to pass all tests before issuing a license', 404);

    // create new driver checks if a user exists
    const driverId = await createOrGetDriver(createdByUserId, ldla.application.person.id);

    return ApplicationRepo.manager.transaction(async (manager) => {
        // Check if a previous active license with the same class exists
        const activeLicenseExists = await manager.exists(License, {
            where: {
                driver: { id: driverId },
                license_class: { id: ldla.license_class.id },
                is_active: true
            }
        });
        if (activeLicenseExists)
            throw new AppError('Cannot issue a new license while having an active license of the same class', 400);

        // Update the application status to completed
        ldla.application.last_status_date = new Date();
        ldla.application.application_status = ApplicationStatus.Completed;
        await manager.save(ldla.application);  // Update local driving license application

        const licenseClass = ldla.license_class;

        const issueDate = new Date();
        const expirationDate = new Date(issueDate);
        expirationDate.setFullYear(
            expirationDate.getFullYear() + licenseClass.default_validity_length
        );

        const newLicense = manager.create(License, {
            paid_fees: licenseClass.class_fees,
            notes,
            driver: { id: driverId },
            application: ldla.application,
            issue_date: issueDate,
            expiration_date: expirationDate,
            user: { id: createdByUserId },
            license_class: licenseClass,
            is_active: true,
            issue_reason: IssueReason.FirstTime
        });

        const savedLicense = await manager.save(newLicense);

        return savedLicense.id; 
    });
}

export async function renewLicense(createdByUserId: number, licenseId: number, notes?: string) {
    const [userExists, oldLicense] = await Promise.all([
        UserRepo.existsBy({ id: createdByUserId }),
        License.findOne({
            where: {
                id: licenseId,
            },
            relations: {
                license_class: true,
                driver: true
            }
        })
    ]);

    if (!userExists) throw new AppError('User not found', 404);
    if (!oldLicense) throw new AppError('License not found.', 404);
    
    const driverId = oldLicense.driver.id;

    if (!isExpired(oldLicense.expiration_date))
        throw new AppError('Cannot renew a license which has not expired yet', 400);

    return await LicenseRepo.manager.transaction(async (manager) => {
        const activeExists = await manager.exists(License, {
            where: {
                id: Not(oldLicense.id),
                driver: { id: driverId }, 
                license_class: { id: oldLicense.license_class.id },
                is_active: true
            }
        });
        if (activeExists) throw new AppError('Active license already exists', 400);

        // Deactivate old license
        oldLicense.is_active = false;
        await manager.save(oldLicense);

        // Create new Renew License Application
        const person = await getPersonByDriverId(driverId);
        const applicationId = await newApplication(person.id, 'RENEW_LICENSE_SERVICE', createdByUserId, manager);

        // Create New License
        const issueDate = new Date();
        const expirationDate = new Date();
        expirationDate.setFullYear(issueDate.getFullYear() + oldLicense.license_class.default_validity_length);

        const newLicense = manager.create(License, {
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
        });

        const saved = await manager.save(newLicense);
        return saved.id;
    });
}

export async function replaceLicense(
    createdByUserId: number,
    licenseId: number,
    replacementType: ReplacementType,
    notes?: string
) {

    const [userExists, oldLicense] = await Promise.all([
        UserRepo.existsBy({ id: createdByUserId }),
        License.findOne({
            where: {
                id: licenseId,
            },
            relations: {
                license_class: true,
                driver: true
            }
        })
    ]);

    if (!userExists) throw new AppError('User not found', 404);
    if (!oldLicense) throw new AppError('License not found.', 404);
    if (!oldLicense.is_active) throw new AppError('Cannot replace an inactive license', 400);

    if (isExpired(oldLicense.expiration_date))
        throw new AppError('Cannot replace an expired license, renew it instead', 400);

    const driverId = oldLicense.driver.id;

    return LicenseRepo.manager.transaction(async (manager) => {
        const person = await getPersonByDriverId(driverId);

        const appTypeMap = {
            [ReplacementType.Damaged]: 'REPLACE_DAMAGED_SERVICE',
            [ReplacementType.Lost]: 'REPLACE_LOST_SERVICE'
        };

        const appTypeName = appTypeMap[replacementType];
        if (!appTypeName) throw new AppError('Unexpected error', 500);

        const applicationId = await newApplication(person.id, appTypeName, createdByUserId, manager);

        oldLicense.is_active = false;
        await manager.save(oldLicense);  // Deactivate old license

        const issueDate = new Date();

        const newLicense = manager.create(License, {
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
        });

        const newLicenseSaved = await manager.save(newLicense);

        return newLicenseSaved.id;
    });
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