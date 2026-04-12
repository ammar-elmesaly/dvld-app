import { DataSource } from "typeorm";

import { Person } from './entities/Person.js';
import { User } from './entities/User.js';
import { Country } from './entities/Country.js';
import { Application } from './entities/Application.js';
import { ApplicationType } from './entities/ApplicationType.js';
import { TestType } from './entities/TestType.js';
import { LicenseClass } from './entities/LicenseClass.js';
import { LocalDrivingLicenseApplication } from './entities/LocalDrivingLicenseApplication.js';
import { TestAppointment } from './entities/TestAppointment.js';
import { Test } from './entities/Test.js';
import { Driver } from './entities/Driver.js';
import { License } from './entities/License.js';
import { InternationalLicense } from './entities/InternationalLicense.js';
import { DetainedLicense } from './entities/DetainedLicense.js';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production',
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
        DetainedLicense,
        TestAppointment,
        Test,
        Driver
    ]
});