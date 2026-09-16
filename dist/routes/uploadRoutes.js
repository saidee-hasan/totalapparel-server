"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_js_1 = require("../controllers/uploadController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Image upload requires authenticated staff
router.post('/', auth_js_1.authenticateToken, uploadController_js_1.UploadController.uploadImage);
exports.default = router;
