import { model } from "mongoose";
import { IUserModel } from "./types";
import UserSchema from "./schema";

export const UserModel = model<IUserModel>("users", UserSchema);
