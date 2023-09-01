import { StatusCodes } from "http-status-codes";
import { CustomeAPIError } from "../middleware/custome-api-error.middleware.js";
import Job from "../models/Job.js";
import mongoose from "mongoose";
import day from "dayjs";
import { SORT_OPTIONS } from "../utils/constants/constants.utils.js";

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.body);
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).send({ job });
};

const getAllJob = async (req, res) => {
  try {
    const { search, jobStatus, jobType, sort } = req.query;
    const queryObject = { createdBy: req.user.userId };

    if (search) {
      queryObject.$or = [
        { position: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    if (jobStatus && jobStatus !== "all") {
      queryObject.jobStatus = jobStatus;
    }
    if (jobType && jobType !== "all") {
      queryObject.jobType = jobType;
    }

    const sortOption = SORT_OPTIONS[sort] || SORT_OPTIONS.newest;

    // pagination implementation
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const totalJobs = await Job.countDocuments(queryObject);

    const numOfPages = Math.ceil(totalJobs / limit);
    res
      .status(StatusCodes.OK)
      .send({ totalJobs, numOfPages, currentPage: page, jobs });
  } catch (error) {
    throw new CustomeAPIError("No job founded", StatusCodes.NOT_FOUND);
  }
};

const getSingleJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });
  res.status(StatusCodes.OK).send({ job });
};

const getJobsByStatus = async (userId) => {
  try {
    let status = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
    ]);

    status = status.reduce((acc, cur) => {
      const { _id: title, count } = cur;
      acc[title] = count;
      return acc;
    }, {});
    return status;
  } catch (error) {
    console.log(error);
    throw new CustomeAPIError(
      "something went wrong while fetching Jobs by status",
      StatusCodes.BAD_REQUEST
    );
  }
};
const getJobsByDate = async (userId) => {
  try {
    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
      .reduce((acc, cur, index) => {
        const {
          _id: { year, month },
          count,
        } = cur;
        // why we have subtracted month from one? Because, mongoDB calculated month from 1=Jan however dayjs library calculated from 0=Jan
        const date = day()
          .month(month - 1)
          .year(year)
          .format("MMM YY");
        acc[index] = { date, count };
        return acc;
      }, [])
      .reverse();
    return monthlyApplications;
  } catch (error) {
    console.log(error);
    throw new CustomeAPIError(
      "something went wrong while fetching Jobs by Date",
      StatusCodes.BAD_REQUEST
    );
  }
};
const showStatus = async (req, res) => {
  const status = await getJobsByStatus(req.user.userId);
  const monthlyApplications = await getJobsByDate(req.user.userId);

  res.status(StatusCodes.OK).send({ status, monthlyApplications });
};
const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).send({ msg: updatedJob });
};
const deleteJob = async (req, res) => {
  await Job.deleteOne({ _id: req.params.id });
  res.status(StatusCodes.OK).send({ msg: "Job is delelted successfully" });
};

export { createJob, getAllJob, getSingleJob, showStatus, updateJob, deleteJob };
