import { InternationalLicense } from "../entities/InternationalLicense";
import { newApplication } from "./applicationService";
import { getApplicationTypeByName } from "./applicationTypeService";
import { getPersonByDriverId } from "./personService";
import { getLicenseById } from "./licenseService";
import { AppError } from "../types/errors";

export async function issueLicense(
    createdByUserId: number,
    licenseId: number,
    notes?: string,
) {
    const license = await getLicenseById(licenseId);

    if (license.license_class.system_name !== 'CLASS_3')
        throw new AppError('License class must be ordinary driving license in order to issue international license', 400);

    const driver = license.driver;
    const person = await getPersonByDriverId(driver.id);

    const internationalLicenseApplicationId = await newApplication(person.id, 'INTERNATIONAL_LICENSE_SERVICE', createdByUserId);

    const applicationType = await getApplicationTypeByName('INTERNATIONAL_LICENSE_SERVICE');

    const issueDate = new Date();
    const expirationDate = new Date(issueDate);
    expirationDate.setFullYear(
        expirationDate.getFullYear() + 1 // 1 year, TODO
    );

    const newLicense = await InternationalLicense.create({
        paid_fees: applicationType.type_fees,
        notes,
        driver,
        application: { id: internationalLicenseApplicationId },
        issue_date: issueDate,
        expiration_date: expirationDate,
        user: { id: createdByUserId },
        local_license: license,
        is_active: true, // TODO
    }).save();

    return newLicense.id;
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