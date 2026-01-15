import { RequestHandler } from "express";
import * as personService from "../services/personService";
import { toPersonDTO } from "../mappers/personMapper";
import { AppError } from "../types/errors";

export const getAllPersonsHandler: RequestHandler = async (_req, res) => {
    const persons = await personService.getAllPersons();
    const personsMapped = persons.map(person => toPersonDTO(person));
    res.json(personsMapped);
}

export const getPersonById: RequestHandler = async (req, res) => {
    const { personId } = req.params;

    const person = await personService.getPersonById(personId as unknown as number);

    res.json(toPersonDTO(person));
}

export const getPersonByNationalId: RequestHandler = async (req, res) => {
    const { nationalId } = req.params;

    const person = await personService.getPersonByNationalId(nationalId as string);

    res.json(toPersonDTO(person));
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

    const person = await personService.addNewPerson(
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
        file ? file.filename : undefined
    );

    res.status(201).json(person);
};
