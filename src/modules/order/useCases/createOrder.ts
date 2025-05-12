import { Item } from '../../item/domain';
import { ItemRepo, ItemStatus } from '../../item/types';
import { notifyBeneficiaryOrderConfirmation, notifySupplierOrderPlaced } from '../../notification/useCases';
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

    const populatedItems = await Promise.all(
        dto.items.map(async (orderItem) => {
            const itemId = orderItem.itemId.toString();
            const item = await itemRepo.findById(itemId);

            if (!item) {
                throw new Error(`Item with ID ${itemId} not found`);
            }

            return {
                ...orderItem,
                itemDetails: {
                    name: item.name
                }
            };
        })
    );
    const orderWithDetails = {
        ...dto,
        items: populatedItems
    };

    const order = Order.create(orderWithDetails);
    await orderRepo.save(order);

    await Promise.all(dto.items.map(async (orderItem) => {
        const itemId = orderItem.itemId.toString();
        const item = await itemRepo.findById(itemId);

        if (item) {
            const newQuantity = item.quantity - orderItem.quantity;

            if (newQuantity <= 0) {
                const updatedItem = Item.update(item, {
                    quantity: newQuantity
                });
                await itemRepo.update(itemId, updatedItem);
                await itemRepo.updateStatus(itemId, item, ItemStatus.UNAVAILABLE);
            }
            else {
                const updatedItem = Item.update(item, {
                    quantity: newQuantity
                });
                await itemRepo.update(itemId, updatedItem);
                await itemRepo.updateStatus(itemId, updatedItem, ItemStatus.AVAILABLE);
            }
        }
    }));

    const sendNotifications = async () => {
        try {
            await Promise.all([
                notifySupplierOrderPlaced(order),
                notifyBeneficiaryOrderConfirmation(order)
            ]);
        } catch (error) {
            console.error('Failed to send order notifications:',
                error instanceof Error ? error.message : 'Unknown error');
        }
    };

    sendNotifications();

    return order;
};
