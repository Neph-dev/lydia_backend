import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { createSupplierController } from './modules/supplier/controllers';
import { updateSupplierStatusController } from './modules/supplier/controllers/updateSupplierStatusController';
import { createItemController } from './modules/item/controllers/createItemController';
import { getItemsBySupplierController } from './modules/item/controllers/getItemsController';

import { requireAuth } from './middlewares';
import { rateLimiter } from './utils';
import { ErrorResponse } from './constants';


const PORT = process.env.PORT || 3001;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';
const MONGODB_URI = process.env.MONGODB_URI || '';
const NODE_ENV = process.env.NODE_ENV || 'development';
const { AUTH, CORS, GENERIC, NOT_FOUND } = ErrorResponse;

const missingVars = [];
if (!MONGODB_URI) missingVars.push('MONGODB_URI');
if (!AUTH0_DOMAIN) missingVars.push('AUTH0_DOMAIN');
if (!AUTH0_AUDIENCE) missingVars.push('AUTH0_AUDIENCE');

if (missingVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
}

const app = express();

const allowedOrigins = [ 'http://localhost:3000' ];
if (NODE_ENV === 'production') {
    allowedOrigins.push('http://localhost:3000');
}

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(CORS.NOT_ALLOWED.message));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.get('/api/v1/health', (req: Request, res: Response): void => {
    res.status(200).json({ status: 'OK', environment: NODE_ENV });
});

const apiRouter = express.Router();
apiRouter.post('/create-supplier', createSupplierController);
apiRouter.patch('/supplier/:id/status', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateSupplierStatusController(req, res);
    } catch (error) {
        next(error);
    }
});
apiRouter.post('/create-item', createItemController);
apiRouter.get('/get-supplier-items', getItemsBySupplierController);

app.use('/api/v1', requireAuth, apiRouter);

app.use((req: Request, res: Response) => {
    res.status(NOT_FOUND.statusCode).json({ NOT_FOUND });
});

app.use((err: any, req: Request, res: any, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(AUTH.INVALID_TOKEN.statusCode).json({
            error: AUTH.INVALID_TOKEN
        });
    }
    if (NODE_ENV !== 'production') {
        console.error('Error:', err);
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: NODE_ENV === 'production' ? GENERIC.message : err.message || GENERIC.message
    });
});

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB with Mongoose');
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('❌ Failed to connect to MongoDB:', err);
        process.exit(1);
    }
};

connectDB();

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('🛑 MongoDB connection closed due to app termination');
    process.exit(0);
});
