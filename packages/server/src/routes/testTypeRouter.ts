import express from 'express';
import { getAllTestTypesHandler, getTestTypeById, getTestTypeByName } from '../handlers/testTypeHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /testType/all
router.get('/all', requireAuth, getAllTestTypesHandler);

// GET /testType/:testTypeId
router.get('/:testTypeId', requireAuth, getTestTypeById);

// GET /testType/name/:systemName
router.get('/name/:systemName', requireAuth, getTestTypeByName);


export default router;