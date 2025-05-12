import mongoose from "mongoose";

export interface OrderItem {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
}