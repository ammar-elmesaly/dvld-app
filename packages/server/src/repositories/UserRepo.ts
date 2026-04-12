import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

export const UserRepo = AppDataSource.getRepository(User);