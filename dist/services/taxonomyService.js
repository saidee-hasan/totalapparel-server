"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaxonomyService = void 0;
const slugify_js_1 = require("../utils/slugify.js");
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const createTaxonomyService = (model, config) => {
    const { label, fields, required = ['name'], searchFields = ['name', 'slug'], filterFields = ['status'], defaultSort = { sortOrder: 1, name: 1 }, slugSource = 'name', slugFields, } = config;
    const buildPayload = (data) => {
        const payload = {};
        for (const field of fields) {
            if (data[field] === undefined)
                continue;
            let value = data[field];
            if (typeof value === 'string')
                value = value.trim();
            payload[field] = value;
        }
        if (typeof payload.name === 'string')
            payload.name = payload.name.trim();
        let sourceValue = payload.slug;
        if (!sourceValue && slugFields && slugFields.length) {
            sourceValue = slugFields.map((f) => payload[f]).filter(Boolean).join(' ');
        }
        if (!sourceValue)
            sourceValue = payload[slugSource];
        if (sourceValue)
            payload.slug = (0, slugify_js_1.slugify)(sourceValue);
        return payload;
    };
    return {
        async list(query) {
            const filter = {};
            const search = typeof query.search === 'string' ? query.search.trim() : '';
            if (search) {
                const rx = new RegExp(escapeRegex(search), 'i');
                filter.$or = searchFields.map((f) => ({ [f]: rx }));
            }
            for (const f of filterFields) {
                const raw = query[f];
                const val = Array.isArray(raw) ? raw[0] : raw;
                if (val && val !== 'all')
                    filter[f] = val;
            }
            const items = await model.find(filter).sort(defaultSort);
            return { items: items.map((d) => d.toJSON()), total: items.length };
        },
        async getById(id) {
            const doc = await model.findById(id);
            if (!doc)
                throw { status: 404, message: `${label} not found.` };
            return doc.toJSON();
        },
        async create(data) {
            for (const field of required) {
                if (data[field] === undefined || data[field] === null || String(data[field]).trim() === '') {
                    throw { status: 400, message: `${field === 'name' ? label : field} is required.` };
                }
            }
            const payload = buildPayload(data);
            const doc = new model(payload);
            await doc.save();
            return doc.toJSON();
        },
        async update(id, data) {
            const doc = await model.findById(id);
            if (!doc)
                throw { status: 404, message: `${label} not found.` };
            const payload = buildPayload(data);
            Object.assign(doc, payload);
            await doc.save();
            return doc.toJSON();
        },
        async remove(id) {
            const doc = await model.findById(id);
            if (!doc)
                throw { status: 404, message: `${label} not found.` };
            await model.findByIdAndDelete(id);
        },
    };
};
exports.createTaxonomyService = createTaxonomyService;
