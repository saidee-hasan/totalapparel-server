import { Router } from 'express';
import { StaffController } from '../controllers/staffController.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireSuperAdmin, requireSelfOrSuperAdmin } from '../middleware/rbac.js';

const router = Router();

// All staff routes require authentication
router.use(authenticateToken);

// Read staff list and details (both Super Admin and Moderator can read)
router.get('/', StaffController.getStaffList);
router.get('/:id', StaffController.getStaffById);

// Create, Toggle Status, and Delete strictly require Super Admin
router.post('/', requireSuperAdmin, StaffController.createStaff);
router.patch('/:id/status', requireSuperAdmin, StaffController.toggleStatus);
router.delete('/:id', requireSuperAdmin, StaffController.deleteStaff);

// Update staff: Super Admin can update any; Moderator can only update their own non-role fields
router.put('/:id', requireSelfOrSuperAdmin, StaffController.updateStaff);

export default router;
