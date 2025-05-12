import { Item } from '../../item/domain';
import { ItemRepo, ItemStatus } from '../../item/types';
import { notifySupplierOrderPlaced } from '../../notification/useCases';
import { Order } from '../domain';
import { CreateOrderDTO } from '../types/CreateOrderDTO';
import { OrderRepo } from '../types/OrderRepo';
import { validateOrder } from '../utils';

export const createOrder = async (
    dto: CreateOrderDTO,
    orderRepo: OrderRepo,
    itemRepo: ItemRepo
): Promise<Order> => {
    await validateOrder(dto, itemRepo);

    const order = Order.create(dto);
    await orderRepo.save(order);


    await Promise.all(dto.items.map(async (orderItem) => {
        const itemId = orderItem.itemId.toString();
        const item = await itemRepo.findById(itemId);

        if (item) {
            const newQuantity = item.quantity - orderItem.quantity;

            if (newQuantity <= 0) {
                await itemRepo.updateStatus(itemId, item, ItemStatus.UNAVAILABLE);
            } else {
                const updatedItem = Item.update(item, {
                    quantity: newQuantity
                });
                await itemRepo.update(itemId, updatedItem);
                await itemRepo.updateStatus(itemId, updatedItem, ItemStatus.CLAIMED);
            }
        }
    }));

    notifySupplierOrderPlaced(order)
        .catch(error => console.error('Failed to send order notification:', error));

    return order;
};
