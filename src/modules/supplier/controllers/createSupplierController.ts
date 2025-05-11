import { Request, Response } from 'express';
import { createSupplier } from '../useCases';
import { MongooseSupplierRepo } from '../infra/SupplierRepo';
import { AppError } from '../../../utils';
import { ErrorResponse } from '../../../constants';

export const createSupplierController = async (req: Request, res: Response) => {
    const { GENERIC } = ErrorResponse;
    try {
        const repo = new MongooseSupplierRepo();

        const supplier = await createSupplier(req.body, repo);
        res.status(201).json({
            status: 201,
            message: 'Supplier created',
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
