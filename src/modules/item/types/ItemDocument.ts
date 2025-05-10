import mongoose, { Document } from 'mongoose';
import { CategoryType, ItemStatus, ItemType } from "../types";

export interface ItemDocument extends Document {
    supplierId: mongoose.Types.ObjectId;
    name: string;
    type: ItemType;
    quantity: number;
    category: CategoryType;
    bestBefore: Date;
    readyBy: Date;
    description: string;
    claimedBy?: mongoose.Types.ObjectId;
    status: ItemStatus;
    images?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}