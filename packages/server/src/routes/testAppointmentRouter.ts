import express from 'express';
import { requireAuth } from '../middleware/validators/auth.js';
import { getAllTestAppointmentsHandler, getTrialNumberHandler, newTestAppointmentHandler, updateTestAppointmentHandler } from '../handlers/testAppointmentHandler.js';
import validate from '../middleware/validators/validate.js';
import { validateLdlaId, validateLocalDrivingLicenseApplicationId, validateNewTestAppointment, validateTestAppointmentId, validateTestTypeIdQuery, validateUpdateTestAppointment } from '../middleware/validators/testAppointment.js';

const router = express.Router();

// GET /testAppointment/:localDrivingLicenseApplicationId/all
router.get('/:localDrivingLicenseApplicationId/all', requireAuth, validateLocalDrivingLicenseApplicationId, validate, getAllTestAppointmentsHandler);

// POST /testAppointment/new
router.post('/new', requireAuth, validateNewTestAppointment, validate, newTestAppointmentHandler);

// PUT /testAppointment/update/:testAppointmentId
router.put('/update/:testAppointmentId', requireAuth, validateTestAppointmentId, validateUpdateTestAppointment, validate, updateTestAppointmentHandler);

// GET /testAppointment/:ldlaId/trialNumber
router.get('/:ldlaId/trialNumber', requireAuth, validateLdlaId, validateTestTypeIdQuery, validate, getTrialNumberHandler);

export default router;