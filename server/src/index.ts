import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import allRouters from './routes';
import { AppDataSource } from './dataSource';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || '3000';

// Allow CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173', // frontend
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.json());
app.use(allRouters);

const main = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Init DB');

        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    
    } catch (err) {
        console.error(err);
        process.exit(-1);
    }
}

main();