import { ApplicationTypeSystemName } from "@dvld/shared/src/dtos/applicationType.dto";
import { param } from "express-validator";

export const validateApplicationType = [
    param('systemName')
        .exists()
        .trim()
        .isIn(Object.values(ApplicationTypeSystemName))
        .withMessage(`systemName must be one of: ${Object.values(ApplicationTypeSystemName).join(', ')}`)
];