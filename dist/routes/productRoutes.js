"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_js_1 = require("../controllers/productController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Public: client site can read products
router.get('/', productController_js_1.ProductController.getProducts);
router.get('/:id', productController_js_1.ProductController.getProductById);
// Protected: only authenticated staff can create, update, or delete products
router.post('/', auth_js_1.authenticateToken, productController_js_1.ProductController.createProduct);
router.put('/:id', auth_js_1.authenticateToken, productController_js_1.ProductController.updateProduct);
router.delete('/:id', auth_js_1.authenticateToken, productController_js_1.ProductController.deleteProduct);
exports.default = router;
