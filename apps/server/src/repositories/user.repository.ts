import { UserModel as User } from "../models/users/model";
import { IUserDB } from "../models/users/types";
import { TProvider } from "../types";

export interface IUserRepository {
  createUser(
    email: string,
    name: string,
    provider: TProvider,
  ): Promise<IUserDB>;
  getUserById(id: string): Promise<IUserDB | null>;
  getUserByEmail(email: string): Promise<IUserDB | null>;
}

export class UserRepository implements IUserRepository {
  async createUser(
    email: string,
    name: string,
    provider: TProvider,
  ): Promise<IUserDB> {
    const user = new User({
      email,
      name,
      provider,
    });

    await user.save();

    return this._mapToDomain(user);
  }

  async getUserById(id: string) {
    const user = await User.findOne({
      _id: id,
    });

    if (!user) {
      return null
    }

    return this._mapToDomain(user);
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return null
    }

    return this._mapToDomain(user);
  }

  private _mapToDomain(user: any): IUserDB {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.createdAt,
      lastLogin: user.lastLogin,
    };
  }
}
