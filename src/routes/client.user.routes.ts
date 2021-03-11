import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import Client_Users_Controller from "../controllers/Client_Users/Client_Users_Controller";

const clientRouter = Router();

const clientController = new Client_Users_Controller();

clientRouter.post(
  "/create",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
      confirm_password: Joi.ref("password"),
    }),
  }),
  clientController.create
);

export default clientRouter;
