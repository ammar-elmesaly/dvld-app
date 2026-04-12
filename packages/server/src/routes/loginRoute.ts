import express from 'express';
import { loginHandler } from '../handlers/loginHandler.js';
import validate from '../middleware/validators/validate.js';
import { validateLogin } from '../middleware/validators/login.js';

const router = express.Router();

// POST /login
router.post('/', validateLogin, validate, loginHandler);

export default router;