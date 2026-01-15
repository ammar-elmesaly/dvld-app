import { AppError } from "../types/errors";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        console.log(err);
        return res.status(err.code).json({
            status: 'failed',
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        status: 'failed',
        message: 'Internal server error'
    });
};