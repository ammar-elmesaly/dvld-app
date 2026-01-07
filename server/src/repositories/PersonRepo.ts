import { AppDataSource } from "../dataSource";
import { Person } from "../entities/Person";

export const PersonRepo = AppDataSource.getRepository(Person);