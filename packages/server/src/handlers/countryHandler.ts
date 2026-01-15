import { RequestHandler } from "express";
import { Country } from "../entities/Country";

export const getAllCountriesHandler: RequestHandler = async (_req, res) => {
    const countries = await Country.find();

    res.json(countries);
}