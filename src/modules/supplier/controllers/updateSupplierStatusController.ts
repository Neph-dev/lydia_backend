import { Request, Response } from 'express';
import { updateSupplierStatus } from '../useCases/updateSupplierStatus';
import { MongooseSupplierRepo } from '../infra/SupplierRepo';
import { AccountStatus } from '../../../shared/types';
import { AppError } from '../../../utils';
import { ErrorResponse } from '../../../constants';

export const updateSupplierStatusController = async (req: Request, res: Response) => {
    const { GENERIC } = ErrorResponse;
    try {
        const { id } = req.params;
        const { status } = req.body;

        const repo = new MongooseSupplierRepo();

        if (!Object.values(AccountStatus).includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const supplier = await updateSupplierStatus(id, status as AccountStatus, repo);
        res.status(200).json({
            status: 200,
            message: 'Status updated',
            supplier
        });
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                code: error.code,
                status: error.statusCode,
            });
        }

        res.status(500).json({
            GENERIC
        });
    }
};
