import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import appRouter from "./routes";
import AppError from "./errors/AppError";

import uploadConfig from "./config/upload";

import "./database";

const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));

app.use(appRouter);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3334, () => console.log("Server isRunning on port 3334"));
