import { RequestHandler } from "express";
import * as licenseService from "../services/licenseService";

export const issueNewLicenseHandler: RequestHandler = async (_req, res) => {
    const newLicenseId = await licenseService.issueLicense();

    res.status(201).json(newLicenseId);
}