"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subcategory_js_1 = require("../models/Subcategory.js");
const taxonomyService_js_1 = require("../services/taxonomyService.js");
const taxonomyController_js_1 = require("../controllers/taxonomyController.js");
const taxonomyRouter_js_1 = require("./taxonomyRouter.js");
const service = (0, taxonomyService_js_1.createTaxonomyService)(Subcategory_js_1.Subcategory, {
    label: 'Subcategory',
    fields: ['name', 'slug', 'category', 'description', 'seoTitle', 'metaDescription', 'keywords', 'status', 'sortOrder'],
    required: ['name', 'category'],
    slugFields: ['category', 'name'],
    searchFields: ['name', 'slug', 'category', 'description'],
    filterFields: ['status', 'category'],
});
exports.default = (0, taxonomyRouter_js_1.createTaxonomyRouter)((0, taxonomyController_js_1.createTaxonomyController)(service));
