import { PurchaseModel } from "../models/purchases/model";
import { IPurchaseDB } from "../models/purchases/types";

export interface IPurchaseRepository {
  createPurchase(
    buyer: string,
    seller: string,
    asset: string,
    amount: number,
  ): Promise<IPurchaseDB>;
  getPurchaseById(id: string): Promise<IPurchaseDB>;
  getPurchasesBySellerId(sellerId: string): Promise<IPurchaseDB[]>;
  getPurchasesByBuyerId(buyerId: string): Promise<IPurchaseDB[]>;
}

export class PurchaseRepository implements IPurchaseRepository {
  async createPurchase(
    buyer: string,
    seller: string,
    asset: string,
    amount: number,
  ) {
    const purchase = await PurchaseModel.create({
      buyer,
      seller,
      asset,
      amount,
    });

    return this._mapToDomain(purchase);
  }

  async getPurchaseById(id: string) {
    const purchase = await PurchaseModel.findOne({
      _id: id,
    });

    return this._mapToDomain(purchase);
  }

  async getPurchasesBySellerId(sellerId: string) {
    const purchases = await PurchaseModel.find({
      seller: sellerId,
    });

    const purchasesBySeller: IPurchaseDB[] = [];

    purchases.forEach((purchase) =>
      purchasesBySeller.push(this._mapToDomain(purchase)),
    );

    return purchasesBySeller;
  }

  async getPurchasesByBuyerId(buyerId: string) {
    const purchases = await PurchaseModel.find({
      buyer: buyerId,
    });

    const purchasesByBuyer: IPurchaseDB[] = [];

    purchases.forEach((purchase) =>
      purchasesByBuyer.push(this._mapToDomain(purchase)),
    );

    return purchasesByBuyer;
  }

  private _mapToDomain(purchase: any): IPurchaseDB {
    return {
      id: purchase._id.toString(),
      buyer: purchase.buyer.toString(),
      seller: purchase.seller.toString(),
      asset: purchase.asset.toString(),
      amount: purchase.amount,
      createdAt: purchase.createdAt,
    };
  }
}
