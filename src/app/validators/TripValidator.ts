import { check } from "express-validator";

const createValidator = [
  check("title")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .trim()
    .escape(),
  check("description")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .trim()
    .escape(),
  check("list_of_requirements")
    .optional()
    .isArray()
    .trim()
    .escape(),
  check("reason")
    .optional()
    .isString()
    .trim()
    .escape()
];
export { createValidator };
