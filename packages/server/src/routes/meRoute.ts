import express from 'express';
import { getCurrentUser } from '../handlers/meHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// GET /me
router.get('/', requireAuth, getCurrentUser);

export default router;