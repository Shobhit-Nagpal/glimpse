import * as Mongoose from "mongoose";

export interface IPurchase {
  buyer: Mongoose.Schema.Types.ObjectId;
  seller: Mongoose.Schema.Types.ObjectId;
  asset: Mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  amount: number;
}

export interface IPurchaseDocument extends IPurchase, Mongoose.Document {}
export interface IPurchaseModel extends Mongoose.Model<IPurchaseDocument> {}
