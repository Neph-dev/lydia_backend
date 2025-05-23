export const ErrorResponse = {
    GENERIC: {
        statusCode: 500,
        message: "Internal server error",
    },
    NOT_FOUND: {
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Resource not found",
    },
    AUTH: {
        GENERIC: {
            statusCode: 500,
            code: "AUTH_GENERIC",
            message: "Authentication error",
        },
        INVALID_TOKEN: {
            statusCode: 401,
            code: "INVALID_TOKEN",
            message: "Invalid or missing token",
        },
        AUTH_REQUIRED: {
            statusCode: 401,
            code: "AUTH_REQUIRED",
            message: "Authentication required",
        },
        ONBOARDING_REQUIRED: {
            statusCode: 401,
            code: "ONBOARDING_REQUIRED",
            message: "Onboarding required",
        },
        SUPPLIER_NOT_FOUND: {
            statusCode: 404,
            code: "SUPPLIER_NOT_FOUND",
            message: "Supplier not found",
        }
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
    },
    ORDER: {
        ITEMS_UNAVAILABLE: {
            message: "One or more items are not available",
            code: "ORDER_ITEMS_UNAVAILABLE",
            statusCode: 400,
        },
        NOT_FOUND: {
            message: "Order with id :id not found",
            code: "ORDER_NOT_FOUND",
            statusCode: 404,
        },
        DUPLICATE_ORDER_ID: {
            message: "Order with this orderId already exists",
            code: "ORDER_DUPLICATE_ORDER_ID",
            statusCode: 409,
        }
    },
    NOTIFICATION: {
        EMAIL: {
            message: "Failed to send email",
            code: "NOTIFICATION_EMAIL_FAILED",
            statusCode: 500,
        },
        FIELDS: {
            EMAIL_SUBJECT_MISSING: {
                message: "Subject is required",
                code: "NOTIFICATION_SUBJECT_MISSING",
                statusCode: 400,
            },
            EMAIL_CONTENT_MISSING: {
                message: "Email must have either text or HTML content",
                code: "NOTIFICATION_CONTENT_MISSING",
                statusCode: 400,
            },
            EMAIL_SENDER_MISSING: {
                message: "Sender email is required",
                code: "NOTIFICATION_SENDER_MISSING",
                statusCode: 400,
            },
            EMAIL_RECIPIENT_MISSING: {
                message: "Recipient email is required",
                code: "NOTIFICATION_RECIPIENT_MISSING",
                statusCode: 400,
            },
        }
    }
};