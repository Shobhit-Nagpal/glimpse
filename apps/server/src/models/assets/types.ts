import * as Mongoose from "mongoose";

export interface IAsset {
  name: string;
  description?: string;
  createdBy: Mongoose.Schema.Types.ObjectId;
  price: number;
}

export interface IAssetDB extends IAsset {
  id: string;
}

export interface IAssetDocument extends IAsset, Mongoose.Document {}
export interface IAssetModel extends IAsset, Mongoose.Model<IAssetDocument> {}
