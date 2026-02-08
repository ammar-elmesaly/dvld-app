import { RequestHandler } from "express";
import { Driver } from "../entities/Driver";
import { toDriverDTO } from "../mappers/driverMapper";

export const getAllDriversHandler: RequestHandler = async (_req, res) => {
    const drivers = await Driver.find({ relations: {
        person: true
    }});

    const driversMapped = drivers.map(d => toDriverDTO(d));

    res.json(driversMapped);
}