import { AppDataSource } from "../dataSource";
import { DetainedLicense } from "../entities/DetainedLicense";

export const DetainedLicenseRepo = AppDataSource.getRepository(DetainedLicense);