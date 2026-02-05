import { RequestHandler } from "express";
import { getAllLicenseClasses, getLicenseClassByName } from "../services/licenseClassService";

export const getAllLicenseClassesHandler: RequestHandler = async (_req, res) => {
    const countries = await getAllLicenseClasses();

    res.json(countries);
}

export const getLicenseClassByNameHandler: RequestHandler = async (req, res) => {
    const { systemName } = req.params;

    const licenseClass = await getLicenseClassByName(systemName!);

    res.json(licenseClass);
}