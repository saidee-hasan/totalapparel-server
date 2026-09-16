"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Size_js_1 = require("../models/Size.js");
const taxonomyService_js_1 = require("../services/taxonomyService.js");
const taxonomyController_js_1 = require("../controllers/taxonomyController.js");
const taxonomyRouter_js_1 = require("./taxonomyRouter.js");
const service = (0, taxonomyService_js_1.createTaxonomyService)(Size_js_1.Size, {
    label: 'Size',
    fields: ['name', 'slug', 'group', 'description', 'seoTitle', 'metaDescription', 'keywords', 'status', 'sortOrder'],
    searchFields: ['name', 'slug'],
    filterFields: ['status', 'group'],
});
exports.default = (0, taxonomyRouter_js_1.createTaxonomyRouter)((0, taxonomyController_js_1.createTaxonomyController)(service));
