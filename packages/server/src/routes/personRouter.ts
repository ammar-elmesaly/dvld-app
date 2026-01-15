import express from 'express';
import { getAllPersonsHandler, createPersonHandler, getPersonById } from '../handlers/personHandler';
import validate from "../middleware/validators/validate";
import { validatePersonId, validateNewPerson } from '../middleware/validators/person';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = path.join(__dirname, '../../uploads/personalPictures');

fs.mkdirSync(uploadPath, { recursive: true });

const upload = multer({ dest: uploadPath });


const router = express.Router();

// GET /person/all
router.get('/all', getAllPersonsHandler);

// GET /person/id/:personId
router.get('/id/:personId', validatePersonId, validate, getPersonById);

// POST /person/new
router.post('/new', upload.single("personalImage"), validateNewPerson, validate, createPersonHandler);

export default router;