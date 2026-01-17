import { RequestHandler } from "express";
import { getAllApplicationTypes } from "../services/applicationTypeService";

export const getAllApplicationTypesHandler: RequestHandler = async (_req, res) => {
    const applicationTypes = await getAllApplicationTypes();

    res.json(applicationTypes);
}