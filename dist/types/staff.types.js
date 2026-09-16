"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStaff = void 0;
const formatStaff = (doc) => {
    const json = typeof doc.toJSON === 'function' ? doc.toJSON() : doc;
    return {
        _id: String(json._id),
        name: json.name,
        email: json.email,
        role: json.role,
        status: json.status,
        lastLogin: json.lastLogin || null,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt,
    };
};
exports.formatStaff = formatStaff;
