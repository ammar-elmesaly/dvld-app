import { Driver } from "../entities/Driver";
import { DriverDTO } from "@dvld/shared/src/dtos/driver.dto";

export function toDriverDTO(driver: Driver): DriverDTO {    
    return {
        driver_id: driver.id,
        person_id: driver.person.id,
        national_id: driver.person.national_id,
        created_at: new Date(driver.created_at).toDateString(),
        full_name: driver.person.full_name,
        active_licenses: driver.active_licenses
    };
}