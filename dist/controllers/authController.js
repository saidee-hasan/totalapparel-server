"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_js_1 = require("../services/authService.js");
class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: 'Please provide both email and password.',
                });
                return;
            }
            const result = await authService_js_1.AuthService.login(email, password);
            res.status(200).json({
                success: true,
                message: 'Login successful.',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getMe(req, res, next) {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Not authenticated.' });
                return;
            }
            const staff = await authService_js_1.AuthService.getProfile(req.user._id);
            res.status(200).json({
                success: true,
                data: staff,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProfile(req, res, next) {
        try {
            if (!req.user) {
                res.status(401).json({ success: false, message: 'Not authenticated.' });
                return;
            }
            const { name, password } = req.body;
            const updated = await authService_js_1.AuthService.updateProfile(req.user._id, { name, password });
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully.',
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
