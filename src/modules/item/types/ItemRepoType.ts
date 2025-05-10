import { Item } from "../domain";

export interface ItemRepo {
    save(item: Item): Promise<void>;
    findById(id: string): Promise<Item | null>;
    findByAnything(key: string, value: string): Promise<Item[]>;
    updateStatus(id: string, item: Item, newStatus: string): Promise<Item | null>;
    update(id: string, item: Item): Promise<Item | null>;
    delete(id: string): Promise<void>;
}