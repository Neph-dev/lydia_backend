import mongoose, { Schema } from 'mongoose';;
import { ItemDocument, ItemStatus } from '../types';

const ItemSchema = new Schema<ItemDocument>({
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    name: { type: String, required: true },
    type: {
        type: String,
        enum: [ 'FOOD', 'DRINK' ],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    bestBefore: {
        type: Date,
        required: true
    },
    readyBy: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'VEGETABLES',
            'FRUITS',
            'DAIRY',
            'MEAT',
            'GRAINS',
            'SEAFOOD',
            'BEVERAGES',
            'SNACKS',
            'BAKERY',
            'CONDIMENTS',
            'FROZEN_FOODS',
            'CANNED_GOODS',
        ],
        required: true
    },
    claimedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Beneficiary'
    },
    status: {
        type: String,
        enum: [ 'AVAILABLE', 'CLAIMED', 'EXPIRED', 'CANCELLED', 'UNAVAILABLE' ],
        default: ItemStatus.AVAILABLE,
    },
    images: {
        type: [ Schema.Types.ObjectId ],
        ref: 'Asset',
        default: [],
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

export const ItemModel = mongoose.model<ItemDocument>('Item', ItemSchema);