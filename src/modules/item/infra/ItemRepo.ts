import { executeDatabaseOperation } from "../../../shared/utils";
import { Item } from "../domain";
import { ItemRepo, ItemStatus } from "../types";
import { ItemModel } from "./ItemModel";

export class MongooseItemRepo implements ItemRepo {
    async save(item: Item): Promise<void> {
        return executeDatabaseOperation(async () => {
            const doc = new ItemModel({
                ...item,
                status: ItemStatus.AVAILABLE
            });
            await doc.save();
        }, 'save');
    }

    async findById(id: string): Promise<Item | null> {
        return executeDatabaseOperation(async () => {
            if (!id) return null;
            const doc = await ItemModel.findById(id).populate('supplierId', 'name');
            return this.documentToItem(doc);
        }, 'findById');
    }

    async findByAnything(key: string, value: string): Promise<Item[]> {
        return executeDatabaseOperation(async () => {
            if (!value || !key) return [];
            const docs = await ItemModel.find({ [ key ]: value }).populate('supplierId', 'name');
            if (!docs || docs.length === 0) return [];

            return docs.map(doc => this.documentToItem(doc)).filter(Boolean) as Item[];
        }, `findBy${key}`);
    }

    async updateStatus(id: string, item: Item, newStatus: ItemStatus): Promise<Item | null> {
        return executeDatabaseOperation(async () => {
            if (!item) return null;
            const updatedItem = await ItemModel.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true }
            ).populate('supplierId', 'name');

            return this.documentToItem(updatedItem);
        }, 'updateStatus');
    }

    async update(id: string, item: Item): Promise<Item | null> {
        return executeDatabaseOperation(async () => {
            if (!item) return null;
            const updatedItem = await ItemModel.findByIdAndUpdate(
                id,
                { ...item },
                { new: true }
            ).populate('supplierId', 'name');

            return this.documentToItem(updatedItem);
        }, 'update');
    }

    async delete(id: string): Promise<void> {
        return executeDatabaseOperation(async () => {
            if (!id) return;
            await ItemModel.findByIdAndDelete(id);
        }, 'delete');
    }

    private documentToItem(doc: any): Item | null {
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
    }
}