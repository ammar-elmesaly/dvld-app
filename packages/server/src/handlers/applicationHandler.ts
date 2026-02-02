import { RequestHandler } from "express";
import * as applicationService from "../services/applicationService";
import { toLocalDrivingLicenseApplicationDTO } from "../mappers/localDrivingLicenseMapper";
import { getApplicationTypeByName } from "../services/applicationTypeService";

export const getAllApplicationsHandler: RequestHandler = async (_req, res) => {
    const applications = await applicationService.getAllApplications();

    res.json(applications);
}

export const getLocalDrivingLicenseApplicationsHandler: RequestHandler = async (_req, res) => {
    const applications = await applicationService.getAllLocalDrivingLicenseApplications();

    const retakeTestApplication = await getApplicationTypeByName('RETAKE_TEST_SERVICE');
    const applicationsMapped = applications.map(app => toLocalDrivingLicenseApplicationDTO(app, retakeTestApplication?.type_fees));
    res.json(applicationsMapped);
}

export const newApplicationHandler: RequestHandler = async (req, res) => {
    const {
        personId,
        applicationTypeId,
        createdByUserId
    } = req.body;

    const applicationId = await applicationService.newApplication(personId, applicationTypeId, createdByUserId);

    res.status(201).json(applicationId);
}

export const newLocalDrivingLicenseHandler: RequestHandler = async (req, res) => {
    const {
        personId,
        licenseClassId,
        createdByUserId
    } = req.body;

    const localDrivingLicenseApplicationId = await applicationService.newLocalDrivingLicenseApp(licenseClassId, personId, createdByUserId);

    res.status(201).json(localDrivingLicenseApplicationId);
}