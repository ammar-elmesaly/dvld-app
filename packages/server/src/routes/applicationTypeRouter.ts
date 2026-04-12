import express from 'express';
import { editApplicationTypeByIdHandler, getAllApplicationTypesHandler, getApplicationTypeByNameHandler } from '../handlers/applicationTypeHandler.js';
import { validateApplicationType, validateApplicationTypeId, validateEditApplicationType } from '../middleware/validators/applicationType.js';
import { requireAuth } from '../middleware/validators/auth.js';
import validate from '../middleware/validators/validate.js';

const router = express.Router();

// GET /applicationType/all
router.get('/all', requireAuth, getAllApplicationTypesHandler);

// GET /applicationType/name/:systemName
router.get('/name/:systemName', requireAuth, validateApplicationType, validate, getApplicationTypeByNameHandler)

// PUT /applicationType/edit/:applicationTypeId
router.put('/edit/:applicationTypeId', requireAuth, validateApplicationTypeId, validateEditApplicationType, validate, editApplicationTypeByIdHandler);

export default router;