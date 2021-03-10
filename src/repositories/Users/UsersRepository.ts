import { Repository, getRepository } from "typeorm";
import OthersUsers from "../../models/OthersUsers";

import IUsersRepository, { ICreateUserData } from "./IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<OthersUsers>;

  constructor() {
    this.ormRepository = getRepository(OthersUsers);
  }

  public async findById(user_id: string): Promise<OthersUsers | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<OthersUsers | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({
    username,
    email,
    password,
  }: ICreateUserData): Promise<OthersUsers> {
    const user = this.ormRepository.create({
      username,
      email,
      password,
      type: "client",
    });

    return this.ormRepository.save(user);
  }

  public async save(user: OthersUsers): Promise<OthersUsers> {
    return this.ormRepository.save(user);
  }
}
