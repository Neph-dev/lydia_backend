import { Request, Response } from 'express';
import { getItemsBySupplier } from '../useCases';
import { MongooseItemRepo } from '../infra/ItemRepo';
import { ErrorResponse } from '../../../constants';
import { AppError } from '../../../utils';

export const getItemsBySupplierController = async (req: Request, res: Response) => {
    const { GENERIC } = ErrorResponse;

    try {
        const repo = new MongooseItemRepo();

        const { supplierId } = req.params;

        const items = await getItemsBySupplier(supplierId, repo);
        res.status(200).json({
            status: 200,
            message: 'Items retrieved',
            items
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

// TODO: Add a controller for getItemsByStatus
// TODO: Add a controller for getItemsByType
