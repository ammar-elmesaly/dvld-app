import { AppDataSource } from "../dataSource";
import { Application } from "../entities/Application";

export const ApplicationRepo = AppDataSource.getRepository(Application).extend({
    
});