import { Router } from "express";
// middlewares
import { authCheck } from "../middlewares/auth.middlewares";
import { adminCheck } from "../middlewares/adminCheck.middlewares";
import { validateRequest } from "../middlewares/validateRequest.middlewares";
// Controllers
import {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  listCategoriesPerPage,
  listAllCategories,
  readRelatedProducts,
} from "../controllers/category.controller";
// Validation Arrays
import {
  createOrUpdateCatValArr,
  catParamCheckArr,
} from "../const/create-category-val-arr";

export const router = Router();

router.get("/all-categories", listAllCategories); // public route

// Create category
router.post(
  "/category",
  authCheck,
  adminCheck,
  createOrUpdateCatValArr,
  validateRequest,
  createCategory
);
// Read category
router.get("/category/:slug", readCategory);
// Read related products
router.get("/category/:categoryId/related-products", readRelatedProducts);
// Update category
router.put(
  "/category/:slug",
  authCheck,
  adminCheck,
  createOrUpdateCatValArr.concat(catParamCheckArr),
  validateRequest,
  updateCategory
);
// Delete category
router.delete(
  "/category/:slug",
  authCheck,
  adminCheck,
  catParamCheckArr,
  validateRequest,
  deleteCategory
);
