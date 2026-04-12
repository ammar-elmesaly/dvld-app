import { RequestHandler } from "express";
import { Driver } from '../entities/Driver.js';
import { toDriverDTO } from '../mappers/driverMapper.js';

export const getAllDriversHandler: RequestHandler = async (_req, res) => {
    const drivers = await Driver.find({ relations: {
        person: true
    }});

    const driversMapped = drivers.map(d => toDriverDTO(d));

    res.json(driversMapped);
}