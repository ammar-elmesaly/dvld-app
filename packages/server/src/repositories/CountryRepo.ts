import { AppDataSource } from '../dataSource.js';
import { Country } from '../entities/Country.js';

export const CountryRepo = AppDataSource.getRepository(Country);