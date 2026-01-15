import express from 'express';
import { createNewUserHandler, getAllUsersHandler } from '../handlers/userHandler';
// import validate from '../middleware/validators/validate';

const router = express.Router();

// POST /user/new
router.post('/new', createNewUserHandler);

// GET /user/all
router.get('/all', getAllUsersHandler);

export default router;