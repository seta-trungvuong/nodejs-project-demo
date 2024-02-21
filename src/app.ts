import express, { Application, Request, Response, NextFunction } from "express";

import bodyParser from "body-parser"
import { router as userRoutes } from "./routes/user.routes";


const app: Application = express();

app.use(bodyParser.json());

app.use("/users", userRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "Hello. This is a NodeJs Project updated 38b4b828-0fb9-428a-8d0b-8770184607aa" });
});

export default app;