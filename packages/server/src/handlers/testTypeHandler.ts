import { RequestHandler } from "express";
import * as testTypeService from '../services/testTypeService';

export const getAllTestTypesHandler: RequestHandler = async (_req, res) => {
    const testType = await testTypeService.getAllTestTypes();

    res.json(testType);
}

export const getTestTypeById: RequestHandler = async (req, res) => {
    const { testTypeId } = req.params;

    const testType = await testTypeService.getTestTypeById(Number(testTypeId));
    
    res.json(testType);
}

export const getTestTypeByName: RequestHandler = async (req, res) => {
    const { systemName } = req.params;

    const testType = await testTypeService.getTestTypeByName(systemName!);
    
    res.json(testType);
}