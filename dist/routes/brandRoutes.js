"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brand_js_1 = require("../models/Brand.js");
const taxonomyService_js_1 = require("../services/taxonomyService.js");
const taxonomyController_js_1 = require("../controllers/taxonomyController.js");
const taxonomyRouter_js_1 = require("./taxonomyRouter.js");
const service = (0, taxonomyService_js_1.createTaxonomyService)(Brand_js_1.Brand, {
    label: 'Brand',
    fields: ['name', 'slug', 'description', 'seoTitle', 'metaDescription', 'keywords', 'status', 'sortOrder', 'logo', 'website'],
    searchFields: ['name', 'slug', 'description'],
});
exports.default = (0, taxonomyRouter_js_1.createTaxonomyRouter)((0, taxonomyController_js_1.createTaxonomyController)(service));
