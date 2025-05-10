import mongoose, { Schema } from 'mongoose';
import { SupplierDocument } from '../types';
import { AccountStatus } from '../../../shared/types';

const SupplierSchema = new Schema<SupplierDocument>({
    name: {
        type: String,
        required: true
    },
    establishment: {
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
    donationSchedule: {
        days: [ {
            day: {
                type: String,
                enum: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
                required: true
            },
            start: {
                type: String,
                required: true
            },
            end: {
                type: String,
                required: true
            }
        } ],
        frequency: {
            interval: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                enum: [ 'Week', 'Month' ],
                required: true
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const SupplierModel = mongoose.model<SupplierDocument>('Supplier', SupplierSchema);
