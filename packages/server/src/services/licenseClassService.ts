import { LicenseClass } from "../entities/LicenseClass";

export function getAllLicenseClasses() {
    return LicenseClass.find();
}

export async function getLicenseClassByName(systemName: string) {
    const licenseClass = await LicenseClass.findOneBy({ system_name: systemName });
    return licenseClass;
}