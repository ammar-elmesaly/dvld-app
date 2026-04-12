import express from 'express';
import { getAllLicenseClassesHandler, getLicenseClassByNameHandler } from '../handlers/licenseClassHandler.js';
import { requireAuth } from '../middleware/validators/auth.js';
import { validateLicenseClassType } from '../middleware/validators/licenseClass.js';
import validate from '../middleware/validators/validate.js';

const router = express.Router();

// GET /licenseClass/all
router.get('/all', requireAuth, getAllLicenseClassesHandler);

// GET /licenseClass/name/:systemName
router.get('/name/:systemName', requireAuth, validateLicenseClassType, validate, getLicenseClassByNameHandler);

export default router;