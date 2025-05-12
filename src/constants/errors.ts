export const ErrorResponse = {
    GENERIC: {
        statusCode: 500,
        message: "Internal server error",
    },
    NOT_FOUND: {
        statusCode: 404,
        message: "Resource not found",
    },
    AUTH: {
        INVALID_TOKEN: {
            statusCode: 401,
            message: "Invalid or missing token",
        },
    },
    CORS: {
        NOT_ALLOWED: {
            statusCode: 403,
            message: "Not allowed by CORS",
        },
    },
    MISSING_PARAMS: {
        statusCode: 400,
        code: "MISSING_PARAMS",
        message: "Missing parameters: :param",
    },
    FIELDS: {
        MISSING_FIELDS: {
            message: "Missing fields :fields",
            code: "MISSING_FIELDS",
            statusCode: 400,
        },
        INVALID_DATES: {
            message: "Invalid dates",
            code: "INVALID_DATES",
            statusCode: 400,
        },
    },
    INVALID_STATUS: {
        message: "Invalid status",
        code: "INVALID_STATUS",
        statusCode: 400,
    },
    SUPPLIER: {
        DUPLICATE_EMAIL: {
            message: "Supplier with this email already exists",
            code: "SUPPLIER_DUPLICATE_EMAIL",
            statusCode: 409,
        },
        NOT_FOUND: {
            message: "Supplier with id :id not found",
            code: "SUPPLIER_NOT_FOUND",
            statusCode: 404,
        },
        SAME_STATUS: {
            message: "Supplier already has status :status",
            code: "SAME_STATUS",
            statusCode: 409,
        },
        UPDATE_STATUS: {
            message: "Failed to update supplier status",
            code: "SUPPLIER_UPDATE_STATUS",
            statusCode: 500,
        }
    },
    BENEFICIARY: {
        DUPLICATE_EMAIL: {
            message: "Beneficiary with this email already exists",
            code: "BENEFICIARY_DUPLICATE_EMAIL",
            statusCode: 409,
        },
        NOT_FOUND: {
            message: "Beneficiary with id :id not found",
            code: "BENEFICIARY_NOT_FOUND",
            statusCode: 404,
        },
        SAME_STATUS: {
            message: "Beneficiary already has status :status",
            code: "SAME_STATUS",
            statusCode: 409,
        },
        UPDATE_STATUS: {
            message: "Failed to update Beneficiary status",
            code: "BENEFICIARY_UPDATE_STATUS",
            statusCode: 500,
        }
    },
    ITEM: {
        NOT_FOUND: {
            message: "Item with id :id not found",
            code: "ITEM_NOT_FOUND",
            statusCode: 404,
        },
        DUPLICATE_NAME: {
            message: "Item with this name already exists",
            code: "ITEM_DUPLICATE_NAME",
            statusCode: 409,
        },
        FIELDS: {
            MISSING_FIELDS: {
                message: "Missing fields :fields",
                code: "MISSING_FIELDS",
                statusCode: 400,
            }
        },
        FETCH_FAILED: {
            message: "Failed to fetch items",
            code: "ITEM_FETCH_FAILED",
            statusCode: 500,
        }
    }
};