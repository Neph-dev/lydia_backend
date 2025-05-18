import { ErrorResponse } from "../../../constants";
import { AppError } from "../../../utils";
import { Item } from "../domain";
import { ItemRepo } from "../types";

export const getItemsBySupplier = async (supplierId: string, itemRepo: ItemRepo): Promise<Item[]> => {
    const { ITEM } = ErrorResponse;

    try {
        const items = await itemRepo.findByAnything('supplierId', supplierId.toString());
        return items;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError(
            ITEM.FETCH_FAILED.message,
            ITEM.FETCH_FAILED.code,
            ITEM.FETCH_FAILED.statusCode
        );
    }
};