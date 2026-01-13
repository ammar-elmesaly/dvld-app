import { param } from "express-validator";

export const validatePersonId = [
    param('personId')
        .isNumeric()
        .withMessage('Please enter a valid personId')
]