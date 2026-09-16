import { Section, ISection } from '../models/Section.js';

export class SectionService {
  static async getAllSections(): Promise<ISection[]> {
    const sections = await Section.find().sort({ createdAt: 1 });
    return sections.map((s) => s.toJSON() as unknown as ISection);
  }

  static async getSectionByKey(sectionKey: string): Promise<ISection> {
    const section = await Section.findOne({ sectionKey: sectionKey.toLowerCase().trim() });
    if (!section) {
      throw { status: 404, message: `Section '${sectionKey}' not found.` };
    }
    return section.toJSON() as unknown as ISection;
  }

  static async upsertSection(
    sectionKey: string,
    data: {
      sectionName?: string;
      category?: string;
      title?: string;
      subtitle?: string;
      description?: string;
      image?: string;
      images?: string[];
      badgeText?: string;
      buttonText?: string;
      buttonLink?: string;
      stats?: { label: string; value: string }[];
    }
  ): Promise<ISection> {
    const key = sectionKey.toLowerCase().trim();

    const existing = await Section.findOne({ sectionKey: key });

    let finalImages = data.images ? data.images.map((img) => img.trim()).filter(Boolean) : undefined;
    let finalImage = data.image !== undefined ? data.image.trim() : undefined;

    if (finalImages && finalImages.length > 0 && !finalImage) {
      finalImage = finalImages[0];
    } else if (finalImage && (!finalImages || finalImages.length === 0)) {
      finalImages = [finalImage];
    }

    if (existing) {
      if (data.sectionName) existing.sectionName = data.sectionName.trim();
      if (data.category) existing.category = data.category.trim();
      if (data.title) existing.title = data.title.trim();
      if (data.subtitle !== undefined) existing.subtitle = data.subtitle.trim();
      if (data.description !== undefined) existing.description = data.description.trim();
      if (finalImage !== undefined) existing.image = finalImage;
      if (finalImages !== undefined) existing.images = finalImages;
      if (data.badgeText !== undefined) existing.badgeText = data.badgeText.trim();
      if (data.buttonText !== undefined) existing.buttonText = data.buttonText.trim();
      if (data.buttonLink !== undefined) existing.buttonLink = data.buttonLink.trim();
      if (data.stats !== undefined) existing.stats = data.stats;

      await existing.save();
      return existing.toJSON() as unknown as ISection;
    } else {
      if (!data.title || !data.sectionName) {
        throw { status: 400, message: 'Section name and title are required.' };
      }

      const newSection = new Section({
        sectionKey: key,
        sectionName: data.sectionName.trim(),
        category: data.category?.trim() || 'Homepage',
        title: data.title.trim(),
        subtitle: data.subtitle?.trim() || '',
        description: data.description?.trim() || '',
        image: finalImage || '',
        images: finalImages || [],
        badgeText: data.badgeText?.trim() || '',
        buttonText: data.buttonText?.trim() || '',
        buttonLink: data.buttonLink?.trim() || '',
        stats: data.stats || [],
      });

      await newSection.save();
      return newSection.toJSON() as unknown as ISection;
    }
  }
}
