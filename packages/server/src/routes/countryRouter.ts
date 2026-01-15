import express from 'express';
import { getAllCountriesHandler } from '../handlers/countryHandler';

const router = express.Router();

// GET /country/all
router.get('/all', getAllCountriesHandler);

export default router;