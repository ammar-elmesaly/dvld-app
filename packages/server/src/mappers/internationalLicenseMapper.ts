import { InternationalLicenseDTO } from "@dvld/shared/src/dtos/internationalLicense.dto";
import { InternationalLicensePersonDTO } from "@dvld/shared/src/dtos/internationalLicensePerson.dto";
import { InternationalLicense } from "../entities/InternationalLicense";

export function toInternationalLicenseDTO(license: InternationalLicense): InternationalLicenseDTO {
    return {
        id: license.id,
        driver_id: license.driver.id,
        is_active: license.is_active,
        expiration_date: new Date(license.expiration_date).toLocaleDateString(),
        issue_date: new Date(license.issue_date).toLocaleDateString(),
        notes: license.notes,
        is_detained: false, // TODO
        issue_reason: 'Test', // TODO
    }
}

export function toInternationalLicenseWithPersonDTO(license: InternationalLicense): InternationalLicensePersonDTO {
    return {
        international_license: {
            id: license.id,
            driver_id: license.driver.id,
            is_active: license.is_active,
            expiration_date: new Date(license.expiration_date).toLocaleDateString(),
            issue_date: new Date(license.issue_date).toLocaleDateString(),
            notes: license.notes,
            is_detained: false, // TODO
            issue_reason: 'Test', // TODO
        },

        person: {
            id: license.driver.person.id,

            first_name: license.driver.person.first_name,
            second_name: license.driver.person.second_name,
            third_name: license.driver.person.third_name,
            last_name: license.driver.person.last_name,

            national_id: license.driver.person.national_id,
            date_of_birth: license.driver.person.date_of_birth.toLocaleDateString(),
            gender: license.driver.person.gender,

            address: license.driver.person.address,
            phone_number: license.driver.person.phone_number,
            email: license.driver.person.email,

            national_country: license.driver.person.national_country.country_name,

            personal_photo: license.driver.person.personal_photo ?? null
        }
    }
}