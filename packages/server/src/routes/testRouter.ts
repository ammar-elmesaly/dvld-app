import express from 'express';
import { requireAuth } from '../middleware/validators/auth.js';
import { addNewTestHandler } from '../handlers/testHandler.js';
import validate from '../middleware/validators/validate.js';
import { validateNewTest } from '../middleware/validators/test.js';

const router = express.Router();

// POST /test/new
router.post('/new', requireAuth, validateNewTest, validate, addNewTestHandler);

export default router;