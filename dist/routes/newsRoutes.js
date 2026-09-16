"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const News_js_1 = require("../models/News.js");
const taxonomyService_js_1 = require("../services/taxonomyService.js");
const taxonomyController_js_1 = require("../controllers/taxonomyController.js");
const taxonomyRouter_js_1 = require("./taxonomyRouter.js");
const service = (0, taxonomyService_js_1.createTaxonomyService)(News_js_1.News, {
    label: 'News',
    fields: [
        'title',
        'slug',
        'category',
        'date',
        'readTime',
        'excerpt',
        'content',
        'image',
        'featured',
        'seoTitle',
        'metaDescription',
        'keywords',
        'status',
        'sortOrder',
    ],
    required: ['title'],
    slugSource: 'title',
    searchFields: ['title', 'slug', 'category', 'excerpt'],
    filterFields: ['status', 'category'],
    defaultSort: { createdAt: -1 },
});
exports.default = (0, taxonomyRouter_js_1.createTaxonomyRouter)((0, taxonomyController_js_1.createTaxonomyController)(service));
