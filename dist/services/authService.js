"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Staff_js_1 = require("../models/Staff.js");
const env_js_1 = require("../config/env.js");
const staff_types_js_1 = require("../types/staff.types.js");
class AuthService {
    static async login(email, candidatePassword) {
        const staff = await Staff_js_1.Staff.findOne({ email: email.toLowerCase().trim() }).select('+password');
        if (!staff) {
            throw { status: 401, message: 'Invalid email or password.' };
        }
        const isMatch = await staff.comparePassword(candidatePassword);
        if (!isMatch) {
            throw { status: 401, message: 'Invalid email or password.' };
        }
        if (staff.status !== 'active') {
            throw { status: 403, message: 'Your account is inactive. Please contact a Super Admin.' };
        }
        // Update lastLogin timestamp
        staff.lastLogin = new Date();
        await staff.save();
        const payload = {
            userId: staff._id.toString(),
            email: staff.email,
            role: staff.role,
            name: staff.name,
        };
        const token = jsonwebtoken_1.default.sign(payload, env_js_1.ENV.JWT_SECRET, {
            expiresIn: env_js_1.ENV.JWT_EXPIRES_IN,
        });
        return {
            token,
            staff: (0, staff_types_js_1.formatStaff)(staff),
        };
    }
    static async getProfile(userId) {
        const staff = await Staff_js_1.Staff.findById(userId);
        if (!staff) {
            throw { status: 404, message: 'Staff profile not found.' };
        }
        return (0, staff_types_js_1.formatStaff)(staff);
    }
    static async updateProfile(userId, data) {
        const staff = await Staff_js_1.Staff.findById(userId).select('+password');
        if (!staff) {
            throw { status: 404, message: 'Staff profile not found.' };
        }
        if (data.name && data.name.trim()) {
            staff.name = data.name.trim();
        }
        if (data.password && data.password.trim()) {
            if (data.password.length < 6) {
                throw { status: 400, message: 'Password must be at least 6 characters long.' };
            }
            staff.password = data.password;
        }
        await staff.save();
        return (0, staff_types_js_1.formatStaff)(staff);
    }
}
exports.AuthService = AuthService;
