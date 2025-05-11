import { Document } from 'mongoose';
import { SupplierBase } from './';

export interface SupplierDocument extends SupplierBase, Document {
    createdAt: Date;
    updatedAt: Date;
}