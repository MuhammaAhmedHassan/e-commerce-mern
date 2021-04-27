import { Router } from "express";
// Middlewares
import { authCheck } from "../middlewares/auth.middlewares";
import { adminCheck } from "../middlewares/adminCheck.middlewares";
// Controllers
import {
  createOrUpdateUser,
  getCurrentUser,
} from "../controllers/auth.controller";

export const router = Router();

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.get("/current-user", authCheck, getCurrentUser);
router.get("/admin-user", authCheck, adminCheck, getCurrentUser);

// export default { router };
