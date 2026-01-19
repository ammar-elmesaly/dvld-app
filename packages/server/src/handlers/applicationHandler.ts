import { RequestHandler } from "express";
import * as applicationService from "../services/applicationService";

export const getAllApplicationsHandler: RequestHandler = async (_req, res) => {
    const applications = await applicationService.getAllApplications();

    res.json(applications);
}