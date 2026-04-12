import { LicenseClassSystemName } from '@dvld/shared';
import { LicenseClass } from '../entities/LicenseClass.js';

export function getAllLicenseClasses() {
    return LicenseClass.find();
}

export async function getLicenseClassByName(systemName: LicenseClassSystemName) {
    const licenseClass = await LicenseClass.findOneBy({ system_name: systemName });
    return licenseClass;
}