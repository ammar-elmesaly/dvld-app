import express from 'express';
import { getAllPersonsHandler, createPersonHandler } from '../handlers/personHandler';

const router = express.Router();

// GET /person/all
router.get('/all', getAllPersonsHandler);

// POST /person/new
router.post('/new', createPersonHandler);

export default router;