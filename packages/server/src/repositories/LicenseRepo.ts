import { AppDataSource } from "../dataSource";
import { License } from "../entities/License";

export const LicenseRepo = AppDataSource.getRepository(License);