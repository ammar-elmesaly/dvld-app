import express from 'express';
import { getAllPersonsHandler, createPersonHandler, getPersonById } from '../handlers/personHandler';

const router = express.Router();

// GET /person/all
router.get('/all', getAllPersonsHandler);

// GET /person/id/:personId
router.get('/id/:personId', getPersonById);

// POST /person/new
router.post('/new', createPersonHandler);

export default router;