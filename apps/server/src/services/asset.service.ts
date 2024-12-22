import { IAssetDB } from "../models/assets/types";
import { IAssetRepository } from "../repositories/asset.repository";

export interface IAssetService {
  createAsset(
    name: string,
    description: string,
    price: number,
    createdBy: string,
  ): Promise<IAssetDB>;
  getAssetById(id: string): Promise<IAssetDB>;
  getAssetsByUserId(sellerId: string): Promise<IAssetDB[]>;
}

export class AssetService implements IAssetService {
  private repository: IAssetRepository;

  constructor(repository: IAssetRepository) {
    this.repository = repository;
  }

  async createAsset(
    name: string,
    description: string,
    price: number,
    createdBy: string,
  ): Promise<IAssetDB> {
    if (!name || !description || !price || !createdBy) {
      throw new Error("Details are missing to create asset");
    }

    const asset = await this.repository.createAsset(
      name,
      description,
      price,
      createdBy,
    );

    if (!asset) {
      throw new Error("Couldn't create asset");
    }

    return asset;
  }

  async getAssetById(id: string): Promise<IAssetDB> {
    if (!id) {
      throw new Error("Asset id is not provided");
    }

    const asset = await this.repository.getAssetById(id);

    if (!asset) {
      throw new Error("Asset not found");
    }

    return asset;
  }

  async getAssetsByUserId(userId: string): Promise<IAssetDB[]> {
    if (!userId) {
      throw new Error("User id is not provided");
    }

    const assets = await this.repository.getAssetsByUserId(userId);

    return assets;
  }
}
