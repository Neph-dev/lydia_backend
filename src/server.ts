require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createSupplierController } from './modules/supplier/controllers';
import { updateSupplierStatusController } from './modules/supplier/controllers/updateSupplierStatusController';
import { createItemController } from './modules/item/controllers/createItemController';
import { getItemsBySupplierController } from './modules/item/controllers/getItemsController';
import rateLimit from 'express-rate-limit';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

const PORT = process.env.PORT || 3001;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';
const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
}

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 500,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (req, res, next, options) =>
        res.status(options.statusCode).send(options.message),
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

const checkJwt = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_DOMAIN,
});

app.post('/api/v1/create-supplier', checkJwt, createSupplierController);
app.patch('/api/v1/supplier/:id/status', checkJwt, async (req: Request, res: Response, next) => {
    try {
        await updateSupplierStatusController(req, res);
    } catch (error) {
        next(error);
    }
});
app.post('/api/v1/create-item', checkJwt, createItemController);
app.get('/api/v1/get-supplier-items', checkJwt, getItemsBySupplierController);

app.get('/api/v1/health', (req: Request, res: Response): void => {
    res.status(200).send('OK');
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
