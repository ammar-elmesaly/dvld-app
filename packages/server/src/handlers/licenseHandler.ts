import { RequestHandler } from "express";
import * as licenseService from "../services/licenseService";
import { toLicenseDTO, toLicenseWithPersonDTO } from "../mappers/licenseMapper";
import { AppError } from "../types/errors";

export const issueLicenseFirstTimeHandler: RequestHandler = async (req, res) => {
    const {
        createdByUserId,
        personId,
        licenseClassId,
        localDrivingLicenseApplicationId,
        notes
    } = req.body;
    
    const newLicenseId = await licenseService.issueLicenseFirstTime(
        createdByUserId,
        personId,
        licenseClassId,
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