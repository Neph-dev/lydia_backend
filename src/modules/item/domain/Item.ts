import mongoose from "mongoose";
import { ItemStatus, ItemType } from "../types";

export class Item {
    constructor(
        public supplierId: mongoose.Types.ObjectId,
        public name: string,
        public type: ItemType,
        public quantity: number,
        public bestBefore: Date,
        public readyBy: Date,
        public description: string,
        public claimedBy?: mongoose.Types.ObjectId,
        public status: ItemStatus = ItemStatus.AVAILABLE,
        public images?: mongoose.Types.ObjectId[],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        if (!this.name || !this.type || !this.quantity || !this.bestBefore || !this.readyBy) {
            throw new Error('Item must have a name, type, quantity, best before date and ready by date');
        }
    }

    static create(data: Omit<Item, 'createdAt' | 'updatedAt' | 'status'>): Item {
        return new Item(
            data.supplierId,
            data.name,
            data.type,
            data.quantity,
            data.bestBefore,
            data.readyBy,
            data.description,
            data.claimedBy,
            undefined,
            data.images
        );
    }

    static update(
        existingItem: Item,
        updates: Partial<Omit<Item, 'createdAt' | 'status'>>
    ): Item {
        return new Item(
            existingItem.supplierId,
            updates.name ?? existingItem.name,
            updates.type ?? existingItem.type,
            updates.quantity ?? existingItem.quantity,
            updates.bestBefore ?? existingItem.bestBefore,
            updates.readyBy ?? existingItem.readyBy,
            updates.description ?? existingItem.description,
            updates.claimedBy ?? existingItem.claimedBy,
            existingItem.status,
            existingItem.images,
            existingItem.createdAt,
            new Date()
        );
    }

    static updateStatus(
        existingItem: Omit<Item, 'updatedAt' | 'status'>,
        newStatus: ItemStatus
    ): Item {
        return new Item(
            existingItem.supplierId,
            existingItem.name,
            existingItem.type,
            existingItem.quantity,
            existingItem.bestBefore,
            existingItem.readyBy,
            existingItem.description,
            existingItem.claimedBy,
            newStatus,
            existingItem.images,
            existingItem.createdAt,
            new Date()
        );
    }

    static updateClaimedBy(
        existingItem: Omit<Item, 'updatedAt'>,
        claimedBy: mongoose.Types.ObjectId,
    ): Item {
        return new Item(
            existingItem.supplierId,
            existingItem.name,
            existingItem.type,
            existingItem.quantity,
            existingItem.bestBefore,
            existingItem.readyBy,
            existingItem.description,
            claimedBy,
            ItemStatus.CLAIMED,
            existingItem.images,
            existingItem.createdAt,
            new Date()
        );
    }
}