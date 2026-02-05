import { DataSource } from "typeorm";

import { Person } from "./entities/Person";
import { User } from "./entities/User";
import { Country } from "./entities/Country";
import { Application } from "./entities/Application";
import { ApplicationType } from "./entities/ApplicationType";
import { TestType } from "./entities/TestType";
import { LicenseClass } from "./entities/LicenseClass";
import { LocalDrivingLicenseApplication } from "./entities/LocalDrivingLicenseApplication";
import { TestAppointment } from "./entities/TestAppointment";
import { Test } from "./entities/Test";
import { Driver } from "./entities/Driver";
import { License } from "./entities/License";
import { InternationalLicense } from "./entities/InternationalLicense";

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
        ApplicationType,
        TestType,
        LicenseClass,
        License,
        InternationalLicense,
        LocalDrivingLicenseApplication,
        TestAppointment,
        Test,
        Driver
    ]
});