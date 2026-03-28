import express from 'express';
import { getAllPersonsHandler, createPersonHandler, getPersonByIdHandler, getPersonByNationalIdHandler, getPersonByDriverIdHandler, editPersonByIdHandler, deletePersonByIdHandler } from '../handlers/personHandler';
import validate from "../middleware/validators/validate";
import { validatePersonId, validateNewPerson, validatePersonNationalId, validateEditPerson, validateDriverId } from '../middleware/validators/person';
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

// GET /person/:personId
router.get('/:personId', requireAuth, validatePersonId, validate, getPersonByIdHandler);

// GET /person/nid/:nationalId
router.get('/nid/:nationalId', requireAuth, validatePersonNationalId, validate, getPersonByNationalIdHandler);

// GET /person/driverId/:driverId
router.get('/driverId/:driverId', requireAuth, validateDriverId, validate, getPersonByDriverIdHandler);

// POST /person/new
router.post('/new', requireAuth, upload.single("personalImage"), validateNewPerson, validate, createPersonHandler);

// PUT /person/edit
router.put('/edit/:personId', requireAuth, upload.single("personalImage"), validateEditPerson, validate, editPersonByIdHandler);

// DELETE /person/delete/:personId
router.delete('/delete/:personId', requireAuth, validatePersonId, validate, deletePersonByIdHandler);

export default router;