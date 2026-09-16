"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
const Staff_js_1 = require("../models/Staff.js");
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Access token required. Please login.',
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.ENV.JWT_SECRET);
        const staff = await Staff_js_1.Staff.findById(decoded.userId);
        if (!staff) {
            res.status(401).json({
                success: false,
                message: 'Account no longer exists. Please login again.',
            });
            return;
        }
        if (staff.status !== 'active') {
            res.status(403).json({
                success: false,
                message: 'Your account is inactive. Please contact a Super Admin.',
            });
            return;
        }
        req.user = staff.toJSON();
        next();
    }
    catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                message: 'Session expired. Please login again.',
            });
            return;
        }
        res.status(401).json({
            success: false,
            message: 'Invalid authorization token.',
        });
    }
};
exports.authenticateToken = authenticateToken;
