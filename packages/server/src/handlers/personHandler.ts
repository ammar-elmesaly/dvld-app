import { RequestHandler } from "express";
import * as personService from '../services/personService.js';
import { toPersonDTO } from '../mappers/personMapper.js';
import { AppError } from '../types/errors.js';

export const getAllPersonsHandler: RequestHandler = async (_req, res) => {
    const persons = await personService.getAllPersons();
    const personsMapped = persons.map(person => toPersonDTO(person));
    res.json(personsMapped);
}

export const getPersonByIdHandler: RequestHandler = async (req, res) => {
    const { personId } = req.params;

    const person = await personService.getPersonById(personId as unknown as number);

    res.json(toPersonDTO(person));
}

export const getPersonByDriverIdHandler: RequestHandler = async (req, res) => {
    const { driverId } = req.params;

    const person = await personService.getPersonByDriverId(driverId as unknown as number);

    res.json(toPersonDTO(person));
}

export const getPersonByNationalIdHandler: RequestHandler = async (req, res) => {
    const { nationalId } = req.params;

    const person = await personService.getPersonByNationalId(nationalId as string);

    res.json(toPersonDTO(person));
}

export const editPersonByIdHandler: RequestHandler = async (req, res) => {
    const file = req.file;

    if (file && !file.mimetype.startsWith('image/'))
        throw new AppError('Invalid image type', 400);
    
    const { personId } = req.params;

    const {
        firstName,
        secondName,
        thirdName,
        lastName,
        nationalId,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        nationalCountryId,
    } = req.body;

    const updatedPersonId = await personService.editPersonById(
        personId as unknown as number,
        firstName,
        secondName,
        thirdName,
        lastName,
        nationalId,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email === '' ? null : email,
        nationalCountryId,
        file ? file.filename : undefined
    );

    res.json(updatedPersonId);
}

export const createPersonHandler: RequestHandler = async (req, res) => {
    const file = req.file;

    if (file && !file.mimetype.startsWith('image/'))
        throw new AppError('Invalid image type', 400);

    const {
        firstName,
        secondName,
        thirdName,
        lastName,
        nationalId,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        nationalCountryId,
    } = req.body;

    const personId = await personService.addNewPerson(
        firstName,
        secondName,
        thirdName,
        lastName,
        nationalId,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email === '' ? null : email,
        nationalCountryId,
        file ? file.filename : undefined
    );

    res.status(201).json(personId);
};

export const deletePersonByIdHandler: RequestHandler = async (req, res) => {
    const { personId } = req.params;

    const deletedPersonId = await personService.deletePersonById(personId as unknown as number);

    res.json(deletedPersonId);
}