import { check } from "express-validator";

const createValidator = [
  check("cache_time")
    .exists({ checkNull: true, checkFalsy: true })
    .isNumeric(),
  check("dashboard_time")
    .exists({ checkNull: true, checkFalsy: true })
    .isNumeric()
    .trim()
    .escape(),
  check("search_result")
    .exists({ checkNull: true, checkFalsy: true })
    .isNumeric()
    .trim()
    .escape(),
  check("sponsorship_price")
    .exists({ checkNull: true, checkFalsy: true })
    .isNumeric()
    .trim()
    .escape(),
];
export { createValidator };
