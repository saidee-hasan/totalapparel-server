"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const Staff_js_1 = require("../models/Staff.js");
const staff_types_js_1 = require("../types/staff.types.js");
class StaffService {
    static async getStaffList(query) {
        const { search = '', role = 'all', status = 'all', page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = query;
        const filter = {};
        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), 'i');
            filter.$or = [
                { name: searchRegex },
                { email: searchRegex },
            ];
        }
        if (role && role !== 'all') {
            filter.role = role;
        }
        if (status && status !== 'all') {
            filter.status = status;
        }
        const pageNum = Math.max(1, Number(page));
        const limitNum = Math.max(1, Math.min(100, Number(limit)));
        const skip = (pageNum - 1) * limitNum;
        const sortOption = {
            [sortBy]: sortOrder === 'asc' ? 1 : -1,
        };
        const [staffList, total, totalSuperAdmin, totalModerator, totalActive, totalInactive] = await Promise.all([
            Staff_js_1.Staff.find(filter)
                .sort(sortOption)
                .skip(skip)
                .limit(limitNum),
            Staff_js_1.Staff.countDocuments(filter),
            Staff_js_1.Staff.countDocuments({ role: 'superadmin' }),
            Staff_js_1.Staff.countDocuments({ role: 'moderator' }),
            Staff_js_1.Staff.countDocuments({ status: 'active' }),
            Staff_js_1.Staff.countDocuments({ status: 'inactive' }),
        ]);
        return {
            staff: staffList.map((s) => (0, staff_types_js_1.formatStaff)(s)),
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum) || 1,
            },
            stats: {
                totalStaff: totalSuperAdmin + totalModerator,
                totalSuperAdmin,
                totalModerator,
                totalActive,
                totalInactive,
            },
        };
    }
    static async getStaffById(id) {
        const staff = await Staff_js_1.Staff.findById(id);
        if (!staff) {
            throw { status: 404, message: 'Staff member not found.' };
        }
        return (0, staff_types_js_1.formatStaff)(staff);
    }
    static async createStaff(data) {
        const emailNormalized = data.email.toLowerCase().trim();
        const existing = await Staff_js_1.Staff.findOne({ email: emailNormalized });
        if (existing) {
            throw { status: 409, message: 'A staff member with this email already exists.' };
        }
        if (!data.password || data.password.length < 6) {
            throw { status: 400, message: 'Password must be at least 6 characters long.' };
        }
        const newStaff = new Staff_js_1.Staff({
            name: data.name.trim(),
            email: emailNormalized,
            password: data.password,
            role: data.role || 'moderator',
            status: data.status || 'active',
        });
        await newStaff.save();
        return (0, staff_types_js_1.formatStaff)(newStaff);
    }
    static async updateStaff(id, data) {
        const staff = await Staff_js_1.Staff.findById(id).select('+password');
        if (!staff) {
            throw { status: 404, message: 'Staff member not found.' };
        }
        if (data.email && data.email.toLowerCase().trim() !== staff.email) {
            const emailNormalized = data.email.toLowerCase().trim();
            const existing = await Staff_js_1.Staff.findOne({ email: emailNormalized, _id: { $ne: id } });
            if (existing) {
                throw { status: 409, message: 'Another staff member already uses this email address.' };
            }
            staff.email = emailNormalized;
        }
        if (data.name && data.name.trim()) {
            staff.name = data.name.trim();
        }
        if (data.role) {
            staff.role = data.role;
        }
        if (data.status) {
            staff.status = data.status;
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
    static async toggleStatus(id, currentUserId) {
        const staff = await Staff_js_1.Staff.findById(id);
        if (!staff) {
            throw { status: 404, message: 'Staff member not found.' };
        }
        if (String(staff._id) === String(currentUserId) && staff.status === 'active') {
            throw { status: 400, message: 'You cannot deactivate your own account.' };
        }
        staff.status = staff.status === 'active' ? 'inactive' : 'active';
        await staff.save();
        return (0, staff_types_js_1.formatStaff)(staff);
    }
    static async deleteStaff(id, currentUserId) {
        if (String(id) === String(currentUserId)) {
            throw { status: 400, message: 'You cannot delete your own account.' };
        }
        const staff = await Staff_js_1.Staff.findById(id);
        if (!staff) {
            throw { status: 404, message: 'Staff member not found.' };
        }
        // Safety check: ensure at least one superadmin remains
        if (staff.role === 'superadmin') {
            const superAdminCount = await Staff_js_1.Staff.countDocuments({ role: 'superadmin' });
            if (superAdminCount <= 1) {
                throw { status: 400, message: 'Cannot delete the only Super Admin account in the system.' };
            }
        }
        await Staff_js_1.Staff.findByIdAndDelete(id);
    }
}
exports.StaffService = StaffService;
