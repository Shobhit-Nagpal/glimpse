import { PurchaseModel } from "../models/purchases/model";

export class Purchase {
  async createPurchase(
    buyer: string,
    seller: string,
    asset: string,
    amount: number,
  ) {
    return await PurchaseModel.create({
      buyer,
      seller,
      asset,
      amount,
    });
  }

  async getPurchaseById(id: string) {
    return await PurchaseModel.findOne({
      _id: id,
    });
  }

  async getPurchasesBySellerId(sellerId: string) {
    return await PurchaseModel.find({
      seller: sellerId,
    });
  }

  async getPurchasesByBuyerId(buyerId: string) {
    return await PurchaseModel.find({
      buyer: buyerId,
    });
  }
}
