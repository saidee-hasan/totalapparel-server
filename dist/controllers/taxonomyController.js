"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaxonomyController = void 0;
const createTaxonomyController = (service) => ({
    getList: async (req, res, next) => {
        try {
            const data = await service.list(req.query);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const data = await service.getById(id);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await service.create(req.body);
            res.status(201).json({ success: true, message: 'Created successfully.', data });
        }
        catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const data = await service.update(id, req.body);
            res.status(200).json({ success: true, message: 'Updated successfully.', data });
        }
        catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await service.remove(id);
            res.status(200).json({ success: true, message: 'Deleted successfully.' });
        }
        catch (error) {
            next(error);
        }
    },
});
exports.createTaxonomyController = createTaxonomyController;
