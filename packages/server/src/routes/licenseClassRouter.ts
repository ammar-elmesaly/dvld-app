import express from 'express';
import { getAllLicenseClassesHandler, getLicenseClassByNameHandler } from '../handlers/licenseClassHandler';
import { requireAuth } from '../middleware/validators/auth';
import { validateLicenseClassType } from '../middleware/validators/licenseClass';
import validate from '../middleware/validators/validate';

const router = express.Router();

// GET /licenseClass/all
router.get('/all', requireAuth, getAllLicenseClassesHandler);

// GET /licenseClass/name/:systemName
router.get('/name/:systemName', requireAuth, validateLicenseClassType, validate, getLicenseClassByNameHandler);

export default router;