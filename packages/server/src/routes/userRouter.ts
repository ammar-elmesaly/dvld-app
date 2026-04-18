import express from 'express';
import { changePasswordHandler, createNewUserHandler, deleteUserByIdHandler, editUserByIdHandler, getAllUsersHandler } from '../handlers/userHandler.js';
import { requireAuth } from '../middleware/validators/auth.js';
import validate from '../middleware/validators/validate.js';
import { validateChangeUserPassword, validateEditUser, validateNewUser, validateUserId } from '../middleware/validators/user.js';

const router = express.Router();

// POST /user/new
router.post('/new', requireAuth, validateNewUser, validate, createNewUserHandler);

// GET /user/all
router.get('/all', requireAuth, getAllUsersHandler);

// PUT /user/edit/:userId
router.put('/edit/:userId', requireAuth, validateUserId, validateEditUser, validate, editUserByIdHandler);

// PUT /user/changePassword
router.put('/changePassword', requireAuth, validateChangeUserPassword, validate, changePasswordHandler);

// DELETE /user/delete/:userId
router.delete('/delete/:userId', requireAuth, validateUserId, validate, deleteUserByIdHandler);

export default router;