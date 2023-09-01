import { StatusCodes } from "http-status-codes";
import { CustomeAPIError } from "../middleware/custome-api-error.middleware.js";
import User, { comparePassword } from "../models/User.js";
import { createJWT } from "../utils/token/token.utils.js";

const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "user registered successfully" });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValid =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValid)
    throw new CustomeAPIError("Wrong credintials", StatusCodes.UNAUTHORIZED);

  const oneDay = 1000 * 60 * 60 * 24;
  const token = createJWT({ userId: user._id, role: user.role });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res
    .status(StatusCodes.OK)
    .send({ msg: "login successfully", role: user.role });
};

const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

export { register, login, logout };
