import express from 'express';
import { createNewUserHandler, deleteUserByIdHandler, editUserByIdHandler, getAllUsersHandler } from '../handlers/userHandler';
import { requireAuth } from '../middleware/validators/auth';
import validate from '../middleware/validators/validate';
import { validateEditUser, validateNewUser, validateUserId } from '../middleware/validators/user';

const router = express.Router();

// POST /user/new
router.post('/new', requireAuth, validateNewUser, validate, createNewUserHandler);

// GET /user/all
router.get('/all', requireAuth, getAllUsersHandler);

// PUT /user/edit/:userId
router.put('/edit/:userId', requireAuth, validateUserId, validateEditUser, validate, editUserByIdHandler);

// DELETE /user/delete/:userId
router.delete('/delete/:userId', requireAuth, validateUserId, validate, deleteUserByIdHandler);

export default router;