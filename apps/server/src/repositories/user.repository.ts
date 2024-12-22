import { UserModel } from "../models/users/model";

export class UserRepository {
  async createUser(email: string) {
    return await UserModel.create({
      email,
    });
  }

  async getUserById(id: string) {
    return await UserModel.findOne({
      _id: id,
    });
  }

  async getUserByEmail(email: string) {
    return await UserModel.findOne({
      email,
    });
  }
}
