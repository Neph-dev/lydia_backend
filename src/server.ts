require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createSupplierController } from './modules/supplier/controllers';
import { updateSupplierStatusController } from './modules/supplier/controllers/updateSupplierStatusController';
import { createItemController } from './modules/item/controllers/createItemController';
import { getItemsBySupplierController } from './modules/item/controllers/getItemsController';

const uri = process.env.MONGODB_URL ?? '';
if (!uri) {
    throw new Error('MONGODB_URL environment variable is not set');
}

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/v1/create-supplier', createSupplierController);
app.patch('/api/v1/supplier/:id/status', async (req: Request, res: Response, next) => {
    try {
        await updateSupplierStatusController(req, res);
    } catch (error) {
        next(error);
    }
});

app.post('/api/v1/create-item', createItemController);
app.get('/api/v1/get-supplier-items', getItemsBySupplierController);

app.get('/api/v1/health', (req: Request, res: Response): void => {
    res.status(200).send('OK');
});

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB with Mongoose');
        app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
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
