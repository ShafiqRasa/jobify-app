import express from "express";
const router = express.Router();
import {
  validateLogin,
  validateRegisterInput,
} from "../middleware/validation.middleware.js";

import { register, login, logout } from "../controllers/authController.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
