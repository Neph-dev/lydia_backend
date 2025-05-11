import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 500,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (req, res, next, options) =>
        res.status(options.statusCode).send(options.message),
});