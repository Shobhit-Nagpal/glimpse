import { model } from "mongoose";
import { IPurchaseModel } from "./types";
import PurchaseSchema from "./schema";

export const PurchaseModel = model<IPurchaseModel>("purchases", PurchaseSchema);
