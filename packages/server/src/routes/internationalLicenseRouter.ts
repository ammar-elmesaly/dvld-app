import express from 'express';
import { requireAuth } from '../middleware/validators/auth.js';
import { getAllInternationalLicensesWithDriverIdHandler, getLicenseByIdHandler, issueNewLicenseHandler } from '../handlers/internationalLicenseHandler.js';
import validate from '../middleware/validators/validate.js';
import { validateInternationalLicenseDriverId, validateInternationalLicenseId, validateIssueInternationalLicense } from '../middleware/validators/internationalLicense.js';
const router = express.Router();

// POST /internationalLicense/issue
router.post('/issue', requireAuth, validateIssueInternationalLicense, validate, issueNewLicenseHandler);

// GET /internationalLicense/:intLicenseId
router.get('/:intLicenseId', requireAuth, validateInternationalLicenseId, validate, getLicenseByIdHandler);

// GET /internationalLicense/all/driverId/:driverId
router.get('/all/driverId/:driverId', requireAuth, validateInternationalLicenseDriverId, validate, getAllInternationalLicensesWithDriverIdHandler);

export default router;