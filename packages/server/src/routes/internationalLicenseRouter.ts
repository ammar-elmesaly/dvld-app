import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getAllInternationalLicensesWithDriverIdHandler, getLicenseByIdHandler, issueNewLicenseHandler } from '../handlers/internationalLicenseHandler';
const router = express.Router();

// POST /internationalLicense/issue
router.post('/issue', requireAuth, issueNewLicenseHandler);

// GET /internationalLicense/id/:intLicenseId
router.get('/id/:intLicenseId', requireAuth, getLicenseByIdHandler);

// GET /internationalLicense/all/driverId/:driverId
router.get('/all/driverId/:driverId', requireAuth, getAllInternationalLicensesWithDriverIdHandler);

export default router;