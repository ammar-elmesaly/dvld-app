import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getLicenseByIdHandler, issueNewLicenseHandler } from '../handlers/internationalLicenseHandler';
const router = express.Router();

// POST /internationalLicense/issue
router.post('/issue', requireAuth, issueNewLicenseHandler);

// GET /internationalLicense/id/:intLicenseId
router.get('/id/:intLicenseId', requireAuth, getLicenseByIdHandler);


export default router;