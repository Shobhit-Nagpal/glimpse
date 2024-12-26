import * as Mongoose from "mongoose";
import { Providers } from "../../consts";

const UserSchema = new Mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  provider: {
    type: String,
    enum: [Providers.EMAIL, Providers.GOOGLE, Providers.GITHUB],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
});

export default UserSchema;
