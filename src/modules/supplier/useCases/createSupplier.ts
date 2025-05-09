import { Supplier } from '../domain/Supplier';
import { CreateSupplierDTO, SupplierRepo } from '../types';

export const createSupplier = async (
    dto: CreateSupplierDTO,
    supplierRepo: SupplierRepo
): Promise<Supplier> => {
    const supplier = Supplier.create(dto);
    const exists = await supplierRepo.findByEmail(dto.emailAddress);

    if (exists) {
        throw new Error('Supplier with this email already exists');
    }

    await supplierRepo.save(supplier);
    return supplier;
};
