import { ErrorResponse } from "../../../constants";
import { AppError } from "../../../utils";
import { BeneficiaryBase } from "../types";

const { FIELDS } = ErrorResponse;

export const validateBeneficiary = (fields: BeneficiaryBase): void => {
    const missingFields: string[] = [];

    const requiredFields = [
        { field: fields.name, path: 'name' },
        { field: fields.emailAddress, path: 'emailAddress' },
        { field: fields.phoneNumber, path: 'phoneNumber' },
        { field: fields.address, path: 'address' },
    ];

    for (const { field, path } of requiredFields) {
        if (!field) {
            missingFields.push(path);
        }
    }

    if (missingFields.length > 0) {
        throw new AppError(
            `The following required fields are missing: ${missingFields.join(', ')}`,
            FIELDS.MISSING_FIELDS.code,
            FIELDS.MISSING_FIELDS.statusCode
        );
    }
};