import OthersUsers from "../../models/OthersUsers";
import UsersRepository from "../../repositories/Users/UsersRepository";
import AdminUsersRepository from "../../repositories/AdminUsers/AdminUsersRepository";
import { hash } from "bcrypt";

import AppError from "../../errors/AppError";

interface IRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default class CreateUserService {
  public async init({
    username,
    email,
    password,
    confirm_password,
  }: IRequest): Promise<OthersUsers> {
    const usersRepository = new UsersRepository();
    const adminUsersRepository = new AdminUsersRepository();

    const checkUsersEmail = await usersRepository.findByEmail(email);
    const checkAdminUsersEmail = await adminUsersRepository.findByEmail(email);

    if (checkUsersEmail || checkAdminUsersEmail)
      throw new AppError("This email is already in user", 401);

    if (password !== confirm_password)
      throw new AppError("Password does not match");

    const hashedPassword = await hash(password, 10);

    const user = await usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
