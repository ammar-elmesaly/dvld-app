import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { addNewTestHandler } from '../handlers/testHandler';
import validate from '../middleware/validators/validate';
import { validateNewTest } from '../middleware/validators/test';

const router = express.Router();

// POST /test/new
router.post('/new', requireAuth, validateNewTest, validate, addNewTestHandler);

export default router;