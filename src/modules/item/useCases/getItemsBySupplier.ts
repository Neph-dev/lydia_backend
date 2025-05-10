import { Item } from "../domain";
import { ItemRepo } from "../types";

export const getItemsBySupplier = async (supplierId: string, itemRepo: ItemRepo): Promise<Item[]> => {
    try {
        const items = await itemRepo.findByAnything('supplierId', supplierId);
        return items;
    } catch (error) {
        console.error(`Error fetching items by supplier: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw new Error(`Failed to fetch items by supplier: ${error instanceof Error ? error.message : 'Database connection issue'}`);
    }
};