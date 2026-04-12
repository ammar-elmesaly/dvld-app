import express from 'express';
import { getCurrentUser } from '../handlers/meHandler.js';
import { requireAuth } from '../middleware/validators/auth.js';

const router = express.Router();

// GET /me
router.get('/', requireAuth, getCurrentUser);

export default router;