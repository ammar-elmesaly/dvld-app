import { RequestHandler } from "express";

export const requireAuth: RequestHandler = (req, res, next) => {    
    if (!req.session.userId) {
        res.status(401).end();
        return;
    }
    next();
};

