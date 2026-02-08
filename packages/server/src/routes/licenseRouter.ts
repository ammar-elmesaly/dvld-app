import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { detainLicenseHandler, getAllDetainedLicensesHandler, getAllLicensesByDriverIdHandler, getDetainedLicenseWithLicenseIdHandler, getLicenseByIdHandler, issueLicenseFirstTimeHandler, releaseLicenseHandler, renewLicenseHandler, replaceLicenseHandler } from '../handlers/licenseHandler';
const router = express.Router();

// POST /license/issue
router.post('/issue', requireAuth, issueLicenseFirstTimeHandler);

// POST /license/renew
router.post('/renew', requireAuth, renewLicenseHandler);

// POST /license/replace
router.post('/replace', requireAuth, replaceLicenseHandler);

// POST /license/detain
router.post('/detain', requireAuth, detainLicenseHandler);

// POST /license/release
router.post('/release', requireAuth, releaseLicenseHandler);

// GET /license/detained/licenseId/:licenseId
router.get('/detained/licenseId/:licenseId', requireAuth, getDetainedLicenseWithLicenseIdHandler);

// GET /license/detained/all
router.get('/detained/all', requireAuth, getAllDetainedLicensesHandler);

// GET /license/id/:licenseId
router.get('/id/:licenseId', requireAuth, getLicenseByIdHandler);

// GET /license/all/driverId/:driverId
router.get('/all/driverId/:driverId', requireAuth, getAllLicensesByDriverIdHandler);


export default router;