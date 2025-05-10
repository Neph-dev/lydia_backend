import mongoose from "mongoose";
import { ItemType } from "./ItemType";
import { ItemStatus } from "./ItemStatus";

export interface CreateItemDTO {
    supplierId: mongoose.Types.ObjectId;
    name: string;
    type: ItemType;
    quantity: number;
    bestBefore: Date;
    readyBy: Date;
    description: string;
    claimedBy?: mongoose.Types.ObjectId;
    images?: mongoose.Types.ObjectId[];
}