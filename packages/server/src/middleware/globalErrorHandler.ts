import { QueryFailedError } from "typeorm";
import { AppError } from '../types/errors.js';
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.code).json({
            status: 'failed',
            msg: err.message
        });
    }
    
    if (err instanceof QueryFailedError) {
        const driverError = err.driverError;

        // 23505 is the standard postgres code for unique violation
        if (driverError.code === '23505') {
            const constraint = driverError.constraint;
            const detail = driverError.detail;        

            return res.status(400).json({
                status: 'failed',
                msg: `Duplicate entry detected: ${constraint}`,
                detail: detail 
            });
        }

        // Handle other DB errors (Foreign key violations, etc.)
        return res.status(500).json({
            status: 'error',
            msg: 'Database operation failed'
        });
    }

    console.error(err);

    return res.status(500).json({
        status: 'failed',
        message: 'Internal server error'
    });
};