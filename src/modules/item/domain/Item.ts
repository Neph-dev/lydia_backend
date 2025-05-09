import { ObjectId } from "mongoose";

export class Item {
    constructor(
        public supplierId: ObjectId,
        public name: string,
        type: string,
        public description: string,
        public price: number,
        public quantity: number,
        public category: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        if (!this.name || !this.price || !this.quantity || !this.category) {
            throw new Error('Item must have a name, price, quantity, and category');
        }
    }
}