import { ErrorResponse } from "../../../constants";
import { AppError } from "../../../utils";
import { ItemRepo, ItemStatus } from "../../item/types";
import { OrderItem } from "../types";
import { CreateOrderDTO } from "../types/CreateOrderDTO";

export const validateOrder = async (
    dto: CreateOrderDTO,
    itemRepo: ItemRepo,
) => {

    const { ORDER, ITEM } = ErrorResponse;
    const currentDate = new Date();
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

        if (item.bestBefore < currentDate) {
            unavailableItems.push({
                itemId,
                reason: `Item has expired. Best before date (${item.bestBefore.toISOString().split('T')[ 0 ]}) has passed`
            });
        }

        if (item.readyBy < currentDate) {
            unavailableItems.push({
                itemId,
                reason: `Item is no longer available. Was ready by ${item.readyBy.toISOString().split('T')[ 0 ]}`
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
};