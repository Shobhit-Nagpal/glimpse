import { model } from "mongoose";
import { IAssetModel } from "./types";
import AssetSchema from "./schema";

export const AssetModel = model<IAssetModel>("assets", AssetSchema);
