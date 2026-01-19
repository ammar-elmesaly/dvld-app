import { LicenseClass } from "../entities/LicenseClass";

export function getAllLicenseClasses() {
    return LicenseClass.find();
}