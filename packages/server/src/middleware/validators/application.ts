import { body } from 'express-validator';

export const validateNewApplication = [
    body('personId')
        .exists().withMessage('personId is required')
        .isInt({ min: 1 }).withMessage('personId must be a positive integer'),

    body('applicationTypeId')
        .exists().withMessage('applicationTypeId is required')
        .isInt({ min: 1 }).withMessage('applicationTypeId must be a positive integer'),

    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer')
];

export const validateNewLocalDrivingLicenseApplication = [
    body('personId')
        .exists().withMessage('personId is required')
        .isInt({ min: 1 }).withMessage('personId must be a positive integer'),

    body('licenseClassId')
        .exists().withMessage('licenseClassId is required')
        .isInt({ min: 1 }).withMessage('licenseClassId must be a positive integer'),

    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer')
];
