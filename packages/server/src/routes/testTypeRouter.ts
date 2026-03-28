import express from 'express';
import { editTestTypeByIdHandler, getAllTestTypesHandler, getTestTypeByIdHandler, getTestTypeByNameHandler } from '../handlers/testTypeHandler';
import { requireAuth } from '../middleware/validators/auth';
import validate from '../middleware/validators/validate';
import { validateEditTestType, validateTestTypeId, validateTestTypeSystemName } from '../middleware/validators/testType';

const router = express.Router();

// GET /testType/all
router.get('/all', requireAuth, getAllTestTypesHandler);

// GET /testType/:testTypeId
router.get('/:testTypeId', requireAuth, validateTestTypeId, validate, getTestTypeByIdHandler);

// GET /testType/name/:systemName
router.get('/name/:systemName', requireAuth, validateTestTypeSystemName, validate, getTestTypeByNameHandler);

// PUT /testType/edit/:testTypeId
router.put('/edit/:testTypeId', requireAuth, validateTestTypeId, validateEditTestType, validate, editTestTypeByIdHandler);

export default router;