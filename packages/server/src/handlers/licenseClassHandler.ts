import { RequestHandler } from "express";
import { getAllLicenseClasses } from "../services/licenseClassService";

export const getAllLicenseClassesHandler: RequestHandler = async (_req, res) => {
    const countries = await getAllLicenseClasses();

    res.json(countries);
}