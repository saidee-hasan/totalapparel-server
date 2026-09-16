"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_js_1 = require("../models/Category.js");
const taxonomyService_js_1 = require("../services/taxonomyService.js");
const taxonomyController_js_1 = require("../controllers/taxonomyController.js");
const taxonomyRouter_js_1 = require("./taxonomyRouter.js");
const service = (0, taxonomyService_js_1.createTaxonomyService)(Category_js_1.Category, {
    label: 'Category',
    fields: ['name', 'slug', 'description', 'seoTitle', 'metaDescription', 'keywords', 'status', 'sortOrder', 'image'],
    searchFields: ['name', 'slug', 'description'],
});
exports.default = (0, taxonomyRouter_js_1.createTaxonomyRouter)((0, taxonomyController_js_1.createTaxonomyController)(service));
