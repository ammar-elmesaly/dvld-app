
import { TestTypeSystemName } from "@dvld/shared/src/dtos/testType.dto";
import { param } from "express-validator";

export const validateApplicationType = [
    param('systemName')
        .exists()
        .trim()
        .isIn(Object.values(TestTypeSystemName))
        .withMessage(`systemName must be one of: ${Object.values(TestTypeSystemName).join(', ')}`)
];