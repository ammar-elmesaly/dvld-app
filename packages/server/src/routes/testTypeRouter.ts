import express from 'express';
import { getAllTestTypesHandler } from '../handlers/testTypeHandler';

const router = express.Router();

// GET /testType/all
router.get('/all', getAllTestTypesHandler);

// PUT /applicationType/edit

export default router;