import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import SessionController from "../controllers/Session/SessionController";

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  sessionController.create
);

export default sessionRouter;
