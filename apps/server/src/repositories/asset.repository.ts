import { AssetModel } from "../models/assets/model";

export class AssetRepository {
  async createAsset(
    name: string,
    description: string,
    price: number,
    createdBy: string,
  ) {
    return await AssetModel.create({
      name,
      description,
      createdBy,
      price,
    });
  }

  async getAssetById(id: string) {
    return await AssetModel.findOne({
      _id: id,
    });
  }

  async getAssetsByUserId(userId: string) {
    return await AssetModel.find({
      createdBy: userId,
    });
  }
}
