import { ErrorResponse } from "../../../constants";
import { AppError } from "../../../utils";
import { SupplierBase } from "../types";

const { SUPPLIER } = ErrorResponse;

export const validateSupplier = (fields: SupplierBase): void => {
    const missingFields: string[] = [];

    const requiredFields = [
        { field: fields.name, path: 'name' },
        { field: fields.emailAddress, path: 'emailAddress' },
        { field: fields.phoneNumber, path: 'phoneNumber' },
        { field: fields.address, path: 'address' },
        { field: fields.establishment, path: 'establishment' },
        { field: fields.donationSchedule, path: 'donationSchedule' },
    ];

    for (const { field, path } of requiredFields) {
        if (!field) {
            missingFields.push(path);
        }
    }

    if (fields.donationSchedule) {
        if (!fields.donationSchedule.days || fields.donationSchedule.days.length === 0) {
            missingFields.push('donationSchedule.days');
        }

        if (!fields.donationSchedule.frequency) {
            missingFields.push('donationSchedule.frequency');
        }
    }

    if (missingFields.length > 0) {
        throw new AppError(
            `The following required fields are missing: ${missingFields.join(', ')}`,
            SUPPLIER.FIELDS.MISSING_FIELDS.code,
            SUPPLIER.FIELDS.MISSING_FIELDS.statusCode
        );
    }
};