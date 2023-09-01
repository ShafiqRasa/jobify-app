import mongoose from "mongoose";
import {
  GENDER,
  JOB_STATUS,
  JOB_TIME,
  JOB_TYPE,
} from "../utils/constants/constants.utils.js";

const JobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      minLength: 3,
      maxlength: 20,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    jobRequirements: {
      type: String,
      maxlength: 500,
    },
    jobDescription: {
      type: String,
      maxlength: 500,
    },
    gender: {
      type: String,
      enumb: Object.values(GENDER),
      default: GENDER.ALL,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TIME),
      default: JOB_TIME.FULL_TIME,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobTime: {
      type: String,
      enum: Object.values(JOB_TIME),
      default: JOB_TIME.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
