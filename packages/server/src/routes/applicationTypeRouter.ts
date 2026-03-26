import express from 'express';
import { editApplicationTypeByIdHandler, getAllApplicationTypesHandler, getApplicationTypeByNameHandler } from '../handlers/applicationTypeHandler';
import { validateApplicationType } from '../middleware/validators/applicationType';
import { requireAuth } from '../middleware/validators/auth';
import validate from '../middleware/validators/validate';

const router = express.Router();

// GET /applicationType/all
router.get('/all', requireAuth, getAllApplicationTypesHandler);

// GET /applicationType/name/:systemName
router.get('/name/:systemName', requireAuth, validateApplicationType, validate, getApplicationTypeByNameHandler)

// PUT /applicationType/edit/:applicationTypeId
router.put('/edit/:applicationTypeId', requireAuth, editApplicationTypeByIdHandler);

export default router;