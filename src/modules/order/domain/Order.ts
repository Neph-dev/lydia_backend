import mongoose from "mongoose";
import { OrderItem, OrderStatus } from "../types";
import { generateOrderCode, generateOrderId } from "../utils";

export class Order {
    constructor(
        public readonly orderId: string = generateOrderId(),
        public readonly supplierId: mongoose.Types.ObjectId,
        public readonly beneficiaryId: mongoose.Types.ObjectId,
        public readonly items: OrderItem[],
        public readonly orderDate: Date = new Date(),
        public readonly orderCode: string = generateOrderCode(),
        public readonly status: OrderStatus = OrderStatus.CREATED,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) { }


    static create(data: Omit<Order, 'createdAt' | 'updatedAt' | 'status' | 'orderId' | 'orderCode'>): Order {
        return new Order(
            generateOrderId(),
            data.supplierId,
            data.beneficiaryId,
            data.items,
            data.orderDate,
            generateOrderCode(),
        );
    }

    static updateStatus(
        existingOrder: Order,
        newStatus: OrderStatus
    ): Order {
        return new Order(
            existingOrder.orderId,
            existingOrder.supplierId,
            existingOrder.beneficiaryId,
            existingOrder.items,
            existingOrder.orderDate,
            existingOrder.orderCode,
            newStatus,
            existingOrder.createdAt,
            new Date()
        );
    }

    static update(
        existingOrder: Order,
        updates: Partial<Omit<Order, 'createdAt' | 'status'>>
    ): Order {
        return new Order(
            updates.orderId ?? existingOrder.orderId,
            updates.supplierId ?? existingOrder.supplierId,
            updates.beneficiaryId ?? existingOrder.beneficiaryId,
            updates.items ?? existingOrder.items,
            updates.orderDate ?? existingOrder.orderDate,
            existingOrder.orderCode,
            existingOrder.status,
            existingOrder.createdAt,
            new Date()
        );
    }
}