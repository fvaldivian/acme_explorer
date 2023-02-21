import {check} from "express-validator";

const createValidator = [
    check("banner")
        .optional()
        .isString()
        .trim()
        .escape(),
    check("payed")
        .optional()
        .default("false")
        .isBoolean(),
];

export {createValidator};