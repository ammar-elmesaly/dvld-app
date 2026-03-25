
import { LicenseClassSystemName } from "@dvld/shared/src/dtos/licenseClass.dto";
import { param } from "express-validator";

export const validateApplicationType = [
    param('systemName')
        .exists()
        .trim()
        .isIn(Object.values(LicenseClassSystemName))
        .withMessage(`systemName must be one of: ${Object.values(LicenseClassSystemName).join(', ')}`)
];