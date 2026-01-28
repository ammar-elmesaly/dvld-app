import { AppDataSource } from "../dataSource";
import { Test } from "../entities/Test";

export const TestRepo = AppDataSource.getRepository(Test);