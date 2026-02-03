import express from 'express';
import { getAllApplicationsHandler, getLocalDrivingLicenseApplicationsHandler, newLocalDrivingLicenseHandler, newApplicationHandler, getInternationalDrivingLicenseApplicationsHandler } from '../handlers/applicationHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /application/all
router.get('/all', requireAuth, getAllApplicationsHandler);

// GET /application/all/local
router.get('/all/local', requireAuth, getLocalDrivingLicenseApplicationsHandler);

// GET /application/all/international
router.get('/all/international', requireAuth, getInternationalDrivingLicenseApplicationsHandler);

// POST /application/new
router.post('/new', requireAuth, newApplicationHandler);

// POST /application/new/local
router.post('/new/local', requireAuth, newLocalDrivingLicenseHandler);
export default router;