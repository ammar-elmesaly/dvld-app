import express from 'express';
import { requireAuth } from '../middleware/validators/auth';
import { getAllDriversHandler } from '../handlers/driverHandler';

const router = express.Router();

// GET /driver/all
router.get('/all', requireAuth, getAllDriversHandler);

export default router;