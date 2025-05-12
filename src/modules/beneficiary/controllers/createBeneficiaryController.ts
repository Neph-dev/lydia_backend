import { Request, Response } from 'express';
import { AppError } from '../../../utils';
import { ErrorResponse } from '../../../constants';
import { MongooseBeneficiaryRepo } from '../infra/BenefiaciaryRepo';
import { createBeneficiary } from '../useCases';

export const createBeneficiaryController = async (req: Request, res: Response) => {
    const { GENERIC } = ErrorResponse;
    try {
        const repo = new MongooseBeneficiaryRepo();

        const beneficiary = await createBeneficiary(req.body, repo);
        res.status(201).json({
            status: 201,
            message: 'Beneficiary created',
            beneficiary
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
