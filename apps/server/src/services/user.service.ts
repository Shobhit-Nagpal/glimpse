import { IUserDB } from "../models/users/types";
import { IUserRepository } from "../repositories/user.repository";
import { isValidEmail } from "../utils/email";

export interface IUserService {
  createUser(email: string): Promise<IUserDB>;
  getUserById(id: string): Promise<IUserDB>;
  getUserByEmail(email: string): Promise<IUserDB>;
}

export class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async createUser(email: string) {
    if (!email) {
      throw new Error("Email isn't provided");
    }

    if (!isValidEmail(email)) {
      throw new Error("Email isn't valid");
    }

    const user = await this.repository.createUser(email);

    if (!user) {
      throw new Error("Couldn't create user");
    }

    return user;
  }

  async getUserById(id: string) {
    const user = await this.repository.getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getUserByEmail(email: string) {
    if (!email) {
      throw new Error("Email isn't provided");
    }

    if (!isValidEmail(email)) {
      throw new Error("Email isn't valid");
    }

    const user = await this.repository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
