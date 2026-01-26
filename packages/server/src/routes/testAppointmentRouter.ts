import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getAllTestAppointmentsHandler, newTestAppointmentHandler } from '../handlers/testAppointmentHandler';

const router = express.Router();

// GET /testAppointment/:localDrivingLicenseApplicationId/all
router.get('/:localDrivingLicenseApplicationId/all', requireAuth, getAllTestAppointmentsHandler);

// POST /testAppointment/new
router.post('/new', requireAuth, newTestAppointmentHandler);

export default router;