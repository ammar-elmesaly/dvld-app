import { RequestHandler } from "express";
import { getUserByName } from "../services/userService";
import { compare } from "../utils/hashUtil";
import { AppError } from "../types/errors";

export const loginHandler: RequestHandler = async (req, res, next) => {
    const { username, password, rememberMe } = req.body;

    if (rememberMe)
        console.log('Yes I will remember you dear :)');
    
    const user = await getUserByName(username);

    if (!user)
        throw new AppError('Invalid Credentials', 400);

    const ok = await compare(password, user.password);

    if (!ok)
        throw new AppError('Invalid Credentials', 400);
    
    req.session.regenerate(err => {
        if (err) return next(err);

        req.session.userId = user.id;
        req.session.username = user.username;

        res.status(200).json({
            userId: user.id,
            username: user.username,
        });
    });

}