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
    }
};