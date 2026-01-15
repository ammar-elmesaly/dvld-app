import { AppDataSource } from "../dataSource";
import { User } from "../entities/User";

export const UserRepo = AppDataSource.getRepository(User);