import mongoose from "mongoose";
import { CategoryType, ItemStatus, ItemType } from "../types";
import { validateItem } from "../utils";

/**
 * Represents a food item entity in the system
 */
export class Item {
    /**
     * Creates a new Item instance
     */
    constructor(
        public readonly supplierId: mongoose.Types.ObjectId,
        public readonly name: string,
        public readonly type: ItemType,
        public readonly quantity: number,
        public readonly bestBefore: Date,
        public readonly readyBy: Date,
        public readonly description: string,
        public readonly category: CategoryType,
        public readonly claimedBy?: mongoose.Types.ObjectId,
        public readonly status: ItemStatus = ItemStatus.AVAILABLE,
        public readonly images?: mongoose.Types.ObjectId[],
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) {
        validateItem(this);
    }

    /**
     * Creates a new Item entity from data
     * @param data The item data
     * @returns A new Item instance
     */
    static create(data: Omit<Item, 'createdAt' | 'updatedAt' | 'status'>): Item {
        return new Item(
            data.supplierId,
            data.name,
            data.type,
            data.quantity,
            data.bestBefore,
            data.readyBy,
            data.description,
            data.category,
            data.claimedBy,
            ItemStatus.AVAILABLE,
            data.images
        );
    }

    /**
     * Creates a new Item with updated fields
     * @param existingItem The item to update
     * @param updates The fields to update
     * @returns A new Item instance with updated fields
     */
    static update(
        existingItem: Item,
        updates: Partial<Omit<Item, 'createdAt' | 'status'>>
    ): Item {
        return new Item(
            updates.supplierId ?? existingItem.supplierId,
            updates.name ?? existingItem.name,
            updates.type ?? existingItem.type,
            updates.quantity ?? existingItem.quantity,
            updates.bestBefore ?? existingItem.bestBefore,
            updates.readyBy ?? existingItem.readyBy,
            updates.description ?? existingItem.description,
            updates.category ?? existingItem.category,
            updates.claimedBy ?? existingItem.claimedBy,
            existingItem.status,
            updates.images ?? existingItem.images,
            existingItem.createdAt,
            new Date()
        );
    }

    /**
     * Creates a new Item with an updated status
     * @param existingItem The item to update
     * @param newStatus The new status
     * @returns A new Item instance with updated status
     */
    static updateStatus(
        existingItem: Item,
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
            existingItem.category,
            existingItem.claimedBy,
            newStatus,
            existingItem.images,
            existingItem.createdAt,
            new Date()
        );
    }

    /**
     * Creates a new Item with updated claimedBy field and status
     * @param existingItem The item to update
     * @param claimedBy The user claiming the item
     * @returns A new Item instance with updated claimedBy and status
     */
    static updateClaimedBy(
        existingItem: Item,
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
            existingItem.category,
            claimedBy,
            ItemStatus.CLAIMED,
            existingItem.images,
            existingItem.createdAt,
            new Date()
        );
    }
}