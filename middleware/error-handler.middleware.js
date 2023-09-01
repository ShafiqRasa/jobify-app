import { StatusCodes } from "http-status-codes";

const errorhandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "an error occurred",
  };
  if (err.name === "ValidationError") {
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    defaultError.msg = `${Object.keys(err.keyValue)} filed has to be unique`;
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }
  res.status(defaultError.statusCode).send({ msg: defaultError.msg });
};
export default errorhandlerMiddleware;
