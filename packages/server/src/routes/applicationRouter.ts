import express from 'express';
import { getAllApplicationsHandler } from '../handlers/applicationHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /application/all
router.get('/all', requireAuth, getAllApplicationsHandler);

export default router;