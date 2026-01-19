import express from 'express';
import { getAllApplicationTypesHandler } from '../handlers/applicationTypeHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /applicationType/all
router.get('/all', requireAuth, getAllApplicationTypesHandler);

// PUT /applicationType/edit

export default router;