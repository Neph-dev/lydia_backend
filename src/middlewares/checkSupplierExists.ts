import { Request, Response, NextFunction } from 'express';
import { MongooseSupplierRepo } from '../modules/supplier/infra/SupplierRepo';
import { requireAuth } from './auth';
import { AppError, logger } from '../utils';
import { ErrorResponse } from '../constants';

/**
 * Middleware to check if the authenticated user has a supplier profile
 * Attaches supplier object to request if found
 */
const { AUTH } = ErrorResponse;

export const checkSupplierExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        requireAuth(req, res, async (err) => {
            if (err) {
                return next(err);
            }

            const sub = req.auth?.payload.sub;
            if (!sub) {
                return res.status(401).json(AUTH.AUTH_REQUIRED);
            }

            const supplierRepo = new MongooseSupplierRepo();
            const supplier = await supplierRepo.findBySub(sub);

            if (supplier) {
                (req as any).supplier = supplier;
            }

            logger.info(`Supplier check for ${req.path}`, {
                sub,
                supplierFound: !!supplier,
                path: req.path,
                method: req.method
            });

            next();
        });
    } catch (error) {
        logger.error('Error in checkBeneficiaryExists middleware', {
            error: error instanceof Error ? error.message : 'Unknown error',
            path: req.path
        });
        next(error);
    }
};

export const requireSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await checkSupplierExists(req, res, () => {
            if (!req.headers.authorization) {
                return res.status(401).json(AUTH.AUTH_REQUIRED);
            }

            if (!(req as any).supplier) {
                logger.info('Supplier not found', {
                });
                return res.status(404).json({
                    ...AUTH.SUPPLIER_NOT_FOUND,
                    requiresOnboarding: true
                });
            }
            next();
        });
    } catch (error) {
        logger.error('Error in requireSupplier middleware', {
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        next(error);
    }
};