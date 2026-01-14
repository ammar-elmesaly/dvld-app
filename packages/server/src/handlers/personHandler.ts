import { RequestHandler } from "express";
import * as personService from "../services/personService";
import { toPersonDTO } from "../mappers/personMapper";

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
        personalPhoto
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
        personalPhoto
    );

    res.status(201).json(person);
};
