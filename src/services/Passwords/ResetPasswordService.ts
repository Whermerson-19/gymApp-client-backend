import { getRepository } from "typeorm";

import UserToken from "../../models/UserToken";
import OthersUsers from "../../models/OthersUsers";

import OthersUsersRepository from "../../repositories/Users/UsersRepository";

import { hash } from "bcrypt";

import AppError from "../../errors/AppError";

interface IRequest {
  token: string;
  password: string;
  confirm_password: string;
}

export default class ResetPasswordService {
  public async init({
    token,
    password,
    confirm_password,
  }: IRequest): Promise<OthersUsers> {
    const usersTokenRepository = getRepository(UserToken);
    const othersUsersRepository = new OthersUsersRepository();

    const userToken = await usersTokenRepository.findOne({
      where: {
        token,
      },
    });

    if (!userToken) throw new AppError("Token is missing", 404);

    const user = await othersUsersRepository.findById(userToken.id);
    if (!user) throw new AppError("Invalid user", 401);

    const createdToken = userToken.created_at;

    if (new Date(Date.now()).getHours() - createdToken.getHours() > 1)
      throw new AppError("Expired token");

    if (password !== confirm_password)
      throw new AppError("Password does not match");

    user.password = await hash(password, 10);
    return othersUsersRepository.save(user);
  }
}
