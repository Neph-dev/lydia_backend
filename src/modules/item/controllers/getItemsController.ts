import { Request, Response } from 'express';
import { getItemsBySupplier } from '../useCases';
import { MongooseItemRepo } from '../infra/ItemRepo';

export const getItemsBySupplierController = async (req: Request, res: Response) => {
    const repo = new MongooseItemRepo();
    const { supplierId } = req.body;

    try {
        const items = await getItemsBySupplier(supplierId, repo);
        res.status(201).json({ message: 'Items fetched', items });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// TODO: Add a controller for getItemsByStatus
// TODO: Add a controller for getItemsByType
