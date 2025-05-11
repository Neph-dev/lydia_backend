import { Document } from 'mongoose';
import { ItemBase, ItemStatus } from "../types";

export interface ItemDocument extends ItemBase, Document {
    status: ItemStatus;
    createdAt: Date;
    updatedAt: Date;
}