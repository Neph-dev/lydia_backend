import { Request, Response } from 'express';
import { createSupplier } from '../useCases';
import { MongooseSupplierRepo } from '../infra/SupplierRepo';

export const createSupplierController = async (req: Request, res: Response) => {
    try {
        const repo = new MongooseSupplierRepo();

        const supplier = await createSupplier(req.body, repo);
        res.status(201).json({ message: 'Supplier created', supplier });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
