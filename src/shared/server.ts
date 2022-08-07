import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../swagger.json";
import { donationRoutes } from "./routes/donation.routes";
import { AppError } from "./util/AppError";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(donationRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(400).json(err);
    }
    return response.status(500).json({
      status: "error",
      message: `Internal Server error - ${err.message}`,
    });
  }
);

export { app };
