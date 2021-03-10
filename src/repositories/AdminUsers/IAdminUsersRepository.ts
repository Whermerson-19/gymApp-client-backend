import AdminUsers from "../../models/AdminUsers";

export default interface IAdminUsersRepository {
  findById(user_id: string): Promise<AdminUsers | undefined>;
  findByEmail(email: string): Promise<AdminUsers | undefined>;
}
