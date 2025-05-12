
import { ErrorResponse } from '../../../constants';
import { AppError } from '../../../utils';
import { Item } from '../../item/domain';
import { ItemRepo, ItemStatus } from '../../item/types';
import { Order } from '../domain';
import { OrderItem } from '../types';
import { CreateOrderDTO } from '../types/CreateOrderDTO';
import { OrderRepo } from '../types/OrderRepo';

export const createOrder = async (
    dto: CreateOrderDTO,
    orderRepo: OrderRepo,
    itemRepo: ItemRepo
): Promise<Order> => {
    const { ORDER, ITEM } = ErrorResponse;

    const unavailableItems: { itemId: string; reason: string; }[] = [];

    await Promise.all(dto.items.map(async (orderItem: OrderItem) => {
        const itemId = orderItem.itemId.toString();
        const item = await itemRepo.findById(itemId);

        if (!item) {
            throw new AppError(
                ITEM.NOT_FOUND.message.replace(':id', itemId),
                ITEM.NOT_FOUND.code,
                ITEM.NOT_FOUND.statusCode
            );
        }

        if (item.status !== ItemStatus.AVAILABLE) {
            unavailableItems.push({
                itemId,
                reason: `Item status is ${item.status}, not AVAILABLE`
            });
        }

        if (orderItem.quantity > item.quantity) {
            unavailableItems.push({
                itemId,
                reason: `Requested quantity (${orderItem.quantity}) exceeds available quantity (${item.quantity})`
            });
        }

        if (unavailableItems.length > 0) {
            throw new AppError(
                ORDER.ITEMS_UNAVAILABLE.message,
                ORDER.ITEMS_UNAVAILABLE.code,
                ORDER.ITEMS_UNAVAILABLE.statusCode,
                unavailableItems.map((unavailableItem) => ({
                    itemId: unavailableItem.itemId,
                    reason: unavailableItem.reason
                }))
            );
        }
    }));

    const order = Order.create(dto);
    await orderRepo.save(order);

    return order;
};
