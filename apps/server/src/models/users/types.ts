import * as Mongoose from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDB extends IUser {
  id: string;
}

export interface IUserDocument extends IUser, Mongoose.Document {}
export interface IUserModel extends Mongoose.Model<IUserDocument> {}
