import * as Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default UserSchema;
