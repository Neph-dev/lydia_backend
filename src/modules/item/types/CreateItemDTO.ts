import mongoose from "mongoose";
import { ItemType } from "./ItemType";
import { CategoryType } from "./CategoryType";

export interface CreateItemDTO {
    supplierId: mongoose.Types.ObjectId;
    name: string;
    type: ItemType;
    category: CategoryType;
    quantity: number;
    bestBefore: Date;
    readyBy: Date;
    description: string;
    claimedBy?: mongoose.Types.ObjectId;
    images?: mongoose.Types.ObjectId[];
}