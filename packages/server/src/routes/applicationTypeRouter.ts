import express from 'express';
import { getAllApplicationTypesHandler } from '../handlers/applicationTypeHandler';

const router = express.Router();

// GET /applicationType/all
router.get('/all', getAllApplicationTypesHandler);

// PUT /applicationType/edit

export default router;