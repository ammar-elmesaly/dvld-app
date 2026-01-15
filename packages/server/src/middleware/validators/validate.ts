import { RequestHandler } from "express";
import { validationResult } from "express-validator";

const validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({
            msg: errors.array()[0]!.msg
        });
    }
    next();
};

export default validate;