"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sectionController_js_1 = require("../controllers/sectionController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Public: client site reads sections
router.get('/', sectionController_js_1.SectionController.getSections);
router.get('/:key', sectionController_js_1.SectionController.getSectionByKey);
// Protected: only authenticated staff can update sections
router.put('/:key', auth_js_1.authenticateToken, sectionController_js_1.SectionController.updateSection);
router.patch('/:key', auth_js_1.authenticateToken, sectionController_js_1.SectionController.updateSection);
exports.default = router;
