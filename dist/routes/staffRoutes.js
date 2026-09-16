"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffController_js_1 = require("../controllers/staffController.js");
const auth_js_1 = require("../middleware/auth.js");
const rbac_js_1 = require("../middleware/rbac.js");
const router = (0, express_1.Router)();
// All staff routes require authentication
router.use(auth_js_1.authenticateToken);
// Read staff list and details (both Super Admin and Moderator can read)
router.get('/', staffController_js_1.StaffController.getStaffList);
router.get('/:id', staffController_js_1.StaffController.getStaffById);
// Create, Toggle Status, and Delete strictly require Super Admin
router.post('/', rbac_js_1.requireSuperAdmin, staffController_js_1.StaffController.createStaff);
router.patch('/:id/status', rbac_js_1.requireSuperAdmin, staffController_js_1.StaffController.toggleStatus);
router.delete('/:id', rbac_js_1.requireSuperAdmin, staffController_js_1.StaffController.deleteStaff);
// Update staff: Super Admin can update any; Moderator can only update their own non-role fields
router.put('/:id', rbac_js_1.requireSelfOrSuperAdmin, staffController_js_1.StaffController.updateStaff);
exports.default = router;
