import { Document } from 'mongoose';
import { OrderBase } from "../types";

export interface OrderDocument extends OrderBase, Document {
    createdAt: Date;
    updatedAt: Date;
}