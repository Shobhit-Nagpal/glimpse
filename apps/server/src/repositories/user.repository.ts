import { UserModel } from "../models/users/model";
import { IUserDB } from "../models/users/types";

export interface IUserRepository {
  createUser(email: string): Promise<IUserDB>;
  getUserById(id: string): Promise<IUserDB>;
  getUserByEmail(email: string): Promise<IUserDB>;
}

export class UserRepository implements IUserRepository {
  async createUser(email: string): Promise<IUserDB> {
    const user = await UserModel.create({
      email,
    });

    return this._mapToDomain(user);
  }

  async getUserById(id: string) {
    const user = await UserModel.findOne({
      _id: id,
    });

    return this._mapToDomain(user);
  }

  async getUserByEmail(email: string) {
    const user = await UserModel.findOne({
      email,
    });

    return this._mapToDomain(user);
  }

  private _mapToDomain(user: any): IUserDB {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.createdAt,
    };
  }
}
