import { SupplierModel } from './SupplierModel';
import { Supplier } from '../domain/Supplier';
import { SupplierRepo } from '../types';
import { AccountStatus } from '../../../shared/types';
import { executeDatabaseOperation } from '../../../shared/utils';

export class MongooseSupplierRepo implements SupplierRepo {
    async save(supplier: Supplier): Promise<void> {
        const doc = new SupplierModel({
            ...supplier,
            status: AccountStatus.PENDING
        });
        await doc.save();
    }

    async findByEmail(email: string): Promise<Supplier | null> {
        return executeDatabaseOperation(async () => {
            if (!email) return null;
            const doc = await SupplierModel.findOne({ emailAddress: email });
            return this.documentToSupplier(doc);
        }, 'findByEmail');
    }

    async findById(id: string): Promise<Supplier | null> {
        return executeDatabaseOperation(async () => {
            if (!id) return null;
            const doc = await SupplierModel.findById(id);
            return this.documentToSupplier(doc);
        }, 'findById');
    }

    async updateStatus(id: string, supplier: Supplier, newStatus: AccountStatus): Promise<Supplier | null> {
        return executeDatabaseOperation(async () => {
            if (!supplier) return null;
            const updatedSupplier = await SupplierModel.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true }
            );
            return this.documentToSupplier(updatedSupplier);
        }, 'updateStatus');
    }

    async findBySub(sub: string): Promise<Supplier | null> {
        return executeDatabaseOperation(async () => {
            if (!sub) return null;
            const doc = await SupplierModel.findOne({ sub });
            return this.documentToSupplier(doc);
        }, 'findBySub');
    }

    private documentToSupplier(doc: any): Supplier | null {
        if (!doc) return null;

        return new Supplier(
            doc.sub,
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
            doc.createdAt,
            doc.updatedAt,
            doc._id
        );
    }
}
