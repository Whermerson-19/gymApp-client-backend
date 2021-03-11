import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateSessionService from "../../services/Sessions/CreateSessionService";

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSession = new CreateSessionService();

    const { email, password } = request.body;
    const data = await createSession.init({
      email,
      password,
    });

    return response.status(201).json(classToClass(data));
  }
}
