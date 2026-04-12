import { AppDataSource } from '../dataSource.js';
import { License } from '../entities/License.js';

export const LicenseRepo = AppDataSource.getRepository(License);