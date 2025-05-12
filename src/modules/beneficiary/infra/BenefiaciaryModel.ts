import mongoose, { Schema } from 'mongoose';
import { BeneficiaryDocument } from '../types';
import { AccountStatus } from '../../../shared/types';

const BenefiaciarySchema = new Schema<BeneficiaryDocument>({
    name: {
        type: String,
        required: true
    },
    address: {
        line1: {
            type: String,
            required: true
        },
        line2: { type: String },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    description: { type: String },
    website: { type: String },
    status: {
        type: String,
        enum: Object.values(AccountStatus),
        default: AccountStatus.PENDING,
    },
    coverPicture: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const BenefiaciaryModel = mongoose.model<BeneficiaryDocument>('Benefiaciary', BenefiaciarySchema);