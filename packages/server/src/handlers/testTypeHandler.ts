import { RequestHandler } from "express";
import * as testTypeService from '../services/testTypeService.js';
import { TestTypeSystemName } from '@dvld/shared';

export const getAllTestTypesHandler: RequestHandler = async (_req, res) => {
    const testType = await testTypeService.getAllTestTypes();

    res.json(testType);
}

export const getTestTypeByIdHandler: RequestHandler = async (req, res) => {
    const { testTypeId } = req.params;

    const testType = await testTypeService.getTestTypeById(Number(testTypeId));
    
    res.json(testType);
}

export const getTestTypeByNameHandler: RequestHandler = async (req, res) => {
    const { systemName } = req.params;

    const testType = await testTypeService.getTestTypeByName(systemName as TestTypeSystemName);
    
    res.json(testType);
}

export const editTestTypeByIdHandler: RequestHandler = async (req, res) => {
    const { testTypeId } = req.params;

    const { typeName, typeDescription, typeFees } = req.body;

    const updatedTestTypeId = await testTypeService.editTestTypeById(testTypeId as unknown as number, typeName, typeDescription, typeFees);

    res.json(updatedTestTypeId);
}