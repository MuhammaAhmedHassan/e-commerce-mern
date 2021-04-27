import { Router } from "express";
// middlewares
import { authCheck } from "../middlewares/auth.middlewares";
import { adminCheck } from "../middlewares/adminCheck.middlewares";
import { validateRequest } from "../middlewares/validateRequest.middlewares";
// Controllers
import {
  uploadImages,
  removeImage,
} from "../controllers/cloudinary.controller";
// Validation Arrays
import {} from "../const/create-category-val-arr";

export const router = Router();

// Create category
router.post(
  "/upload-images",
  authCheck,
  adminCheck,
  // createOrUpdateCatValArr,
  // validateRequest,
  uploadImages
);

router.post("/remove-image", authCheck, adminCheck, removeImage);
