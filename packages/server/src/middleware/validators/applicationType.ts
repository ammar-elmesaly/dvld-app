import { ApplicationTypeSystemName } from "@dvld/shared/src/dtos/applicationType.dto";
import { body, param } from "express-validator";

export const validateApplicationType = [
    param('systemName')
        .exists()
        .trim()
        .isIn(Object.values(ApplicationTypeSystemName))
        .withMessage(`systemName must be one of: ${Object.values(ApplicationTypeSystemName).join(', ')}`)
];

export const validateApplicationTypeId = [
    param('applicationTypeId')
        .isInt({ min: 1 }).withMessage('applicationTypeId must be a positive integer')
];

export const validateEditApplicationType = [
    body('typeName')
        .exists().withMessage('typeName is required')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('typeName must be between 2 and 100 characters'),

    body('typeFees')
        .exists().withMessage('typeFees is required')
        .isFloat({ min: 0 }).withMessage('typeFees must be a non-negative number'),

    body('defaultValidityLength')
        .optional({ values: 'falsy' })
        .isInt({ min: 1 }).withMessage('defaultValidityLength must be a positive integer')
];