import { RequestHandler } from "express";

export const getCurrentUser: RequestHandler = async (_req, res) => {
    /* res.json({
        userId: req.session.userId,
        username: req.session.username
    }); */

    res.json({
        userId: 1,
        username: "ammar1"
    })
}