import { Request, Response } from 'express';
import { SupplierStatus } from '../types';
import { updateSupplierStatus } from '../useCases/updateSupplierStatus';
import { MongooseSupplierRepo } from '../infra/SupplierRepo';

export const updateSupplierStatusController = async (req: Request, res: Response) => {
    const repo = new MongooseSupplierRepo();

    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!Object.values(SupplierStatus).includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const supplier = await updateSupplierStatus(id, status as SupplierStatus, repo);
        res.status(200).json({ message: 'Status updated', supplier });
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'An error occurred' });
    }
};
