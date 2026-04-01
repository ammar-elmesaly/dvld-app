import { body, param } from "express-validator";
import { Gender } from '@dvld/shared';
import { AppError } from "../../types/errors";
import { isValidPersonAge } from "../../utils/dateUtil";

// Validate personId in params
export const validatePersonId = [
    param('personId')
        .isInt({ min: 1 }).withMessage('Please enter a valid positive numeric personId')
];

// Validate driverId in params
export const validateDriverId = [
    param('driverId')
        .isInt({ min: 1 }).withMessage('Please enter a valid positive numeric driverId')
];

// Validate nationalId in params
export const validatePersonNationalId = [
    param('nationalId')
            .isNumeric().withMessage('National ID must contain only numbers')
            .isLength({ min: 4, max: 4 }).withMessage('National ID must be exactly 4 digits'),
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
        .isDate().withMessage('Date of birth must be a valid date')
        .custom((value) => {
            const inputDate = new Date(value);
            if (!isValidPersonAge(inputDate))
                throw new AppError('Person has to be at least 18 years old and at most 100 years old.', 400);
            return true;
        }), 

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
        .isEmail().withMessage('Email must be a valid email address'),

    body('nationalCountryId')
        .isInt({ min: 1 }).withMessage('nationalCountryId must be a positive integer')
];

export const validateEditPerson = [
    param('personId')
        .isInt({ min: 1 })
        .withMessage('personId must be a positive integer.'),

    body('firstName')
        .optional()
        .isAlpha().withMessage('First name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('First name must be between 2 and 15 characters'),

    body('secondName')
        .optional()
        .isAlpha().withMessage('Second name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('Second name must be between 2 and 15 characters'),

    body('thirdName')
        .optional()
        .isAlpha().withMessage('Third name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('Third name must be between 2 and 15 characters'),

    body('lastName')
        .optional()
        .isAlpha().withMessage('Last name must contain only letters')
        .isLength({ min: 2, max: 15 }).withMessage('Last name must be between 2 and 15 characters'),

    body('nationalId')
        .optional()
        .isNumeric().withMessage('National ID must contain only numbers')
        .isLength({ min: 4, max: 4 }).withMessage('National ID must be exactly 4 digits'),

    body('dateOfBirth')
        .optional()
        .isDate().withMessage('Date of birth must be a valid date')
        .custom((value) => {
            const inputDate = new Date(value);
            if (!isValidPersonAge(inputDate))
                throw new AppError('Person has to be at least 18 years old and at most 100 years old.', 400);
            return true;
        }), 

    body('gender')
        .optional()
        .isIn(Object.values(Gender)).withMessage(`Gender must be one of: ${Object.values(Gender).join(', ')}`),

    body('address')
        .optional({ values: 'falsy' })
        .isLength({ min: 20, max: 100 }).withMessage('Address must be between 20 and 100 characters'),

    body('phoneNumber')
        .optional()
        .isNumeric().withMessage('Phone number must contain only numbers')
        .isLength({ min: 11, max: 11 }).withMessage('Phone number must be exactly 11 digits'),

    body('email')
        .optional({ values: 'falsy' })
        .isEmail().withMessage('Email must be a valid email address'),

    body('nationalCountryId')
        .optional({ values: 'falsy' })
        .isInt({ min: 1 }).withMessage('nationalCountryId must be a positive integer')
];
