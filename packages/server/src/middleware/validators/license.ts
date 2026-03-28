import { body, param } from 'express-validator';
import { ReplacementType } from '@dvld/shared/src/types/license';

export const validateLicenseId = [
    param('licenseId')
        .isInt({ min: 1 }).withMessage('licenseId must be a positive integer')
];

export const validateLicenseDriverId = [
    param('driverId')
        .isInt({ min: 1 }).withMessage('driverId must be a positive integer')
];

export const validateIssueLicenseFirstTime = [
    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer'),

    body('localDrivingLicenseApplicationId')
        .exists().withMessage('localDrivingLicenseApplicationId is required')
        .isInt({ min: 1 }).withMessage('localDrivingLicenseApplicationId must be a positive integer'),

    body('notes')
        .optional({ values: 'falsy' })
        .isString().withMessage('notes must be a string')
        .isLength({ max: 1000 }).withMessage('notes must be at most 1000 characters')
];

export const validateRenewLicense = [
    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer'),

    body('licenseId')
        .exists().withMessage('licenseId is required')
        .isInt({ min: 1 }).withMessage('licenseId must be a positive integer'),

    body('notes')
        .optional({ values: 'falsy' })
        .isString().withMessage('notes must be a string')
        .isLength({ max: 1000 }).withMessage('notes must be at most 1000 characters')
];

export const validateReplaceLicense = [
    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer'),

    body('licenseId')
        .exists().withMessage('licenseId is required')
        .isInt({ min: 1 }).withMessage('licenseId must be a positive integer'),

    body('replacementType')
        .exists().withMessage('replacementType is required')
        .isIn(Object.values(ReplacementType)).withMessage(`replacementType must be one of: ${Object.values(ReplacementType).join(', ')}`),

    body('notes')
        .optional({ values: 'falsy' })
        .isString().withMessage('notes must be a string')
        .isLength({ max: 1000 }).withMessage('notes must be at most 1000 characters')
];

export const validateDetainLicense = [
    body('licenseId')
        .exists().withMessage('licenseId is required')
        .isInt({ min: 1 }).withMessage('licenseId must be a positive integer'),

    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer'),

    body('fineFees')
        .exists().withMessage('fineFees is required')
        .isFloat({ min: 0 }).withMessage('fineFees must be a non-negative number')
];

export const validateReleaseLicense = [
    body('licenseId')
        .exists().withMessage('licenseId is required')
        .isInt({ min: 1 }).withMessage('licenseId must be a positive integer'),

    body('releasedByUserId')
        .exists().withMessage('releasedByUserId is required')
        .isInt({ min: 1 }).withMessage('releasedByUserId must be a positive integer')
];
