import { Router } from 'express';
import { UploadController } from '../controllers/uploadController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Image upload requires authenticated staff
router.post('/', authenticateToken, UploadController.uploadImage);

export default router;
