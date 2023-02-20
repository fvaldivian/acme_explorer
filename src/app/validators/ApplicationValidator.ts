import {check} from "express-validator";

const createValidator = [
    check("create_date")
        .optional()
        .isDate()
        .trim()
        .escape(),
    check("status")
        .optional()
        .default("PENDING")
        .isString()
        .trim()
        .isIn(["PENDING", "REJECTED", "CANCELLED", "ACCEPTED", "DUE"]),
    check("comments")
        .exists({checkNull: true, checkFalsy: true})
        .isString()
        .trim()
        .escape(),
    check("denied")
        .isBoolean()
        .escape(),
    check("reason")
        .optional()
        .isString()
        .trim()
        .escape(),
    check("isPaid")
        .optional()
        .default('0')
        .isBoolean()
        .escape(),
];

export {createValidator};