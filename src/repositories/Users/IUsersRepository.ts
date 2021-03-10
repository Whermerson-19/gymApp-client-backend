import OthersUsers from "../../models/OthersUsers";

export interface ICreateUserData {
  username: string;
  email: string;
  password: string;
}

export default interface IUsersRepository {
  findById(user_id: string): Promise<OthersUsers | undefined>;
  findByEmail(email: string): Promise<OthersUsers | undefined>;
  create(data: ICreateUserData): Promise<OthersUsers>;
  save(user: OthersUsers): Promise<OthersUsers>;
}
