import { SupplierModel } from './SupplierModel';
import { Supplier } from '../domain/Supplier';
import { SupplierRepo } from '../types';
import { AccountStatus } from '../../../shared/types';

export class MongooseSupplierRepo implements SupplierRepo {
    async save(supplier: Supplier): Promise<void> {
        const doc = new SupplierModel({
            ...supplier,
            status: AccountStatus.PENDING
        });
        await doc.save();
    }

    async findByEmail(email: string): Promise<Supplier | null> {
        try {
            if (!email) return null;
            const doc = await SupplierModel.findOne({ emailAddress: email });
            if (!doc) return null;

            return new Supplier(
                doc.name,
                doc.establishment,
                doc.address,
                doc.phoneNumber,
                doc.emailAddress,
                doc.donationSchedule,
                doc.description,
                doc.website,
                doc.coverPicture,
                doc.status,
                doc.createdAt
            );
        } catch (error) {
            console.error(`Database error in findByEmail: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to check supplier by email: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }

    async findById(id: string): Promise<Supplier | null> {
        try {
            if (!id) return null;
            const doc = await SupplierModel.findById(id);
            if (!doc) return null;

            return new Supplier(
                doc.name,
                doc.establishment,
                doc.address,
                doc.phoneNumber,
                doc.emailAddress,
                doc.donationSchedule,
                doc.description,
                doc.website,
                doc.coverPicture,
                doc.status,
                doc.createdAt
            );
        } catch (error) {
            console.error(`Database error in findById: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to check supplier by ID: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }

    async updateStatus(id: string, supplier: Supplier, newStatus: AccountStatus): Promise<Supplier | null> {
        try {
            if (!supplier) return null;
            const updatedSupplier = await SupplierModel.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true }
            );

            if (!updatedSupplier) return null;

            return new Supplier(
                updatedSupplier.name,
                updatedSupplier.establishment,
                updatedSupplier.address,
                updatedSupplier.phoneNumber,
                updatedSupplier.emailAddress,
                updatedSupplier.donationSchedule,
                updatedSupplier.description,
                updatedSupplier.website,
                updatedSupplier.coverPicture,
                updatedSupplier.status,
                updatedSupplier.createdAt
            );
        } catch (error) {
            console.error(`Database error in updateStatus: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw new Error(`Failed to update supplier status: ${error instanceof Error ? error.message : 'Database connection issue'}`);
        }
    }
}
