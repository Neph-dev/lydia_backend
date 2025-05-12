import { executeDatabaseOperation } from "../../../shared/utils";
import { Order } from "../domain/Order";
import { OrderStatus } from "../types";
import { OrderRepo } from "../types/OrderRepo";
import { OrderModel } from "./OrderModel";

export class MongooseOrderRepo implements OrderRepo {
    async save(order: Order): Promise<void> {
        return executeDatabaseOperation(async () => {
            const doc = new OrderModel({
                ...order,
                status: OrderStatus.CREATED
            });
            await doc.save();
        }, 'save');
    }

    private documentToOrder(doc: any): Order | null {
        if (!doc) return null;
        return new Order(
            doc.supplierId,
            doc.beneficiaryId,
            doc.items,
            doc.orderId,
            doc.status,
            doc.createdAt,
            doc.updatedAt
        );
    }
}