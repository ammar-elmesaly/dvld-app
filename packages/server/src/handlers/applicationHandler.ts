import { RequestHandler } from "express";
import * as applicationService from "../services/applicationService";
import { toLocalDrivingLicenseApplicationDTO } from "../mappers/localDrivingLicenseMapper";

export const getAllApplicationsHandler: RequestHandler = async (_req, res) => {
    const applications = await applicationService.getAllApplications();

    res.json(applications);
}

export const getLocalDrivingLicenseApplicationsHandler: RequestHandler = async (_req, res) => {
    const applications = await applicationService.getAllLocalDrivingLicenseApplications();

    const applicationsMapped = applications.map(app => toLocalDrivingLicenseApplicationDTO(app));
    res.json(applicationsMapped);
}

export const newApplicationHandler: RequestHandler = async (req, res) => {
    const {
        personId,
        applicationTypeId,
        createdByUserId
    } = req.body;

    const application = await applicationService.newApplication(personId, applicationTypeId, createdByUserId);

    res.json(application);
}

export const newLocalDrivingLicenseHandler: RequestHandler = async (req, res) => {
    const {
        personId,
        licenseClassId,
        createdByUserId
    } = req.body;

    const localDrivingLicenseApplication = await applicationService.newLocalDrivingLicenseApp(licenseClassId, personId, createdByUserId);

    res.status(201).json(localDrivingLicenseApplication);
}