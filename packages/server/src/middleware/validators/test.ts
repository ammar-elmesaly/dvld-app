import { body } from 'express-validator';

export const validateNewTest = [
    body('testAppointmentId')
        .exists().withMessage('testAppointmentId is required')
        .isInt({ min: 1 }).withMessage('testAppointmentId must be a positive integer'),

    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer'),

    body('testStatus')
        .exists().withMessage('testStatus is required')
        .isIn(['0', '1', 0, 1]).withMessage('testStatus must be 0 or 1'),

    body('testNotes')
        .optional({ values: 'falsy' })
        .isString().withMessage('testNotes must be a string')
        .isLength({ max: 1000 }).withMessage('testNotes must be at most 1000 characters')
];
