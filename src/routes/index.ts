import { Router } from "express";
import clientRouter from "./client.user.routes";
import sessionRouter from "./session.routes";

const appRouter = Router();

appRouter.use("/users", clientRouter);
appRouter.use("/session", sessionRouter);

export default appRouter;
