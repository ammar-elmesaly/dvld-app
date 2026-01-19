import express from 'express';
import { logoutHandler } from '../handlers/logoutHandler';
import { requireAuth } from '../middleware/validators/auth';

const router = express.Router();

// POST /logout
router.post('/', requireAuth, logoutHandler);

export default router;