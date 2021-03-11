import { Router } from "express";
import clientRouter from "./client.user.routes";
import passwordRouter from "./password.routes";
import sessionRouter from "./session.routes";

const appRouter = Router();

appRouter.use("/users", clientRouter);
appRouter.use("/session", sessionRouter);
appRouter.use("/password", passwordRouter);

export default appRouter;
