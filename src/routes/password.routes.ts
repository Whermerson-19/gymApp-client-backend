import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import PasswordsController from "../controllers/PasswordController/PasswordsController";

const passwordRouter = Router();

const passwordController = new PasswordsController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  passwordController.create
);

passwordRouter.patch(
  "/reset/:token",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      token: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required().min(6),
      confirm_password: Joi.ref("password"),
    }),
  }),
  passwordController.update
);

export default passwordRouter;
