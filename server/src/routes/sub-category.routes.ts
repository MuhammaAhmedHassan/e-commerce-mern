import { Router } from "express";
// middlewares
import { authCheck } from "../middlewares/auth.middlewares";
import { adminCheck } from "../middlewares/adminCheck.middlewares";
import { validateRequest } from "../middlewares/validateRequest.middlewares";
// Controllers
import {
  createSubCategory,
  readSubCategory,
  updateSubCategory,
  deleteSubCategory,
  listSubCategoriesPerPage,
  listAllSubCategories,
} from "../controllers/sub-category.controller";
// Validation Arrays
import {
  createOrUpdateSubCatValArr,
  catParamCheckArr,
  subCatParamCheckArr,
} from "../const/sub-category-val-arr";

export const router = Router();

router.get("/all-sub-categories", listAllSubCategories); // public route

// Create category
router.post(
  "/category/:parentCategory/sub-category",
  authCheck,
  adminCheck,
  catParamCheckArr.concat(createOrUpdateSubCatValArr),
  validateRequest,
  createSubCategory
);

// Read category
router.get(
  "/category/:parentCategory/sub-category/:slug",
  catParamCheckArr,
  validateRequest,
  readSubCategory
);

// Update category
router.put(
  "/category/:parentCategory/sub-category/:slug",
  authCheck,
  adminCheck,
  catParamCheckArr
    .concat(subCatParamCheckArr)
    .concat(createOrUpdateSubCatValArr),
  validateRequest,
  updateSubCategory
);
// Delete category
router.delete(
  "/category/:parentCategory/sub-category/:slug",
  authCheck,
  adminCheck,
  catParamCheckArr.concat(subCatParamCheckArr),
  validateRequest,
  deleteSubCategory
);
