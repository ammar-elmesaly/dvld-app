import { RequestHandler } from "express";
import * as personService from "../services/personService";

export const getAllPersonsHandler: RequestHandler = async (_req, res) => {
    const persons = await personService.getAllPersons();
    res.json(persons);
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
