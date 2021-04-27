import { body, param } from "express-validator";

export const createOrUpdateSubCatValArr = [
  body("name").trim().notEmpty().withMessage("Sub category name is required"),
];

export const catParamCheckArr = [
  param("parentCategory")
    .exists()
    .withMessage("Query parameter 'parent category' must be provided"),
];

export const subCatParamCheckArr = [
  param("slug").exists().withMessage("Query parameter 'slug' must be provided"),
];
