import { InternationalLicense } from "../entities/InternationalLicense";
import { newApplication } from "./applicationService";
import { getApplicationTypeByName } from "./applicationTypeService";
import { AppError } from "../types/errors";
import { isExpired } from "../utils/dateUtil";
import { UserRepo } from "../repositories/UserRepo";
import { LicenseRepo } from "../repositories/LicenseRepo";

export async function issueLicense(
    createdByUserId: number,
    licenseId: number,
    notes?: string,
) {

    const [license, createdByUser] = await Promise.all([
        LicenseRepo.findOne({
            where: { id: licenseId },
            relations: {
                driver: { person: true },
                license_class: true
            }
        }),
        UserRepo.findOneBy({ id: createdByUserId }),
    ]);

    if (!license) throw new AppError('License not found', 404);
    if (!createdByUser) throw new AppError('User not found', 404);

    if (license.license_class.system_name !== 'CLASS_3')
        throw new AppError('License class must be ordinary driving license in order to issue international license', 400);

    if (isExpired(license.expiration_date))
        throw new AppError('Cannot issue an international license for an expired local license', 400);

    if (!license.is_active)
        throw new AppError('Cannot issue an international license for an inactive local license', 400);

    const applicationType = await getApplicationTypeByName('INTERNATIONAL_LICENSE_SERVICE');
    
    const issueDate = new Date();
    const expirationDate = new Date(issueDate);

    expirationDate.setFullYear(
        expirationDate.getFullYear() + applicationType.default_validity_length // 1 year (until now)
    );

    return LicenseRepo.manager.transaction(async (manager) => {
        const activeIntLicenseExists = await manager.existsBy(InternationalLicense, {
            driver: license.driver,
            is_active: true
        });
        if (activeIntLicenseExists)
            throw new AppError('Cannot have more than one active international license for the same driver', 400);
    
        const internationalLicenseApplicationId = await newApplication(license.driver.person.id, 'INTERNATIONAL_LICENSE_SERVICE', createdByUserId);
    
        const newLicense = manager.create(InternationalLicense, {
            paid_fees: applicationType.type_fees,
            notes,
            driver: license.driver,
            application: { id: internationalLicenseApplicationId },
            issue_date: issueDate,
            expiration_date: expirationDate,
            user: createdByUser,
            local_license: license,
            is_active: true,
        });

        const newLicenseSaved = await manager.save(newLicense);
        return newLicenseSaved.id;
    });
}

export function getInternationalLicenseById(intLicenseId: number) {
    return InternationalLicense.findOne({
        where: {
            id: intLicenseId
        },
        relations: {
            driver: true
        }
    });
}

export function getInternationalLicenseWithPersonById(intLicenseId: number) {
    return InternationalLicense.findOne({
        where: {
            id: intLicenseId
        },
        relations: {
            driver: {
                person: {
                    national_country: true
                }
            }
        }
    });
}

export function getAllInternationalLicensesWithDriverId(driverId: number) {
    return InternationalLicense.find({
        where: {
            driver: { id: driverId }
        },
        relations: {
            driver: true
        }
    })
}