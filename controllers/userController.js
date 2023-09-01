import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { CustomeAPIError } from "../middleware/custome-api-error.middleware.js";
import { JOB_STATUS } from "../utils/constants/constants.utils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

export const applicationStatus = async (req, res) => {
  try {
    const numberOfUsers = await User.countDocuments();
    const numberOfJobs = await Job.countDocuments();
    const interview = await Job.countDocuments({
      jobStatus: JOB_STATUS.INTERVIEW,
    });
    const pending = await Job.countDocuments({
      jobStatus: JOB_STATUS.PENDING,
    });
    const declined = await Job.countDocuments({
      jobStatus: JOB_STATUS.DECLINED,
    });
    res.status(StatusCodes.OK).json({
      data: {
        numberOfUsers,
        numberOfJobs,
        interview,
        pending,
        declined,
      },
    });
  } catch (error) {
    throw new CustomeAPIError("data not found", StatusCodes.NOT_FOUND);
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("upload file", req.file);
    const obj = { ...req.body };
    delete obj.password;
    console.log("request update user", obj);
    // const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
    res.status(StatusCodes.OK).json({ msg: "user updated" });
  } catch (error) {
    throw new CustomeAPIError(
      "something went wrong",
      StatusCodes.EXPECTATION_FAILED
    );
  }
};
