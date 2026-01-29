import { RequestHandler } from "express";
import * as licenseService from "../services/licenseService";

export const issueNewLicenseHandler: RequestHandler = async (req, res) => {
    const {
        createdByUserId,
        personId,
        licenseClassId,
        applicationId,
        notes
    } = req.body;
    
    const newLicenseId = await licenseService.issueLicense(createdByUserId, personId, licenseClassId, applicationId, notes);

    res.status(201).json(newLicenseId);
}