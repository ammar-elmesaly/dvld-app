import { RequestHandler } from "express";
import * as intLicenseService from "../services/internationalLicenseService";
import { AppError } from "../types/errors";
import { toInternationalLicenseDTO, toInternationalLicenseWithPersonDTO } from "../mappers/internationalLicenseMapper";

export const issueNewLicenseHandler: RequestHandler = async (req, res) => {
    const {
        createdByUserId,
        personId,
        notes
    } = req.body;
    
    const newLicenseId = await intLicenseService.issueLicense(createdByUserId, personId, notes);

    res.status(201).json(newLicenseId);
}

export const getLicenseByIdHandler: RequestHandler = async (req, res) => {
    const { include } = req.query;
    const { intLicenseId } = req.params;

    if (include === "person") {
        const license = await intLicenseService.getLicenseWithPersonById(Number(intLicenseId));
        if (!license)
            throw new AppError('International license not found.', 404);

        res.json(toInternationalLicenseWithPersonDTO(license));
    
    } else {
        const license = await intLicenseService.getLicenseById(Number(intLicenseId));
        if (!license)
            throw new AppError('International license not found.', 404);
    
        res.json(toInternationalLicenseDTO(license));
    }
}