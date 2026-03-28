import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getAllInternationalLicensesWithDriverIdHandler, getLicenseByIdHandler, issueNewLicenseHandler } from '../handlers/internationalLicenseHandler';
import validate from '../middleware/validators/validate';
import { validateInternationalLicenseDriverId, validateInternationalLicenseId, validateIssueInternationalLicense } from '../middleware/validators/internationalLicense';
const router = express.Router();

// POST /internationalLicense/issue
router.post('/issue', requireAuth, validateIssueInternationalLicense, validate, issueNewLicenseHandler);

// GET /internationalLicense/:intLicenseId
router.get('/:intLicenseId', requireAuth, validateInternationalLicenseId, validate, getLicenseByIdHandler);

// GET /internationalLicense/all/driverId/:driverId
router.get('/all/driverId/:driverId', requireAuth, validateInternationalLicenseDriverId, validate, getAllInternationalLicensesWithDriverIdHandler);

export default router;