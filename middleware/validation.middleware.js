import { body, param, validationResult } from "express-validator";
import { CustomeAPIError } from "./custome-api-error.middleware.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { GENDER } from "../utils/constants/constants.utils.js";

const withValidationErrors = (validations) => [
  validations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);

      if (errorMessages[0].startsWith("No job"))
        throw new CustomeAPIError(errorMessages, StatusCodes.NOT_FOUND);

      if (errorMessages[0].startsWith("unauthorized user"))
        throw new CustomeAPIError(
          `unauthorized user to access this route`,
          StatusCodes.UNAUTHORIZED
        );

      throw new CustomeAPIError(errorMessages, StatusCodes.BAD_REQUEST);
    }
    next();
  },
];

const isValidMongooseID = (id) => {
  const {
    Types: { ObjectId },
  } = mongoose;
  if (!ObjectId.isValid(id))
    throw new CustomeAPIError("invalid Mongoose ID", StatusCodes.BAD_REQUEST);
  return true;
};
export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalide email"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateJobIdParam = withValidationErrors([
  param("id").custom(async (id, { req }) => {
    isValidMongooseID(id);

    const job = await Job.findById({ _id: id });

    if (!job)
      throw new CustomeAPIError(
        `No job with the id: ${id} exist`,
        StatusCodes.NOT_FOUND
      );

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new CustomeAPIError(
        `unauthorized user to access this route`,
        StatusCodes.UNAUTHORIZED
      );
  }),
]);

export const validateJob = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  // body("gender").isIn(Object.values(GENDER)).withMessage("invalid gender"),
]);

export const validateRegisterInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("name should be between 3-50 charector"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      const userExist = await User.findOne({ email });
      if (userExist)
        throw new CustomeAPIError(
          "Email already exist",
          StatusCodes.BAD_REQUEST
        );
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password should be 8 charectors long"),
]);

export const validateUpdateUser = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("name should be between 3-50 charector"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new CustomeAPIError(
          "Email already exist",
          StatusCodes.BAD_REQUEST
        );
    }),
]);
