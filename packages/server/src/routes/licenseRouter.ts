import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getLicenseByIdHandler, issueNewLicenseHandler } from '../handlers/licenseHandler';
const router = express.Router();

// POST /license/issue
router.post('/issue', requireAuth, issueNewLicenseHandler);

// GET /license/id/:licenseId
router.get('/id/:licenseId', requireAuth, getLicenseByIdHandler);


export default router;