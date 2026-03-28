import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { detainLicenseHandler, getAllDetainedLicensesHandler, getAllLicensesByDriverIdHandler, getDetainedLicenseWithLicenseIdHandler, getLicenseByIdHandler, issueLicenseFirstTimeHandler, releaseLicenseHandler, renewLicenseHandler, replaceLicenseHandler } from '../handlers/licenseHandler';
import validate from '../middleware/validators/validate';
import { validateDetainLicense, validateIssueLicenseFirstTime, validateLicenseDriverId, validateLicenseId, validateReleaseLicense, validateRenewLicense, validateReplaceLicense } from '../middleware/validators/license';
const router = express.Router();

// POST /license/issue
router.post('/issue', requireAuth, validateIssueLicenseFirstTime, validate, issueLicenseFirstTimeHandler);

// POST /license/renew
router.post('/renew', requireAuth, validateRenewLicense, validate, renewLicenseHandler);

// POST /license/replace
router.post('/replace', requireAuth, validateReplaceLicense, validate, replaceLicenseHandler);

// POST /license/detain
router.post('/detain', requireAuth, validateDetainLicense, validate, detainLicenseHandler);

// POST /license/release
router.post('/release', requireAuth, validateReleaseLicense, validate, releaseLicenseHandler);

// GET /license/detained/licenseId/:licenseId
router.get('/detained/licenseId/:licenseId', requireAuth, validateLicenseId, validate, getDetainedLicenseWithLicenseIdHandler);

// GET /license/detained/all
router.get('/detained/all', requireAuth, getAllDetainedLicensesHandler);

// GET /license/:licenseId
router.get('/:licenseId', requireAuth, validateLicenseId, validate, getLicenseByIdHandler);

// GET /license/all/driverId/:driverId
router.get('/all/driverId/:driverId', requireAuth, validateLicenseDriverId, validate, getAllLicensesByDriverIdHandler);


export default router;