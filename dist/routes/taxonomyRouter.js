"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaxonomyRouter = void 0;
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const createTaxonomyRouter = (controller) => {
    const router = (0, express_1.Router)();
    // Public reads for the client storefront
    router.get('/', controller.getList);
    router.get('/:id', controller.getById);
    // Protected writes
    router.post('/', auth_js_1.authenticateToken, controller.create);
    router.put('/:id', auth_js_1.authenticateToken, controller.update);
    router.delete('/:id', auth_js_1.authenticateToken, controller.remove);
    return router;
};
exports.createTaxonomyRouter = createTaxonomyRouter;
