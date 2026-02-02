import express from 'express';
import { getAllPersonsHandler, createPersonHandler, getPersonByIdHandler, getPersonByNationalIdHandler, getPersonByDriverIdHandler } from '../handlers/personHandler';
import validate from "../middleware/validators/validate";
import { validatePersonId, validateNewPerson, validatePersonNationalId } from '../middleware/validators/person';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { requireAuth } from '../middleware/validators/auth';

const uploadPath = path.join(__dirname, '../../uploads/personalPictures');

fs.mkdirSync(uploadPath, { recursive: true });

const upload = multer({ dest: uploadPath });


const router = express.Router();

// GET /person/all
router.get('/all', requireAuth, getAllPersonsHandler);

// GET /person/id/:personId
router.get('/id/:personId', requireAuth, validatePersonId, validate, getPersonByIdHandler);

// GET /person/nid/:nationalId
router.get('/nid/:nationalId', requireAuth, validatePersonNationalId, validate, getPersonByNationalIdHandler);

// GET /person/driverId/:driverId
router.get('/driverId/:driverId', requireAuth, getPersonByDriverIdHandler);

// POST /person/new
router.post('/new', requireAuth, upload.single("personalImage"), validateNewPerson, validate, createPersonHandler);

export default router;