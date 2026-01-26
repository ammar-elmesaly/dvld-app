import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getAllTestAppointmentsHandler, newTestAppointmentHandler, updateTestAppointmentHandler } from '../handlers/testAppointmentHandler';

const router = express.Router();

// GET /testAppointment/:localDrivingLicenseApplicationId/all
router.get('/:localDrivingLicenseApplicationId/all', requireAuth, getAllTestAppointmentsHandler);

// POST /testAppointment/new
router.post('/new', requireAuth, newTestAppointmentHandler);

// PUT /testAppointment/update/:testAppointmentId
router.put('/update/:testAppointmentId', requireAuth, updateTestAppointmentHandler);

export default router;