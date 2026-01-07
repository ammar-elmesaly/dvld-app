import { DataSource } from "typeorm";

import { Person } from "./entities/Person";
import { User } from "./entities/User";
import { Country } from "./entities/Country";
import { Application } from "./entities/Application";
import { ApplicationType } from "./entities/ApplicationType";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        Person,
        User,
        Country,
        Application,
        ApplicationType
    ]
});