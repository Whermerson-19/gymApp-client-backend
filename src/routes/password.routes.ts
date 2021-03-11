import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ForgotPasswordController from "../controllers/PasswordController/ForgotPassword";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  forgotPasswordController.init
);

export default passwordRouter;
