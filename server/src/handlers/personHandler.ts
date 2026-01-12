import { RequestHandler } from "express";

import * as personService from "../services/personService";
import { AppError } from "../types/errors";

export const getAllPersonsHandler: RequestHandler = async (_req, res) => {
    const persons = await personService.getAllPersons();
    res.json(persons);
}

export const getPersonById: RequestHandler = async (req, res) => {
    const { personId } = req.params;
    const person = await personService.getPersonById(personId as unknown as number);
    
    if (!person)
        throw new AppError("Person not found", 404);

    res.json(person);
}

export const createPersonHandler: RequestHandler = async (req, res) => {
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
        personalPhotoPath
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
        personalPhotoPath
    );

    res.status(201).json(person);
};
