import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getAllLicensesByDriverIdHandler, getLicenseByIdHandler, issueNewLicenseHandler } from '../handlers/licenseHandler';
const router = express.Router();

// POST /license/issue
router.post('/issue', requireAuth, issueNewLicenseHandler);

// GET /license/id/:licenseId
router.get('/id/:licenseId', requireAuth, getLicenseByIdHandler);

// GET /license/all/driverId/:driverId
router.get('/all/driverId/:driverId', requireAuth, getAllLicensesByDriverIdHandler);

export default router;