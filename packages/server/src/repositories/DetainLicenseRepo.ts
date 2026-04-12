import { AppDataSource } from '../dataSource.js';
import { DetainedLicense } from '../entities/DetainedLicense.js';

export const DetainedLicenseRepo = AppDataSource.getRepository(DetainedLicense);