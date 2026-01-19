import { RequestHandler } from "express";

export const logoutHandler: RequestHandler = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sid');
        res.sendStatus(204);
    });
};
