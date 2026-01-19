import express from 'express';
import { loginHandler } from '../handlers/loginHandler';

const router = express.Router();

// POST /login
router.post('/', loginHandler);

export default router;