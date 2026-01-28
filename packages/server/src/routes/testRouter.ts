import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { addNewTestHandler } from '../handlers/testHandler';

const router = express.Router();

// POST /test/new
router.post('/new', requireAuth, addNewTestHandler);

export default router;