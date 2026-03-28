
import { TestTypeSystemName } from "@dvld/shared/src/dtos/testType.dto";
import { body, param } from "express-validator";

export const validateTestTypeSystemName = [
    param('systemName')
        .exists()
        .trim()
        .isIn(Object.values(TestTypeSystemName))
        .withMessage(`systemName must be one of: ${Object.values(TestTypeSystemName).join(', ')}`)
];

export const validateTestTypeId = [
    param('testTypeId')
        .isInt({ min: 1 }).withMessage('testTypeId must be a positive integer')
];

export const validateEditTestType = [
    body('typeName')
        .exists().withMessage('typeName is required')
        .isString().withMessage('typeName must be a string')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('typeName must be between 2 and 100 characters'),

    body('typeDescription')
        .exists().withMessage('typeDescription is required')
        .isString().withMessage('typeDescription must be a string')
        .trim()
        .isLength({ min: 2, max: 500 }).withMessage('typeDescription must be between 2 and 500 characters'),

    body('typeFees')
        .exists().withMessage('typeFees is required')
        .isFloat({ min: 0 }).withMessage('typeFees must be a non-negative number')
];

export const validateApplicationType = validateTestTypeSystemName;