import OthersUsersRepository from "../../repositories/Users/UsersRepository";
import { getRepository } from "typeorm";

import UserToken from "../../models/UserToken";

import MailProvider from "../../providers/MailProvider";
import path from "path";

import AppError from "../../errors/AppError";

interface IRequest {
  email: string;
}

export default class ForgotPasswordService {
  public async init({ email }: IRequest): Promise<void> {
    const othersUsersRepository = new OthersUsersRepository();
    const usersTokenRepository = getRepository(UserToken);

    const mailProvider = new MailProvider();

    const user = await othersUsersRepository.findByEmail(email);
    if (!user) throw new AppError("This email does not exist");

    const createUsersToken = usersTokenRepository.create({
      user_id: user.id,
    });

    await usersTokenRepository.save(createUsersToken);

    const template = path.resolve(
      __dirname,
      "..",
      "Views",
      "forgot_password.hbs"
    );

    await mailProvider.sendEmail({
      to: {
        name: user.username,
        address: user.email,
      },
      subject: "GymAcademy - Email de recuperação de senha.",
      templateData: {
        file: template,
        variables: {
          name: user.username,
          link: `http://localhost:3000/reset-password?token=${createUsersToken.token}`,
        },
      },
    });

    console.log(createUsersToken.token);
  }
}
