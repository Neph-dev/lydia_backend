import { ErrorResponse } from '../../../constants';
import { AccountStatus } from '../../../shared/types';
import { AppError } from '../../../utils';
import { Supplier } from '../domain/Supplier';
import { SupplierRepo } from '../types';

export const updateSupplierStatus = async (
    id: string,
    newStatus: AccountStatus,
    supplierRepo: SupplierRepo
): Promise<Supplier> => {
    const { SUPPLIER } = ErrorResponse;

    const exists = await supplierRepo.findById(id);
    if (!exists) {
        throw new AppError(
            SUPPLIER.NOT_FOUND.message.replace(':id', id),
            SUPPLIER.NOT_FOUND.code,
            SUPPLIER.NOT_FOUND.statusCode
        );
    }

    if (exists.status === newStatus) {
        throw new AppError(
            SUPPLIER.SAME_STATUS.message.replace(':status', newStatus),
            SUPPLIER.SAME_STATUS.code,
            SUPPLIER.SAME_STATUS.statusCode
        );
    }

    const supplier = await supplierRepo.updateStatus(id, exists, newStatus);

    if (!supplier) {
        throw new AppError(
            SUPPLIER.UPDATE_STATUS.message,
            SUPPLIER.UPDATE_STATUS.code,
            SUPPLIER.UPDATE_STATUS.statusCode
        );
    }

    return supplier;
};
