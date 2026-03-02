import { LicenseClassSystemName } from "@dvld/shared/src/dtos/licenseClass.dto";
import { LicenseClass } from "../entities/LicenseClass";

export function getAllLicenseClasses() {
    return LicenseClass.find();
}

export async function getLicenseClassByName(systemName: LicenseClassSystemName) {
    const licenseClass = await LicenseClass.findOneBy({ system_name: systemName });
    return licenseClass;
}