import { AppDataSource } from '../dataSource.js';
import { Person } from '../entities/Person.js';

export const PersonRepo = AppDataSource.getRepository(Person);