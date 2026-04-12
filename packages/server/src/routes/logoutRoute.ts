import express from 'express';
import { logoutHandler } from '../handlers/logoutHandler.js';
import { requireAuth } from '../middleware/validators/auth.js';

const router = express.Router();

// POST /logout
router.post('/', requireAuth, logoutHandler);

export default router;