"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxonomyToJSON = exports.taxonomyBasePaths = void 0;
const taxonomyBasePaths = () => ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: '',
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
    keywords: {
        type: String,
        trim: true,
        default: '',
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} is not a valid status',
        },
        default: 'active',
    },
    sortOrder: {
        type: Number,
        default: 0,
    },
});
exports.taxonomyBasePaths = taxonomyBasePaths;
exports.taxonomyToJSON = {
    transform: (_, ret) => {
        ret._id = String(ret._id);
        delete ret.__v;
        return ret;
    },
};
