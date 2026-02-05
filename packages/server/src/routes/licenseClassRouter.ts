import express from 'express';
import { getAllLicenseClassesHandler, getLicenseClassByNameHandler } from '../handlers/licenseClassHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /licenseClass/all
router.get('/all', requireAuth, getAllLicenseClassesHandler);

// GET /licenseClass/name/:systemName
router.get('/name/:systemName', requireAuth, getLicenseClassByNameHandler);

export default router;