"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const uploadService_js_1 = require("../services/uploadService.js");
class UploadController {
    static async uploadImage(req, res, next) {
        try {
            const { image } = req.body;
            if (!image) {
                res.status(400).json({
                    success: false,
                    message: 'Image data (base64 string or URL) is required.',
                });
                return;
            }
            const result = await uploadService_js_1.UploadService.uploadToImgBB(image);
            res.status(200).json({
                success: true,
                message: 'Image uploaded to ImgBB successfully.',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UploadController = UploadController;
