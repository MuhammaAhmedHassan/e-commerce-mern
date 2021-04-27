import { Router } from "express";
// middlewares
import { authCheck } from "../middlewares/auth.middlewares";
import { adminCheck } from "../middlewares/adminCheck.middlewares";
import { validateRequest } from "../middlewares/validateRequest.middlewares";
// Controllers
import {
  createProduct,
  readProducts,
  deleteProduct,
  updateProduct,
  updatedProductRating,
} from "../controllers/product.controller";
// Validation Arrays
import {
  createOrUpdateProductValArr,
  productIdParamCheckArr,
  updateProductValArr,
} from "../const/product-val-arr";
import {
  uploadImages,
  updateProductRemoveImages,
} from "../middlewares/cloudinary.middlewares";

export const router = Router();

// Create category
router.post(
  "/product",
  authCheck,
  adminCheck,
  createOrUpdateProductValArr,
  validateRequest,
  uploadImages,
  createProduct
);

// Read Products per page
router.get("/product", readProducts);

// Delete product
router.delete("/product/:id", authCheck, adminCheck, deleteProduct);

// update product
router.put(
  "/product/:id",
  authCheck,
  adminCheck,
  productIdParamCheckArr.concat(updateProductValArr),
  validateRequest,
  updateProductRemoveImages,
  uploadImages,
  updateProduct
);

// edit rating
router.put("/product/star/:productId", authCheck, updatedProductRating);

// 1. remove images and removedImages: string[]
// 2. upload images and images: string[]
// 3. update the values of the product
