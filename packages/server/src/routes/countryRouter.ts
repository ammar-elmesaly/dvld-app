import express from 'express';
import { getAllCountriesHandler } from '../handlers/countryHandler.js';
import { requireAuth } from '../middleware/validators/auth.js';

const router = express.Router();

// GET /country/all
router.get('/all', requireAuth, getAllCountriesHandler);

export default router;