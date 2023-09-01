import express from "express";
const router = express.Router();

import {
  getCurrentUser,
  applicationStatus,
  updateUser,
} from "../controllers/userController.js";

import { validateUpdateUser } from "../middleware/validation.middleware.js";
import { authorizePermissions } from "../middleware/auth.middleware.js";

import upload from "../middleware/multer.middleware.js";

router.get("/current-user", getCurrentUser);
router.get("/admin/app-status", [
  authorizePermissions("admin"),
  applicationStatus,
]);

router.patch("/update-user", upload.single("profile"), (req, res) => {
  console.log(req.file);
  res.json({ msg: "success" });
});

export default router;
