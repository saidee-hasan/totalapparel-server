"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `API Route not found: ${req.method} ${req.originalUrl}`,
    });
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, req, res, next) => {
    console.error('[Error Handler]', err);
    // Mongoose duplicate key error (E11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'Field';
        res.status(409).json({
            success: false,
            message: `A record with this ${field} already exists.`,
        });
        return;
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((val) => val.message);
        res.status(400).json({
            success: false,
            message: messages.join(', '),
        });
        return;
    }
    // CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        res.status(400).json({
            success: false,
            message: 'Invalid staff ID format.',
        });
        return;
    }
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
