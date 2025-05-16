import { Request, Response } from 'express';
import { getSupplierProfile } from '../useCases';
import { MongooseSupplierRepo } from '../infra/SupplierRepo';
import { AppError } from '../../../utils';
import { ErrorResponse } from '../../../constants';

export const getSupplierProfileController = async (req: Request, res: Response) => {
    const { NOT_FOUND, AUTH, GENERIC } = ErrorResponse;
    const sub = req.auth?.payload.sub;

    try {
        if (!sub) {
            throw new AppError(
                AUTH.AUTH_REQUIRED.message,
                AUTH.AUTH_REQUIRED.code,
                AUTH.AUTH_REQUIRED.statusCode
            );
        }

        const repo = new MongooseSupplierRepo();
        const supplier = await getSupplierProfile(repo, sub);

        if (!supplier) {
            throw new AppError(
                NOT_FOUND.message,
                NOT_FOUND.code,
                NOT_FOUND.statusCode
            );
        }

        res.status(200).json({
            status: 200,
            message: 'Supplier profile retrieved',
            data: {
                needsOnboarding: false,
                userType: 'supplier',
                profile: supplier || null
            }
        });
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                code: error.code,
                status: error.statusCode,
            });
        }

        res.status(500).json(GENERIC);
    }
};