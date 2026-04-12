import express from 'express';
import { getAllApplicationsHandler, getLocalDrivingLicenseApplicationsHandler, newLocalDrivingLicenseHandler, newApplicationHandler, getInternationalDrivingLicenseApplicationsHandler } from '../handlers/applicationHandler.js';
import { requireAuth } from '../middleware/validators/auth.js';
import validate from '../middleware/validators/validate.js';
import { validateNewApplication, validateNewLocalDrivingLicenseApplication } from '../middleware/validators/application.js';

const router = express.Router();

// GET /application/all
router.get('/all', requireAuth, getAllApplicationsHandler);

// GET /application/all/local
router.get('/all/local', requireAuth, getLocalDrivingLicenseApplicationsHandler);

// GET /application/all/international
router.get('/all/international', requireAuth, getInternationalDrivingLicenseApplicationsHandler);

// POST /application/new
router.post('/new', requireAuth, validateNewApplication, validate, newApplicationHandler);

// POST /application/new/local
router.post('/new/local', requireAuth, validateNewLocalDrivingLicenseApplication, validate, newLocalDrivingLicenseHandler);
export default router;