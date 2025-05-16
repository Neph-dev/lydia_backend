import { Supplier } from '../domain/Supplier';
import { SupplierRepo } from '../types';

export const getSupplierProfile = async (
    supplierRepo: SupplierRepo,
    sub: string
): Promise<Supplier | null> => {
    const supplier = await supplierRepo.findBySub(sub);

    return supplier;
};
