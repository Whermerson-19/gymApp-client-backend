import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import ResetPasswordService from "../../services/Passwords/ResetPasswordService";
import ForgotPasswordService from "../../services/Passwords/ForgotPasswordService";

export default class PasswordsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const forgotPassword = new ForgotPasswordService();

    const { email } = request.body;

    await forgotPassword.init({
      email,
    });

    return response.status(201).json({ success: "sent email with success" });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const resetPassword = new ResetPasswordService();

    const { token } = request.params;
    const { password, confirm_password } = request.body;

    const user = await resetPassword.init({
      token,
      password,
      confirm_password,
    });

    return response.status(200).json(classToClass(user));
  }
}
