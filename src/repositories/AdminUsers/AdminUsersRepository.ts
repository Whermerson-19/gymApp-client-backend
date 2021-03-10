import { Repository, getRepository } from "typeorm";
import IAdminUsersRepository from "./IAdminUsersRepository";

import AdminUsers from "../../models/AdminUsers";

export default class AdminUsersRepository implements IAdminUsersRepository {
  private ormRepository: Repository<AdminUsers>;

  constructor() {
    this.ormRepository = getRepository(AdminUsers);
  }

  public async findById(user_id: string): Promise<AdminUsers | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<AdminUsers | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
