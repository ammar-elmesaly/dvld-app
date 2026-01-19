import express from 'express';
import { getAllLicenseClassesHandler } from '../handlers/licenseClassHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /licenseClass/all
router.get('/all', requireAuth, getAllLicenseClassesHandler);

export default router;