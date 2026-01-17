import { RequestHandler } from "express";
import { getAllTestTypes } from '../services/testTypeService';

export const getAllTestTypesHandler: RequestHandler = async (_req, res) => {
    const testType = await getAllTestTypes();

    res.json(testType);
}