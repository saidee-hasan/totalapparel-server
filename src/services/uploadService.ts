import { ENV } from '../config/env.js';

export class UploadService {
  static async uploadToImgBB(imageBase64OrUrl: string): Promise<{ url: string; displayUrl: string; id: string }> {
    if (!imageBase64OrUrl) {
      throw { status: 400, message: 'Image data is required.' };
    }

    // Strip prefix if base64 data URL
    let cleanImage = imageBase64OrUrl;
    if (cleanImage.includes('base64,')) {
      cleanImage = cleanImage.split('base64,')[1];
    }

    const formData = new FormData();
    formData.append('image', cleanImage);

    const endpoint = `https://api.imgbb.com/1/upload?key=${ENV.IMGBB_API_KEY}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const result = (await response.json()) as any;

    if (!response.ok || !result.success) {
      const errorMsg = result?.error?.message || 'Failed to upload image to ImgBB.';
      throw { status: response.status || 500, message: errorMsg };
    }

    return {
      url: result.data.url,
      displayUrl: result.data.display_url || result.data.url,
      id: result.data.id,
    };
  }
}
