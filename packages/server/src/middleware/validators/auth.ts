import { RequestHandler } from "express";

export const requireAuth: RequestHandler = (_req, _res, next) => {    
    // if (!req.session.userId) {
    //     // res.status(401).end();
    //     // return;
    // }
    next();
};

