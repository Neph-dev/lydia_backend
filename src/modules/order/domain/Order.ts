import mongoose from "mongoose";
import { OrderItem, OrderStatus } from "../types";

export class Order {
    constructor(
        public readonly orderId: string,
        public readonly supplierId: mongoose.Types.ObjectId,
        public readonly beneficiaryId: mongoose.Types.ObjectId,
        public readonly items: OrderItem[],
        public readonly orderDate: Date = new Date(),
        public readonly status: OrderStatus = OrderStatus.CREATED,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) { }

    static create(data: Omit<Order, 'createdAt' | 'updatedAt' | 'status'>): Order {
        return new Order(
            data.orderId,
            data.supplierId,
            data.beneficiaryId,
            data.items,
            data.orderDate
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
            existingOrder.status,
            existingOrder.createdAt,
            new Date()
        );
    }
}