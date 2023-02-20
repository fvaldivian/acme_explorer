import { check } from "express-validator";

const createValidator = [
  check("status")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .isIn(['PENDING', 'REJECTED', 'CANCELLED', 'ACCEPTED', 'DUE']),
  check("comments")
    .optional()
    .isString()
    .trim()
    .escape(),
  check("reason")
    .optional()
    .isString()
    .trim()
    .escape(),
];
export { createValidator };
