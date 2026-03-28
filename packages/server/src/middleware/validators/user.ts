import { body, param } from 'express-validator';

export const validateUserId = [
    param('userId')
        .isInt({ min: 1 }).withMessage('userId must be a positive integer')
];

export const validateNewUser = [
    body('personId')
        .exists().withMessage('personId is required')
        .isInt({ min: 1 }).withMessage('personId must be a positive integer'),

    body('username')
        .exists().withMessage('username is required')
        .isString().withMessage('username must be a string')
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage('username must be between 3 and 50 characters'),

    body('password')
        .exists().withMessage('password is required')
        .isString().withMessage('password must be a string')
        .isLength({ min: 3, max: 255 }).withMessage('password must be between 3 and 255 characters'),

    body('isActive')
        .optional({ values: 'falsy' })
        .isBoolean().withMessage('isActive must be boolean')
];

export const validateEditUser = [
    body('isActive')
        .exists().withMessage('isActive is required')
        .isBoolean().withMessage('isActive must be boolean')
];
