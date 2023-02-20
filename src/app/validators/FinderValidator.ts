import { check } from "express-validator";
import { isString } from "util";

const createValidator = [
  check("keyword")
    .exists({ checkNull: true, checkFalsy: true })
    .isString(),
  check("low_price")
    .exists({ checkNull: true, checkFalsy: true })
    .isNumeric()
    .trim()
    .escape(),
  check("high_price")
    .exists({ checkNull: true, checkFalsy: true })
    .isNumeric()
    .trim()
    .escape(),
 
  check("to_date")
    .exists({ checkNull: true, checkFalsy: true })
    .trim()
    .escape(),
];
export { createValidator };
