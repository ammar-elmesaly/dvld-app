import { body, param, query } from 'express-validator';
import { AppError } from '../../types/errors';
import { isValidTestAppointment } from '../../utils/dateUtil';

export const validateLocalDrivingLicenseApplicationId = [
    param('localDrivingLicenseApplicationId')
        .isInt({ min: 1 }).withMessage('localDrivingLicenseApplicationId must be a positive integer')
];

export const validateLdlaId = [
    param('ldlaId')
        .isInt({ min: 1 }).withMessage('ldlaId must be a positive integer')
];

export const validateTestAppointmentId = [
    param('testAppointmentId')
        .isInt({ min: 1 }).withMessage('testAppointmentId must be a positive integer')
];

export const validateTestTypeIdQuery = [
    query('testTypeId')
        .exists().withMessage('testTypeId is required')
        .isInt({ min: 1 }).withMessage('testTypeId must be a positive integer')
];

export const validateNewTestAppointment = [
    body('testTypeId')
        .exists().withMessage('testTypeId is required')
        .isInt({ min: 1 }).withMessage('testTypeId must be a positive integer'),

    body('localDrivingLicenseApplicationId')
        .exists().withMessage('localDrivingLicenseApplicationId is required')
        .isInt({ min: 1 }).withMessage('localDrivingLicenseApplicationId must be a positive integer'),

    body('appointmentDate')
        .exists().withMessage('appointmentDate is required')
        .isISO8601().withMessage('appointmentDate must be a valid date')
        .custom((value) => {
            const inputDate = new Date(value);
            if (!isValidTestAppointment(inputDate))
                throw new AppError('Test Appointment date cannot be in the past.', 400);
            return true;
        }),

    body('createdByUserId')
        .exists().withMessage('createdByUserId is required')
        .isInt({ min: 1 }).withMessage('createdByUserId must be a positive integer')
];

export const validateUpdateTestAppointment = [
    body('appointmentDate')
        .exists().withMessage('appointmentDate is required')
        .isISO8601().withMessage('appointmentDate must be a valid date')
        .custom((value) => {
            const inputDate = new Date(value);
            if (!isValidTestAppointment(inputDate))
                throw new AppError('Test Appointment date cannot be in the past.', 400);
            return true;
        }),
];
