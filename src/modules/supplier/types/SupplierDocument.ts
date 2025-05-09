import { Document } from 'mongoose';
import { Address, Establishment } from "../../../shared/types";
import { SupplierStatus } from './SupplierStatus';

export interface SupplierDocument extends Document {
    name: string;
    establishment: Establishment;
    address: Address;
    phoneNumber: string;
    emailAddress: string;
    description?: string;
    website?: string;
    coverPicture?: string;
    status: SupplierStatus;
    createdAt: Date;
    updatedAt: Date;
}