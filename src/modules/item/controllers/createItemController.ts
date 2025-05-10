import { Request, Response } from 'express';
import { createItem } from '../useCases';
import { MongooseItemRepo } from '../infra/ItemRepo';

export const createItemController = async (req: Request, res: Response) => {
    const repo = new MongooseItemRepo();

    try {
        const item = await createItem(req.body, repo);
        res.status(201).json({ message: 'Item created', item });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};