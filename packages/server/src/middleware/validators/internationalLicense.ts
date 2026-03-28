import { body, param } from 'express-validator';

export const validateInternationalLicenseId = [
    param('intLicenseId')
        .isInt({ min: 1 }).withMessage('intLicenseId must be a positive integer')
];

export const validateInternationalLicenseDriverId = [
    param('driverId')
        .isInt({ min: 1 }).withMessage('driverId must be a positive integer')
];

export const validateIssueInternationalLicense = [
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
