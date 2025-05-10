import { AccountStatus } from '../../../shared/types';
import { Supplier } from '../domain/Supplier';
import { SupplierRepo } from '../types';

export const updateSupplierStatus = async (
    id: string,
    newStatus: AccountStatus,
    supplierRepo: SupplierRepo
): Promise<Supplier> => {
    const exists = await supplierRepo.findById(id);
    if (!exists) {
        throw new Error('Supplier not found');
    }

    if (exists.status === newStatus) {
        throw new Error('Supplier already has this status');
    }

    const supplier = await supplierRepo.updateStatus(id, exists, newStatus);

    if (!supplier) {
        throw new Error('Failed to update supplier status');
    }

    return supplier;
};
