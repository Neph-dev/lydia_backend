import { Request, Response } from 'express';
import { ErrorResponse } from '../../../constants';
import { MongooseOrderRepo } from '../infra/OrderRepo';
import { AppError } from '../../../utils';
import { createOrder } from '../useCases';
import { MongooseItemRepo } from '../../item/infra/ItemRepo';

export const createOrderController = async (req: Request, res: Response) => {
    const { GENERIC } = ErrorResponse;

    try {
        const orderRepo = new MongooseOrderRepo();
        const itemRepo = new MongooseItemRepo();

        const order = await createOrder(req.body, orderRepo, itemRepo);
        res.status(201).json({
            status: 201,
            message: 'Order created',
            order
        });
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                code: error.code,
                status: error.statusCode,
                details: error?.details ? error.details : undefined,
            });
        }

        res.status(500).json({
            GENERIC
        });
    }

};