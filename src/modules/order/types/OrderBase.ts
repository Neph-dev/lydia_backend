import mongoose from "mongoose";
import { OrderItem } from "./OrderItem";
import { OrderStatus } from "./OrderStatus";

export interface OrderBase {
    orderId: string;
    supplierId: mongoose.Types.ObjectId;
    beneficiaryId: mongoose.Types.ObjectId;
    items: OrderItem[];
    orderDate: Date;
    orderCode: string;
    status: OrderStatus;
}