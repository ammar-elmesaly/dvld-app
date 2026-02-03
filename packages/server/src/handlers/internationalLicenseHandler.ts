import { RequestHandler } from "express";
import * as intLicenseService from "../services/internationalLicenseService";
import { AppError } from "../types/errors";
import { toInternationalLicenseDTO, toInternationalLicenseWithPersonDTO } from "../mappers/internationalLicenseMapper";

export const issueNewLicenseHandler: RequestHandler = async (req, res) => {
    const {
        createdByUserId,
        licenseId,
        notes
    } = req.body;
    
    const newLicenseId = await intLicenseService.issueLicense(createdByUserId, licenseId, notes);

    res.status(201).json(newLicenseId);
}

export const getLicenseByIdHandler: RequestHandler = async (req, res) => {
    const { include } = req.query;
    const { intLicenseId } = req.params;

    if (include === "person") {
        const license = await intLicenseService.getInternationalLicenseWithPersonById(Number(intLicenseId));
        if (!license)
            throw new AppError('International license not found.', 404);

        res.json(toInternationalLicenseWithPersonDTO(license));
    
    } else {
        const license = await intLicenseService.getInternationalLicenseById(Number(intLicenseId));
        if (!license)
            throw new AppError('International license not found.', 404);
    
        res.json(toInternationalLicenseDTO(license));
    }
}

export const getAllInternationalLicensesWithDriverIdHandler: RequestHandler = async (req, res) => {
    const { driverId } = req.params;

    const intLicenses = await intLicenseService.getAllInternationalLicensesWithDriverId(Number(driverId));
    const intLicensesMapped = intLicenses.map(intLic => toInternationalLicenseDTO(intLic));

    res.json(intLicensesMapped);
}