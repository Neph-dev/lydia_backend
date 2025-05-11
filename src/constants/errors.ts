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
        },
        FIELDS: {
            MISSING_FIELDS: {
                message: "Missing fields :fields",
                code: "MISSING_FIELDS",
                statusCode: 400,
            }
        }
    }
};