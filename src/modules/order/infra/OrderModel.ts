import mongoose, { Schema } from 'mongoose';
import { OrderDocument, OrderStatus } from '../types';

const OrderSchema = new Schema<OrderDocument>({
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    beneficiaryId: {
        type: Schema.Types.ObjectId,
        ref: 'Beneficiary',
        required: true
    },
    orderCode: {
        type: String,
        required: true
    },
    items: [
        {
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: [ 'CREATED', 'COMPLETED', 'CANCELLED' ],
        default: OrderStatus.CREATED
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

OrderSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema);