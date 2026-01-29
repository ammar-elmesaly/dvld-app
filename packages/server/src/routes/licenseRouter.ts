import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { issueNewLicenseHandler } from '../handlers/licenseHandler';
const router = express.Router();

// POST /license/issue
router.post('/issue', requireAuth, issueNewLicenseHandler);

export default router;