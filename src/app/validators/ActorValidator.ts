import { check } from "express-validator";

const createValidator = [
  check("name")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .trim()
    .escape(),
  check("surname")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .trim()
    .escape(),
  check("email")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .isEmail()
    .trim()
    .escape(),
  check("password")
    .isString()
    .isStrongPassword({ minLength: 5 }),
  check("phone_number")
    .optional()
    .isNumeric()
    .trim()
    .escape(),
  check("address")
    .optional()
    .isString()
    .trim()
    .escape(),
  check("role")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .isIn(["EXPLORER", "MANAGER", "ADMINISTRATOR", "SPONSOR"]),
];

export { createValidator };
