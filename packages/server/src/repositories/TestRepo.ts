import { AppDataSource } from '../dataSource.js';
import { Test } from '../entities/Test.js';

export const TestRepo = AppDataSource.getRepository(Test);