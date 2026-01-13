import express from 'express';
import { getAllPersonsHandler, createPersonHandler, getPersonById } from '../handlers/personHandler';
import validate from "../middleware/validators/validate";
import { validatePersonId } from '../middleware/validators/person';

const router = express.Router();

// GET /person/all
router.get('/all', getAllPersonsHandler);

// GET /person/id/:personId
router.get('/id/:personId', validatePersonId, validate, getPersonById);

// POST /person/new
router.post('/new', createPersonHandler);

export default router;