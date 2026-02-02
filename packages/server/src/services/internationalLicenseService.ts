import { InternationalLicense } from "../entities/InternationalLicense";
import { newApplication } from "./applicationService";
import { getApplicationTypeByName } from "./applicationTypeService";
import { getPersonWithDriverById } from "./personService";
import { AppError } from "../types/errors";

export async function issueLicense(
    createdByUserId: number,
    personId: number,
    notes?: string,
) {
    const person = await getPersonWithDriverById(personId);
    if (!person)
        throw new AppError('Person not found', 404);

    const driver = person.driver;
    if (!driver)
        throw new AppError('Driver not found', 404);

    const internationalLicenseApplicationId = await newApplication(personId, 'INTERNATIONAL_LICENSE_SERVICE', createdByUserId);

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
        is_active: true, // TODO
    }).save();

    return newLicense.id;
}

export function getLicenseById(intLicenseId: number) {
    return InternationalLicense.findOne({
        where: {
            id: intLicenseId
        },
        relations: {
            driver: true
        }
    });
}

export function getLicenseWithPersonById(intLicenseId: number) {
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