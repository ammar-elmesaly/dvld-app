import express from 'express';
import { createNewUserHandler, getAllUsersHandler } from '../handlers/userHandler';
import { requireAuth } from '../middleware/validators/auth';
// import validate from '../middleware/validators/validate';

const router = express.Router();

// POST /user/new
router.post('/new', requireAuth, createNewUserHandler);

// GET /user/all
router.get('/all', requireAuth, getAllUsersHandler);

export default router;