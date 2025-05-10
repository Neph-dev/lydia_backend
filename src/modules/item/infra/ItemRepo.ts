import { Item } from "../domain";
import { ItemRepo, ItemStatus } from "../types";
import { ItemModel } from "./ItemModel";

export class MongooseItemRepo implements ItemRepo {
    async save(item: Item): Promise<void> {
        const doc = new ItemModel({
            ...item,
            status: ItemStatus.AVAILABLE
        });
        await doc.save();
    }

    async findById(id: string): Promise<Item | null> {
        try {
            if (!id) return null;
            const doc = await ItemModel.findById(id).populate('supplierId', 'name');;
            if (!doc) return null;

            return new Item(
                doc.supplierId,
                doc.name,
                doc.type,
                doc.quantity,
                doc.bestBefore,
                doc.readyBy,
                doc.description,
                doc.category,
                doc.claimedBy,
                doc.status,
                doc.images,
                doc.createdAt
            );
        } catch (error) {
            console.error(`Database error in findById: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to check item by ID: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }

    async findByAnything(key: string, value: string): Promise<Item[]> {
        try {
            if (!value || !key) return [];
            const docs = await ItemModel.find({ [ key ]: value }).populate('supplierId', 'name');
            if (!docs) return [];

            return docs.map(doc => new Item(
                doc.supplierId,
                doc.name,
                doc.type,
                doc.quantity,
                doc.bestBefore,
                doc.readyBy,
                doc.description,
                doc.category,
                doc.claimedBy,
                doc.status,
                doc.images,
                doc.createdAt
            ));
        } catch (error) {
            console.error(`Database error in ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to check items by ${key}: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }

    async updateStatus(id: string, item: Item, newStatus: ItemStatus): Promise<Item | null> {
        try {
            if (!item) return null;
            const updatedItem = await ItemModel.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true }
            ).populate('supplierId', 'name');

            if (!updatedItem) return null;

            return new Item(
                updatedItem.supplierId,
                updatedItem.name,
                updatedItem.type,
                updatedItem.quantity,
                updatedItem.bestBefore,
                updatedItem.readyBy,
                updatedItem.description,
                updatedItem.category,
                updatedItem.claimedBy,
                updatedItem.status,
                updatedItem.images,
                updatedItem.createdAt
            );
        } catch (error) {
            console.error(`Database error in updateStatus: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to update item status: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }

    async update(id: string, item: Item): Promise<Item | null> {
        try {
            if (!item) return null;
            const updatedItem = await ItemModel.findByIdAndUpdate(
                id,
                { ...item },
                { new: true }
            );

            if (!updatedItem) return null;

            return new Item(
                updatedItem.supplierId,
                updatedItem.name,
                updatedItem.type,
                updatedItem.quantity,
                updatedItem.bestBefore,
                updatedItem.readyBy,
                updatedItem.description,
                updatedItem.category,
                updatedItem.claimedBy,
                updatedItem.status,
                updatedItem.images,
                updatedItem.createdAt
            );
        } catch (error) {
            console.error(`Database error in update: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to update item: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            if (!id) return;
            await ItemModel.findByIdAndDelete(id);
        } catch (error) {
            console.error(`Database error in delete: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to delete item: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }
}