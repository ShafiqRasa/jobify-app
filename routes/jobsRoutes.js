import express from "express";
const router = express.Router();
import {
  validateJobIdParam,
  validateJob,
} from "../middleware/validation.middleware.js";

import {
  createJob,
  getAllJob,
  showStatus,
  updateJob,
  deleteJob,
  getSingleJob,
} from "../controllers/jobsController.js";

router.route("/").post(validateJob, createJob).get(getAllJob);
router.route("/stats").get(showStatus);
router
  .route("/:id")
  .delete(validateJobIdParam, deleteJob)
  .patch(validateJobIdParam, validateJob, updateJob)
  .get(validateJobIdParam, getSingleJob);

export default router;
