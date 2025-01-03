import { IUserDB } from "../models/users/types";
import { IUserRepository } from "../repositories/user.repository";
import { TProvider } from "../types";
import { isValidEmail } from "../utils/email";

export interface IUserService {
  createUser(
    email: string,
    name: string,
    provider: TProvider,
  ): Promise<IUserDB>;
  getUserById(id: string): Promise<IUserDB | null>;
  getUserByEmail(email: string): Promise<IUserDB | null>;
}

export class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async createUser(email: string, name: string, provider: TProvider) {
    if (!email) {
      throw new Error("Email isn't provided");
    }

    if (!isValidEmail(email)) {
      throw new Error("Email isn't valid");
    }

    const user = await this.repository.createUser(email, name, provider);

    if (!user) {
      throw new Error("Couldn't create user");
    }

    return user;
  }

  async getUserById(id: string) {
    const user = await this.repository.getUserById(id);

    if (!user) {
      return null
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
      return null;
    }

    return user;
  }
}
