"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productService_js_1 = require("../services/productService.js");
class ProductController {
    static async getProducts(req, res, next) {
        try {
            const { search, category, inStock } = req.query;
            const data = await productService_js_1.ProductService.getProducts({
                search: search,
                category: category,
                inStock: inStock,
            });
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    static async getProductById(req, res, next) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const product = await productService_js_1.ProductService.getProductById(id);
            res.status(200).json({ success: true, data: product });
        }
        catch (error) {
            next(error);
        }
    }
    static async createProduct(req, res, next) {
        try {
            const { colors, sizes, ...rest } = req.body;
            const productData = { ...rest };
            if (colors) {
                productData.colors = colors.map((c) => ({
                    name: c.name,
                    hex: c.hex || '#000000',
                }));
            }
            if (sizes) {
                productData.sizes = sizes.map((s) => ({
                    name: s.name,
                    inStock: s.inStock !== false,
                }));
            }
            const product = await productService_js_1.ProductService.createProduct(productData);
            res.status(201).json({
                success: true,
                message: 'Product created successfully.',
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProduct(req, res, next) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const { colors, sizes, ...rest } = req.body;
            const updateData = { ...rest };
            if (colors !== undefined) {
                updateData.colors = colors.map((c) => ({
                    name: c.name,
                    hex: c.hex || '#000000',
                }));
            }
            if (sizes !== undefined) {
                updateData.sizes = sizes.map((s) => ({
                    name: s.name,
                    inStock: s.inStock !== false,
                }));
            }
            const product = await productService_js_1.ProductService.updateProduct(id, updateData);
            res.status(200).json({
                success: true,
                message: 'Product updated successfully.',
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteProduct(req, res, next) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await productService_js_1.ProductService.deleteProduct(id);
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully.',
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
