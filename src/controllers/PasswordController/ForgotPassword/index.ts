import { Request, Response } from "express";

import ForgotPasswordService from "../../../services/Passwords/ForgotPasswordService";

export default class ForgotPasswordController {
  public async init(request: Request, response: Response): Promise<Response> {
    const forgotPassword = new ForgotPasswordService();

    const { email } = request.body;

    await forgotPassword.init({
      email,
    });

    return response.status(201).json({ success: "sent email with success" });
  }
}
