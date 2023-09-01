import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/token/token.utils.js";
import { CustomeAPIError } from "./custome-api-error.middleware.js";

export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    throw new CustomeAPIError(
      "authentication invalid",
      StatusCodes.UNAUTHORIZED
    );

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new CustomeAPIError(
      "authentication invalid",
      StatusCodes.UNAUTHORIZED
    );
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log("roles ", roles);
    if (!roles.includes(req.user.role))
      throw new CustomeAPIError(
        "unthorized user to access this route",
        StatusCodes.UNAUTHORIZED
      );
    next();
  };
};
