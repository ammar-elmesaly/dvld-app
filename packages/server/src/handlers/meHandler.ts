import { RequestHandler } from "express";

export const getCurrentUser: RequestHandler = async (req, res) => {
    res.json({
        userId: req.session.userId,
        username: req.session.username
    });
}