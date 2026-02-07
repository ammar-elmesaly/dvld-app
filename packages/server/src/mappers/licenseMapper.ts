import { License } from "../entities/License";
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";
import { LicensePersonDTO } from "@dvld/shared/src/dtos/licensePerson.dto";

export function toLicenseDTO(license: License): LicenseDTO {
    return {
        id: license.id,
        driver_id: license.driver.id,
        is_active: license.is_active,
        expiration_date: new Date(license.expiration_date).toLocaleDateString(),
        issue_date: new Date(license.issue_date).toLocaleDateString(),
        notes: license.notes,
        is_detained: license.is_detained,
        issue_reason: license.issue_reason,
        license_class_name: license.license_class.class_name,
        license_system_name: license.license_class.system_name
    }
}

export function toLicenseWithPersonDTO(license: License): LicensePersonDTO {
    return {
        license: {
            id: license.id,
            driver_id: license.driver.id,
            is_active: license.is_active,
            expiration_date: new Date(license.expiration_date).toLocaleDateString(),
            issue_date: new Date(license.issue_date).toLocaleDateString(),
            notes: license.notes,
            is_detained: license.is_detained,
            issue_reason: license.issue_reason,
            license_class_name: license.license_class.class_name,
            license_system_name: license.license_class.system_name
        },

        person: {
            id: license.driver.person.id,

            first_name: license.driver.person.first_name,
            second_name: license.driver.person.second_name,
            third_name: license.driver.person.third_name,
            last_name: license.driver.person.last_name,
            full_name: license.driver.person.full_name,
            
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