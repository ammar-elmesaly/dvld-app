import { body, param } from "express-validator";
import { Gender } from "@dvld/shared/src/types/person";

// Validate personId in params
export const validatePersonId = [
    param('personId')
        .isNumeric().withMessage('Please enter a valid numeric personId')
];

// Validate new person payload
export const validateNewPerson = [
    body('firstName')
        .isAlpha().withMessage('First name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('First name must be between 2 and 15 characters'),

    body('secondName')
        .isAlpha().withMessage('Second name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('Second name must be between 2 and 15 characters'),

    body('thirdName')
        .isAlpha().withMessage('Third name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('Third name must be between 2 and 15 characters'),

    body('lastName')
        .isAlpha().withMessage('Last name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('Last name must be between 2 and 15 characters'),

    body('nationalId')
        .isNumeric().withMessage('National ID must contain only numbers')
        .isLength({ min: 4, max: 4 }).withMessage('National ID must be exactly 4 digits'),

    body('dateOfBirth')
        .isDate().withMessage('Date of birth must be a valid date'),

    body('gender')
        .isIn(Object.values(Gender)).withMessage(`Gender must be one of: ${Object.values(Gender).join(', ')}`),

    body('address')
        .optional({ values: 'falsy' })
        .isLength({ min: 20, max: 100 }).withMessage('Address must be between 20 and 100 characters'),

    body('phoneNumber')
        .isNumeric().withMessage('Phone number must contain only numbers')
        .isLength({ min: 11, max: 11 }).withMessage('Phone number must be exactly 11 digits'),

    body('email')
        .optional({ values: 'falsy' })
        .isEmail().withMessage('Email must be a valid email address')
];
