import express from 'express';
import { editTestTypeByIdHandler, getAllTestTypesHandler, getTestTypeByIdHandler, getTestTypeByNameHandler } from '../handlers/testTypeHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /testType/all
router.get('/all', requireAuth, getAllTestTypesHandler);

// GET /testType/:testTypeId
router.get('/:testTypeId', requireAuth, getTestTypeByIdHandler);

// GET /testType/name/:systemName
router.get('/name/:systemName', requireAuth, getTestTypeByNameHandler);

// PUT /testType/edit/:testTypeId
router.put('/edit/:testTypeId', requireAuth, editTestTypeByIdHandler);

export default router;