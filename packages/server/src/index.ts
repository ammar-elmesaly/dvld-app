import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import allRouters from './routes';
import { AppDataSource } from './dataSource';
import cors from 'cors';
import { errorHandler } from './middleware/globalErrorHandler';
import path from 'path';
import { AppError } from './types/errors';

declare module 'express-session' {
    interface SessionData {
        username: string;
        userId: number;
    }
}

const app = express();
const PORT = process.env.PORT || '3000';

if (!process.env.SESSION_SECRET)
    throw new AppError('No SESSION_SECRET provided in .env', 500);

app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    }
}));

// Allow CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173', // frontend
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.json());

app.use(
    '/uploads',
    express.static(path.join(__dirname, '..', 'uploads'))
);


app.use(allRouters);

app.use(errorHandler);

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