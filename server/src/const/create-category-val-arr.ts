import { body, param } from "express-validator";

export const createOrUpdateCatValArr = [
  body("name").trim().notEmpty().withMessage("Category name is required"),
];

export const catParamCheckArr = [
  param("slug").exists().withMessage("Query parameter 'slug' must be provided"),
];
