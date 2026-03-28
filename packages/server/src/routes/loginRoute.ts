import express from 'express';
import { loginHandler } from '../handlers/loginHandler';
import validate from '../middleware/validators/validate';
import { validateLogin } from '../middleware/validators/login';

const router = express.Router();

// POST /login
router.post('/', validateLogin, validate, loginHandler);

export default router;