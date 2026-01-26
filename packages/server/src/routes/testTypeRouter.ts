import express from 'express';
import { getAllTestTypesHandler, getTestTypeById } from '../handlers/testTypeHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /testType/all
router.get('/all', requireAuth, getAllTestTypesHandler);

// GET /testType/:testTypeId
router.get('/:testTypeId', requireAuth, getTestTypeById);


export default router;