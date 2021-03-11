import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateUserService from "../../services/Client_Users/CreateUserService";

export default class Client_Users_Controller {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const { username, email, password, confirm_password } = request.body;
    const user = await createUser.init({
      username,
      email,
      password,
      confirm_password,
    });

    return response.status(201).json(classToClass(user));
  }
}
