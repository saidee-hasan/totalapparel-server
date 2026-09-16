import { Request, Response, NextFunction } from 'express';
import { UploadService } from '../services/uploadService.js';

export class UploadController {
  static async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { image } = req.body;
      if (!image) {
        res.status(400).json({
          success: false,
          message: 'Image data (base64 string or URL) is required.',
        });
        return;
      }

      const result = await UploadService.uploadToImgBB(image);
      res.status(200).json({
        success: true,
        message: 'Image uploaded to ImgBB successfully.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
