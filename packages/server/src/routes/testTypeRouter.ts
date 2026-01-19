import express from 'express';
import { getAllTestTypesHandler } from '../handlers/testTypeHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /testType/all
router.get('/all', requireAuth, getAllTestTypesHandler);

// PUT /applicationType/edit

export default router;