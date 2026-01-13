import { AppDataSource } from "../dataSource";
import { Country } from "../entities/Country";

export const CountryRepo = AppDataSource.getRepository(Country);