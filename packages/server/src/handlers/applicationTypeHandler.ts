import { RequestHandler } from "express";
import * as applicationTypeService from "../services/applicationTypeService";
import { ApplicationTypeSystemName } from '@dvld/shared';

export const getAllApplicationTypesHandler: RequestHandler = async (_req, res) => {
    const applicationTypes = await applicationTypeService.getAllApplicationTypes();

    res.json(applicationTypes);
}

export const getApplicationTypeByNameHandler: RequestHandler = async (req, res) => {
    const { systemName } = req.params;

    const applicationType = await applicationTypeService.getApplicationTypeByName(systemName as ApplicationTypeSystemName);

    res.json(applicationType);
}

export const editApplicationTypeByIdHandler: RequestHandler = async (req, res) => {
    const { applicationTypeId } = req.params;

    const { typeName, typeFees, defaultValidityLength } = req.body;

    console.log({ applicationTypeId, typeName, typeFees, defaultValidityLength });

    const updateApplicationTypeId = await applicationTypeService.editApplicationTypeById(applicationTypeId as unknown as number, typeName, typeFees, defaultValidityLength);

    res.json(updateApplicationTypeId);
}