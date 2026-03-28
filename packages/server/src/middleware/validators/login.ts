import { body } from 'express-validator';

export const validateLogin = [
    body('username')
        .exists().withMessage('username is required')
        .isString().withMessage('username must be a string')
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('username must be between 1 and 100 characters'),

    body('password')
        .exists().withMessage('password is required')
        .isString().withMessage('password must be a string')
        .isLength({ min: 1, max: 255 }).withMessage('password must be between 1 and 255 characters'),

    body('rememberMe')
        .optional({ values: 'falsy' })
        .isString().withMessage('rememberMe must be a string')
];
