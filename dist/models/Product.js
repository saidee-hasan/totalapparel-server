"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    sku: {
        type: String,
        trim: true,
        default: '',
        index: true,
        sparse: true,
    },
    price: {
        type: String,
        trim: true,
        default: '',
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        default: 'Mens Clothing',
        index: true,
    },
    subCategory: {
        type: String,
        trim: true,
        default: 'General',
    },
    brand: {
        type: String,
        trim: true,
        default: '',
        index: true,
    },
    productType: {
        type: String,
        trim: true,
        default: '',
    },
    shortDescription: {
        type: String,
        trim: true,
        default: '',
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    imgPrimary: {
        type: String,
        required: [true, 'Primary image URL is required'],
        trim: true,
    },
    imgSecondary: {
        type: String,
        trim: true,
        default: '',
    },
    galleryImages: {
        type: [String],
        default: [],
    },
    imageAlt: {
        type: String,
        trim: true,
        default: '',
    },
    colors: {
        type: [
            {
                name: { type: String, required: true, trim: true },
                hex: { type: String, trim: true, default: '#000000' },
            },
        ],
        default: [],
    },
    sizes: {
        type: [
            {
                name: { type: String, trim: true },
                inStock: { type: Boolean, default: true },
            },
        ],
        default: [],
    },
    variants: {
        type: [
            {
                color: { type: String, trim: true, default: '' },
                colorHex: { type: String, trim: true, default: '#000000' },
                size: { type: String, trim: true, default: '' },
                sku: { type: String, trim: true, default: '' },
                stock: { type: Number, default: 0, min: 0 },
                price: { type: String, trim: true, default: '' },
            },
        ],
        default: [],
    },
    gender: {
        type: String,
        trim: true,
        default: 'Unisex',
    },
    material: {
        type: String,
        trim: true,
        default: '',
    },
    pattern: {
        type: String,
        trim: true,
        default: '',
    },
    fit: {
        type: String,
        trim: true,
        default: '',
    },
    sleeveType: {
        type: String,
        trim: true,
        default: '',
    },
    neckType: {
        type: String,
        trim: true,
        default: '',
    },
    stockStatus: {
        type: String,
        enum: {
            values: ['in-stock', 'out-of-stock', 'pre-order'],
            message: '{VALUE} is not a valid stock status',
        },
        default: 'in-stock',
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    seoTitle: {
        type: String,
        trim: true,
        default: '',
    },
    metaDescription: {
        type: String,
        trim: true,
        default: '',
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        default: '',
        index: true,
    },
    keywords: {
        type: String,
        trim: true,
        default: '',
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            ret._id = String(ret._id);
            delete ret.__v;
            return ret;
        },
    },
});
exports.Product = mongoose_1.default.model('Product', productSchema);
