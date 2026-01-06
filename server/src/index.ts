import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
// import allRouters from './routes';
import { AppDataSource } from './dataSource';


const app = express();
const PORT = process.env.DB_PORT || '8080';

app.use(express.json());
// app.use(allRouters);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

AppDataSource.initialize()
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
