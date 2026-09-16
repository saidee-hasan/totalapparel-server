"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_js_1 = require("../models/Product.js");
const slugify_js_1 = require("../utils/slugify.js");
const toVariants = (variants) => Array.isArray(variants)
    ? variants.map((v) => ({
        color: String(v?.color ?? '').trim(),
        colorHex: String(v?.colorHex ?? '#000000').trim() || '#000000',
        size: String(v?.size ?? '').trim(),
        sku: String(v?.sku ?? '').trim(),
        stock: Number.isFinite(Number(v?.stock)) ? Math.max(0, Number(v.stock)) : 0,
        price: String(v?.price ?? '').trim(),
    }))
    : [];
class ProductService {
    static async getProducts(query) {
        const filter = {};
        if (query.search && query.search.trim()) {
            const searchRegex = new RegExp(query.search.trim(), 'i');
            filter.$or = [
                { name: searchRegex },
                { description: searchRegex },
                { subCategory: searchRegex },
                { sku: searchRegex },
                { brand: searchRegex },
            ];
        }
        if (query.category && query.category !== 'all' && query.category !== 'All Categories') {
            filter.category = query.category;
        }
        if (query.inStock !== undefined && query.inStock !== 'all') {
            filter.inStock = String(query.inStock) === 'true';
        }
        const products = await Product_js_1.Product.find(filter).sort({ createdAt: -1 });
        const total = await Product_js_1.Product.countDocuments(filter);
        const categories = await Product_js_1.Product.distinct('category');
        return {
            products: products.map((p) => p.toJSON()),
            total,
            categories,
        };
    }
    static async getProductById(id) {
        const product = await Product_js_1.Product.findById(id);
        if (!product) {
            throw { status: 404, message: 'Product not found.' };
        }
        return product.toJSON();
    }
    static async createProduct(data) {
        if (!data.name || !data.imgPrimary) {
            throw { status: 400, message: 'Name and primary image are required.' };
        }
        const colors = data.colors || [];
        const sizes = data.sizes || [];
        const variants = toVariants(data.variants);
        const stockStatus = data.stockStatus || 'in-stock';
        const product = new Product_js_1.Product({
            name: data.name.trim(),
            sku: data.sku?.trim() || '',
            price: data.price?.trim() || '',
            category: data.category || 'Mens Clothing',
            subCategory: data.subCategory?.trim() || 'General',
            brand: data.brand?.trim() || '',
            productType: data.productType?.trim() || '',
            shortDescription: data.shortDescription?.trim() || '',
            description: data.description?.trim() || '',
            imgPrimary: data.imgPrimary.trim(),
            imgSecondary: data.imgSecondary?.trim() || '',
            galleryImages: (data.galleryImages || []).map((s) => s.trim()).filter(Boolean),
            imageAlt: data.imageAlt?.trim() || '',
            colors,
            sizes,
            variants,
            gender: data.gender?.trim() || 'Unisex',
            material: data.material?.trim() || '',
            pattern: data.pattern?.trim() || '',
            fit: data.fit?.trim() || '',
            sleeveType: data.sleeveType?.trim() || '',
            neckType: data.neckType?.trim() || '',
            stockStatus,
            inStock: data.inStock !== undefined ? data.inStock : stockStatus !== 'out-of-stock',
            featured: !!data.featured,
            seoTitle: data.seoTitle?.trim() || '',
            metaDescription: data.metaDescription?.trim() || '',
            slug: (0, slugify_js_1.slugify)(data.slug?.trim() || data.name),
            keywords: data.keywords?.trim() || '',
        });
        await product.save();
        return product.toJSON();
    }
    static async updateProduct(id, data) {
        const product = await Product_js_1.Product.findById(id);
        if (!product) {
            throw { status: 404, message: 'Product not found.' };
        }
        if (data.name)
            product.name = data.name.trim();
        if (data.sku !== undefined)
            product.sku = data.sku.trim();
        if (data.price !== undefined)
            product.price = data.price.trim();
        if (data.category)
            product.category = data.category.trim();
        if (data.subCategory !== undefined)
            product.subCategory = data.subCategory.trim();
        if (data.brand !== undefined)
            product.brand = data.brand.trim();
        if (data.productType !== undefined)
            product.productType = data.productType.trim();
        if (data.shortDescription !== undefined)
            product.shortDescription = data.shortDescription.trim();
        if (data.description !== undefined)
            product.description = data.description.trim();
        if (data.imgPrimary)
            product.imgPrimary = data.imgPrimary.trim();
        if (data.imgSecondary !== undefined)
            product.imgSecondary = data.imgSecondary.trim();
        if (data.galleryImages !== undefined) {
            product.galleryImages = (data.galleryImages || []).map((s) => s.trim()).filter(Boolean);
        }
        if (data.imageAlt !== undefined)
            product.imageAlt = data.imageAlt.trim();
        if (data.colors !== undefined)
            product.colors = data.colors;
        if (data.sizes !== undefined)
            product.sizes = data.sizes;
        if (data.variants !== undefined)
            product.variants = toVariants(data.variants);
        if (data.gender !== undefined)
            product.gender = data.gender.trim();
        if (data.material !== undefined)
            product.material = data.material.trim();
        if (data.pattern !== undefined)
            product.pattern = data.pattern.trim();
        if (data.fit !== undefined)
            product.fit = data.fit.trim();
        if (data.sleeveType !== undefined)
            product.sleeveType = data.sleeveType.trim();
        if (data.neckType !== undefined)
            product.neckType = data.neckType.trim();
        if (data.stockStatus !== undefined) {
            product.stockStatus = data.stockStatus;
            if (data.inStock === undefined)
                product.inStock = data.stockStatus !== 'out-of-stock';
        }
        if (data.inStock !== undefined)
            product.inStock = data.inStock;
        if (data.featured !== undefined)
            product.featured = data.featured;
        if (data.seoTitle !== undefined)
            product.seoTitle = data.seoTitle.trim();
        if (data.metaDescription !== undefined)
            product.metaDescription = data.metaDescription.trim();
        if (data.slug !== undefined || data.name !== undefined) {
            product.slug = (0, slugify_js_1.slugify)(data.slug?.trim() || product.name);
        }
        if (data.keywords !== undefined)
            product.keywords = data.keywords.trim();
        await product.save();
        return product.toJSON();
    }
    static async deleteProduct(id) {
        const product = await Product_js_1.Product.findById(id);
        if (!product) {
            throw { status: 404, message: 'Product not found.' };
        }
        await Product_js_1.Product.findByIdAndDelete(id);
    }
}
exports.ProductService = ProductService;
