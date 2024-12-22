import { AssetModel } from "../models/assets/model";
import { IAssetDB } from "../models/assets/types";

export interface IAssetRepository {
  createAsset(
    name: string,
    description: string,
    price: number,
    createdBy: string,
  ): Promise<IAssetDB>;
  getAssetById(id: string): Promise<IAssetDB>;
  getAssetsByUserId(userId: string): Promise<IAssetDB[]>;
}

export class AssetRepository implements IAssetRepository {
  async createAsset(
    name: string,
    description: string,
    price: number,
    createdBy: string,
  ) {
    const asset = await AssetModel.create({
      name,
      description,
      createdBy,
      price,
    });

    return this._mapToDomain(asset);
  }

  async getAssetById(id: string) {
    const asset = await AssetModel.findOne({
      _id: id,
    });

    return this._mapToDomain(asset);
  }

  async getAssetsByUserId(userId: string) {
    const assets = await AssetModel.find({
      createdBy: userId,
    });

    const userAssets: IAssetDB[] = [];

    assets.forEach((asset) => userAssets.push(this._mapToDomain(asset)));

    return userAssets;
  }

  private _mapToDomain(asset: any): IAssetDB {
    return {
      id: asset._id.toString(),
      name: asset.name,
      description: asset.description,
      price: asset.price,
      createdBy: asset.createdBy.toString(),
    };
  }
}
