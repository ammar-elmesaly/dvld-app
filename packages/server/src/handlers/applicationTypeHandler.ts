import { RequestHandler } from "express";
import { getAllApplicationTypes, getApplicationTypeByName } from "../services/applicationTypeService";

export const getAllApplicationTypesHandler: RequestHandler = async (_req, res) => {
    const applicationTypes = await getAllApplicationTypes();

    res.json(applicationTypes);
}

export const getApplicationTypeByNameHandler: RequestHandler = async (req, res) => {
    const { systemName } = req.params;

    const applicationType = await getApplicationTypeByName(systemName!);

    res.json(applicationType);
}