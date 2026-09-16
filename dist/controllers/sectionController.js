"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionController = void 0;
const sectionService_js_1 = require("../services/sectionService.js");
class SectionController {
    static async getSections(_req, res, next) {
        try {
            const sections = await sectionService_js_1.SectionService.getAllSections();
            res.status(200).json({ success: true, data: sections });
        }
        catch (error) {
            next(error);
        }
    }
    static async getSectionByKey(req, res, next) {
        try {
            const key = Array.isArray(req.params.key) ? req.params.key[0] : req.params.key;
            const section = await sectionService_js_1.SectionService.getSectionByKey(key);
            res.status(200).json({ success: true, data: section });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateSection(req, res, next) {
        try {
            const key = Array.isArray(req.params.key) ? req.params.key[0] : req.params.key;
            const updated = await sectionService_js_1.SectionService.upsertSection(key, req.body);
            res.status(200).json({
                success: true,
                message: `Section '${updated.sectionName}' updated successfully.`,
                data: updated,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SectionController = SectionController;
