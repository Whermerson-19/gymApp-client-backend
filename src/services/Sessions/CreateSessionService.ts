import OthersUsers from "../../models/OthersUsers";
import OthersUsersRepository from "../../repositories/Users/UsersRepository";
import AdminUsersRepository from "../../repositories/AdminUsers/AdminUsersRepository";

import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

import auth from "../../config/auth";

import AppError from "../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: OthersUsers;
  token: string;
}

export default class CreateSessionService {
  public async init({ email, password }: IRequest): Promise<IResponse> {
    const othersUsersRepository = new OthersUsersRepository();
    const adminUsersRepository = new AdminUsersRepository();

    const checkOthersUsersEmail = await othersUsersRepository.findByEmail(
      email
    );
    const checkAdminUsersEmail = await adminUsersRepository.findByEmail(email);

    if (!checkOthersUsersEmail)
      throw new AppError("Invalid Email or Password", 401);
    if (checkAdminUsersEmail) throw new AppError("Denied access", 403);

    const checkPassword = await compare(
      password,
      checkOthersUsersEmail.password
    );

    if (!checkPassword) throw new AppError("Invalid Email or Password", 401);

    const token = sign({ type: checkOthersUsersEmail.type }, auth.jwt.secret, {
      expiresIn: auth.jwt.expiresIn,
      subject: checkOthersUsersEmail.id,
    });

    return {
      user: checkOthersUsersEmail,
      token,
    };
  }
}
