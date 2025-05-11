import { ErrorResponse } from '../../../constants';
import { AppError } from '../../../utils';
import { Supplier } from '../domain/Supplier';
import { CreateSupplierDTO, SupplierRepo } from '../types';

export const createSupplier = async (
    dto: CreateSupplierDTO,
    supplierRepo: SupplierRepo
): Promise<Supplier> => {
    const { SUPPLIER } = ErrorResponse;

    const existingSupplier = await supplierRepo.findByEmail(dto.emailAddress);

    if (existingSupplier) {
        throw new AppError(
            SUPPLIER.DUPLICATE_EMAIL.message,
            SUPPLIER.DUPLICATE_EMAIL.code,
            SUPPLIER.DUPLICATE_EMAIL.statusCode
        );
    }

    const supplier = Supplier.create(dto);
    await supplierRepo.save(supplier);

    return supplier;
};
