import { Request, Response } from 'express';
import { createItem } from '../useCases';
import { MongooseItemRepo } from '../infra/ItemRepo';
import { ErrorResponse } from '../../../constants';
import { AppError } from '../../../utils';

export const createItemController = async (req: Request, res: Response) => {
    const { GENERIC } = ErrorResponse;

    try {
        const repo = new MongooseItemRepo();

        const item = await createItem(req.body, repo);
        res.status(201).json({
            status: 201,
            message: 'Item created',
            item
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