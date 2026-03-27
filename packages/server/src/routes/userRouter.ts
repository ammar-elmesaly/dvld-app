import express from 'express';
import { createNewUserHandler, deleteUserByIdHandler, editUserByIdHandler, getAllUsersHandler } from '../handlers/userHandler';
import { requireAuth } from '../middleware/validators/auth';
// import validate from '../middleware/validators/validate';

const router = express.Router();

// POST /user/new
router.post('/new', requireAuth, createNewUserHandler);

// GET /user/all
router.get('/all', requireAuth, getAllUsersHandler);

// PUT /user/edit/:userId
router.put('/edit/:userId', requireAuth, editUserByIdHandler);

// DELETE /user/delete/:userId
router.delete('/delete/:userId', requireAuth, deleteUserByIdHandler);

export default router;