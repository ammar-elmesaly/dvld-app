import express from 'express';
import { getAllApplicationTypesHandler, getApplicationTypeByNameHandler } from '../handlers/applicationTypeHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /applicationType/all
router.get('/all', requireAuth, getAllApplicationTypesHandler);

// GET /applicationType/name/:systemName
router.get('/name/:systemName', requireAuth, getApplicationTypeByNameHandler)

export default router;