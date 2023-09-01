import express from "express";
const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import "express-async-errors"; // with this package we are no longer need to catch the error with the next method, it will throw the error to our error handling function(errorhandlerMiddleware)
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth.middleware.js";

// env
import dotenv from "dotenv";
dotenv.config(); // need to be invoked

// mongodb connection
import connectDB from "./db/connect.js";

// router
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
import userRouter from "./routes/userRoutes.js";

// middlewares
import notFoundMiddleware from "./middleware/not-found.middleware.js";
import errorhandlerMiddleware from "./middleware/error-handler.middleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // morgan is a middleware to log HTTP request in terminal.
}

app.use(cookieParser()); // it is use to extract the cookie from the header of each request, and check if the user has right authorization.
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "api-v1" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware, userRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware); // express will look for all routes, and if all the routes does not match our expected route then it will use our notFoundMiddleware!
app.use(errorhandlerMiddleware); // if an error exist it will throw our custome error handler middleware!
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_CONNECTION_STRING);
    app.listen(port, () =>
      console.log(`the server is listening to port ${port}...`)
    );
  } catch (error) {
    console.log("an error while connection:", error);
  }
};

start();
