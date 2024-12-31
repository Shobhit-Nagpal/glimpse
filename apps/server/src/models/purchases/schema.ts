import * as Mongoose from "mongoose";

const PurchaseSchema = new Mongoose.Schema({
  buyer: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  asset: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Asset",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default PurchaseSchema;
