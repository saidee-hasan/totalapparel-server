"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_js_1 = require("../models/Color.js");
const taxonomyService_js_1 = require("../services/taxonomyService.js");
const taxonomyController_js_1 = require("../controllers/taxonomyController.js");
const taxonomyRouter_js_1 = require("./taxonomyRouter.js");
const service = (0, taxonomyService_js_1.createTaxonomyService)(Color_js_1.Color, {
    label: 'Color',
    fields: ['name', 'slug', 'hex', 'description', 'seoTitle', 'metaDescription', 'keywords', 'status', 'sortOrder'],
    searchFields: ['name', 'slug', 'hex'],
});
exports.default = (0, taxonomyRouter_js_1.createTaxonomyRouter)((0, taxonomyController_js_1.createTaxonomyController)(service));
