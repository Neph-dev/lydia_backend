import express, { NextFunction, Request, Response } from 'express';
import { createSupplierController } from '../modules/supplier/controllers';
import { updateSupplierStatusController } from '../modules/supplier/controllers/updateSupplierStatusController';
import { createItemController } from '../modules/item/controllers/createItemController';
import { getItemsBySupplierController } from '../modules/item/controllers/getItemsController';

const apiRouter = express.Router();

/**
 * Supplier routes
 */
apiRouter.post('/create-supplier', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createSupplierController(req, res);
    } catch (error) {
        next(error);
    }
});

apiRouter.patch('/supplier/:id/status', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateSupplierStatusController(req, res);
    } catch (error) {
        next(error);
    }
});

/**
 * Item routes
 */
apiRouter.post('/create-item', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createItemController(req, res);
    } catch (error) {
        next(error);
    }
});

apiRouter.get('/get-supplier-items', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getItemsBySupplierController(req, res);
    } catch (error) {
        next(error);
    }
});

export default apiRouter;