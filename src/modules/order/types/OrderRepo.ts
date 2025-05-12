import { Order } from "../domain/Order";

export interface OrderRepo {
    save(order: Order): Promise<void>;
}
