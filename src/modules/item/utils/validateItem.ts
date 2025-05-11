import { ErrorResponse } from "../../../constants";
import { AppError } from "../../../utils";
import { ItemBase } from "../types";

const { FIELDS } = ErrorResponse;

export const validateItem = (item: ItemBase) => {
    const missingFields: string[] = [];

    const requiredFields = [
        { field: item.supplierId, path: 'supplierId' },
        { field: item.name, path: 'name' },
        { field: item.type, path: 'type' },
        { field: item.quantity, path: 'quantity' },
        { field: item.bestBefore, path: 'bestBefore' },
        { field: item.readyBy, path: 'readyBy' },
        { field: item.description, path: 'description' },
        { field: item.category, path: 'category' }
    ];

    for (const { field, path } of requiredFields) {
        if (field === undefined || field === null ||
            (typeof field === 'string' && field.trim() === '') ||
            (field instanceof Date && isNaN(field.getTime()))) {
            missingFields.push(path);
        }
    }

    if (missingFields.length > 0) {
        throw new AppError(
            `The following required fields are missing or invalid: ${missingFields.join(', ')}`,
            FIELDS.MISSING_FIELDS?.code,
            FIELDS?.MISSING_FIELDS?.statusCode,
        );
    }

    if (item.bestBefore && item.readyBy && item.bestBefore < item.readyBy) {
        throw new AppError(
            'Best before date must be after or equal to the ready by date',
            FIELDS?.INVALID_DATES?.code || 'INVALID_DATES',
            FIELDS?.INVALID_DATES?.statusCode || 400
        );
    }
};