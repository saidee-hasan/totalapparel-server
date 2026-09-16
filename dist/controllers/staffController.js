"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
const staffService_js_1 = require("../services/staffService.js");
class StaffController {
    static async getStaffList(req, res, next) {
        try {
            const { search, role, status, page, limit, sortBy, sortOrder } = req.query;
            const result = await staffService_js_1.StaffService.getStaffList({
                search: search,
                role: role,
                status: status,
                page: page ? parseInt(page, 10) : 1,
                limit: limit ? parseInt(limit, 10) : 10,
                sortBy: sortBy,
                sortOrder: sortOrder,
            });
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getStaffById(req, res, next) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const staff = await staffService_js_1.StaffService.getStaffById(id);
            res.status(200).json({
                success: true,
                data: staff,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async createStaff(req, res, next) {
        try {
            const { name, email, password, role, status } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({
                    success: false,
                    message: 'Name, email, and password are required.',
                });
                return;
            }
            const newStaff = await staffService_js_1.StaffService.createStaff({
                name,
                email,
                password,
                role,
                status,
            });
            res.status(201).json({
                success: true,
                message: 'Staff member created successfully.',
                data: newStaff,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStaff(req, res, next) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { name, email, role, status, password } = req.body;
            const updated = await staffService_js_1.StaffService.updateStaff(id, {
                name,
                email,
                role,
                status,
                password,
            });
            res.status(200).json({
                success: true,
                message: 'Staff updated successfully.',
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async toggleStatus(req, res, next) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const updated = await staffService_js_1.StaffService.toggleStatus(id, req.user._id);
            res.status(200).json({
                success: true,
                message: `Staff account status changed to ${updated.status}.`,
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteStaff(req, res, next) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await staffService_js_1.StaffService.deleteStaff(id, req.user._id);
            res.status(200).json({
                success: true,
                message: 'Staff member deleted successfully.',
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StaffController = StaffController;
