import { RequestHandler } from "express";
import * as licenseService from "../services/licenseService";
import * as detainService from "../services/detainLicenseService";

import { toLicenseDTO, toLicenseWithPersonDTO } from "../mappers/licenseMapper";
import { AppError } from "../types/errors";
import { toDetainedLicenseDTO } from "../mappers/detainedLicenseMapper";

export const issueLicenseFirstTimeHandler: RequestHandler = async (req, res) => {
    const {
        createdByUserId,
        localDrivingLicenseApplicationId,
        notes
    } = req.body;
    
    const newLicenseId = await licenseService.issueLicenseFirstTime(
        createdByUserId,
        localDrivingLicenseApplicationId,
        notes
    );

    res.status(201).json(newLicenseId);
}

export const renewLicenseHandler: RequestHandler = async (req, res) => {
    const { createdByUserId, licenseId, notes } = req.body;

    const newLicenseId = await licenseService.renewLicense(createdByUserId, licenseId, notes);

    res.status(201).json(newLicenseId)
}

export const replaceLicenseHandler: RequestHandler = async (req, res) => {
    const { createdByUserId, licenseId, replacementType, notes } = req.body;

    const newLicenseId = await licenseService.replaceLicense(
        createdByUserId,
        licenseId,
        replacementType,
        notes
    );

    res.status(201).json(newLicenseId);
}

export const detainLicenseHandler: RequestHandler = async (req, res) => {
    const { licenseId, fineFees, createdByUserId } = req.body;

    const detainedLicenseId = await detainService.detainLicense(licenseId, createdByUserId, fineFees);

    res.json(detainedLicenseId);
}

export const releaseLicenseHandler: RequestHandler = async (req, res) => {
    const { licenseId, releasedByUserId } = req.body;

    const releasedLicenseId = await detainService.releaseLicense(licenseId, releasedByUserId);

    res.json(releasedLicenseId);
}

export const getDetainedLicenseWithLicenseIdHandler: RequestHandler = async (req, res) => {
    const { licenseId } = req.params;

    const detainedLicense = await detainService.getDetainedLicenseWithLicenseId(Number(licenseId));

    res.json(toDetainedLicenseDTO(detainedLicense));
}

export const getAllDetainedLicensesHandler: RequestHandler = async (_req, res) => {
    const detainedLicenses = await detainService.getAllDetainedLicenses();
    const detainedLicensesMapped = detainedLicenses.map(d => toDetainedLicenseDTO(d));
    
    res.json(detainedLicensesMapped);
}

export const getLicenseByIdHandler: RequestHandler = async (req, res) => {
    const { include } = req.query;
    const { licenseId } = req.params;

    if (include === "person") {
        const license = await licenseService.getLicenseWithPersonById(Number(licenseId));
        if (!license)
            throw new AppError('License not found.', 404);

        res.json(toLicenseWithPersonDTO(license));
    
    } else {
        const license = await licenseService.getLicenseById(Number(licenseId));
        if (!license)
            throw new AppError('License not found.', 404);
    
        res.json(toLicenseDTO(license));
    }
}

export const getAllLicensesByDriverIdHandler: RequestHandler = async (req, res) => {
    const { driverId } = req.params;

    const licenses = await licenseService.getAllLicensesByDriverId(Number(driverId));
    const licensesMapped = licenses.map(lic => toLicenseDTO(lic));

    res.json(licensesMapped);
}