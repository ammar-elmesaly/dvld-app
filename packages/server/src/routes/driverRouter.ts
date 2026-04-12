import express from 'express';
import { requireAuth } from '../middleware/validators/auth.js';
import { getAllDriversHandler } from '../handlers/driverHandler.js';

const router = express.Router();

// GET /driver/all
router.get('/all', requireAuth, getAllDriversHandler);

export default router;