import mongoose from "mongoose";
import { CategoryType } from "./CategoryType";
import { ItemType } from "./ItemType";

/**
 * Base interface with common item properties
 */
export interface ItemBase {
    supplierId: mongoose.Types.ObjectId;
    name: string;
    type: ItemType;
    quantity: number;
    category: CategoryType;
    bestBefore: Date;
    readyBy: Date;
    description: string;
    claimedBy?: mongoose.Types.ObjectId;
    images?: mongoose.Types.ObjectId[];
}