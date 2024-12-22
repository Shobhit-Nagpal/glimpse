import { IPurchaseDB } from "../models/purchases/types";
import { IPurchaseRepository } from "../repositories/purchase.repository";

export interface IPurchaseService {
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

export class PurchaseService implements IPurchaseService {
  private repository: IPurchaseRepository;

  constructor(repository: IPurchaseRepository) {
    this.repository = repository;
  }

  async createPurchase(
    buyer: string,
    seller: string,
    asset: string,
    amount: number,
  ): Promise<IPurchaseDB> {
    if (!buyer || !seller || !amount || !asset) {
      throw new Error("Details are missing to create asset");
    }

    const purchase = await this.repository.createPurchase(
      buyer,
      seller,
      asset,
      amount,
    );

    if (!purchase) {
      throw new Error("Couldn't create purchase");
    }

    return purchase;
  }

  async getPurchaseById(id: string): Promise<IPurchaseDB> {
    if (!id) {
      throw new Error("Purchase id is not provided");
    }

    const purchase = await this.repository.getPurchaseById(id);

    if (!purchase) {
      throw new Error("Purchase not found");
    }

    return purchase;
  }

  async getPurchasesBySellerId(sellerId: string): Promise<IPurchaseDB[]> {
    if (!sellerId) {
      throw new Error("Buyer id is not provided");
    }

    const purchases = await this.repository.getPurchasesBySellerId(sellerId);

    return purchases;
  }

  async getPurchasesByBuyerId(buyerId: string): Promise<IPurchaseDB[]> {
    if (!buyerId) {
      throw new Error("Buyer id is not provided");
    }

    const purchases = await this.repository.getPurchasesByBuyerId(buyerId);

    return purchases;
  }
}
