"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedInitialNews = exports.seedInitialTaxonomies = exports.seedInitialSections = exports.seedInitialProducts = exports.seedInitialAdmin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Staff_js_1 = require("../models/Staff.js");
const Product_js_1 = require("../models/Product.js");
const Section_js_1 = require("../models/Section.js");
const Category_js_1 = require("../models/Category.js");
const Subcategory_js_1 = require("../models/Subcategory.js");
const Brand_js_1 = require("../models/Brand.js");
const Color_js_1 = require("../models/Color.js");
const Size_js_1 = require("../models/Size.js");
const News_js_1 = require("../models/News.js");
const slugify_js_1 = require("../utils/slugify.js");
const env_js_1 = require("../config/env.js");
const seedInitialAdmin = async () => {
    try {
        const existingAdmin = await Staff_js_1.Staff.findOne({
            $or: [
                { email: env_js_1.ENV.ADMIN_EMAIL.toLowerCase().trim() },
                { role: 'superadmin' },
            ],
        });
        if (!existingAdmin) {
            console.log(`[Seed] Creating initial Super Admin: ${env_js_1.ENV.ADMIN_EMAIL}`);
            const admin = new Staff_js_1.Staff({
                name: env_js_1.ENV.ADMIN_NAME,
                email: env_js_1.ENV.ADMIN_EMAIL.toLowerCase().trim(),
                password: env_js_1.ENV.ADMIN_PASSWORD,
                role: 'superadmin',
                status: 'active',
            });
            await admin.save();
            console.log(`[Seed] Initial Super Admin successfully created (${env_js_1.ENV.ADMIN_EMAIL})`);
        }
        else {
            console.log(`[Seed] Super Admin already exists (${existingAdmin.email})`);
        }
    }
    catch (error) {
        console.error('[Seed] Error during admin seeding:', error);
    }
};
exports.seedInitialAdmin = seedInitialAdmin;
const seedInitialProducts = async () => {
    try {
        const count = await Product_js_1.Product.countDocuments();
        if (count === 0) {
            console.log('[Seed] Seeding initial product catalog...');
            const sampleProducts = [
                {
                    name: 'Heavyweight 400gsm Hoodie Blank',
                    price: 'Est. $22.50 / unit',
                    category: 'Mens Clothing',
                    subCategory: 'Hoodie & Sweatshirts',
                    imgPrimary: 'https://images.unsplash.com/photo-1572495641004-28421ae52e52?q=80&w=800&auto=format&fit=crop',
                    imgSecondary: 'https://images.unsplash.com/photo-1572495641004-28421ae52e52?q=80&w=800&auto=format&fit=crop',
                    description: 'Ultra-heavyweight 400gsm combed fleece with pre-shrunk treatment and custom dye options.',
                    colors: [
                        { name: 'Black', hex: '#000000' },
                        { name: 'White', hex: '#FFFFFF' },
                        { name: 'Navy', hex: '#1e3a8a' },
                        { name: 'Charcoal', hex: '#374151' },
                    ],
                    sizes: [
                        { name: 'S', inStock: true },
                        { name: 'M', inStock: true },
                        { name: 'L', inStock: true },
                        { name: 'XL', inStock: true },
                        { name: 'XXL', inStock: true },
                    ],
                    inStock: true,
                    featured: true,
                },
                {
                    name: 'Premium Organic Cotton Tee',
                    price: 'Est. $8.50 / unit',
                    category: 'Mens Clothing',
                    subCategory: 'Shirts',
                    imgPrimary: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop',
                    imgSecondary: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
                    description: '100% GOTS certified organic ring-spun cotton. Ideal for luxury streetwear blanks.',
                    colors: [
                        { name: 'White', hex: '#FFFFFF' },
                        { name: 'Black', hex: '#000000' },
                        { name: 'Sky Blue', hex: '#38bdf8' },
                        { name: 'Sand', hex: '#D4A574' },
                    ],
                    sizes: [
                        { name: 'S', inStock: true },
                        { name: 'M', inStock: true },
                        { name: 'L', inStock: true },
                        { name: 'XL', inStock: true },
                    ],
                    inStock: true,
                    featured: true,
                },
                {
                    name: 'Technical Wind Shell Jacket',
                    price: 'Est. $35.00 / unit',
                    category: 'Mens Clothing',
                    subCategory: 'Jacket & Vest',
                    imgPrimary: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=800&auto=format&fit=crop',
                    description: 'DWR water repellent coating with heat-sealed seams and custom YKK waterproof zippers.',
                    colors: [
                        { name: 'Black', hex: '#000000' },
                        { name: 'Navy', hex: '#1e3a8a' },
                        { name: 'Olive', hex: '#556B2F' },
                    ],
                    sizes: [
                        { name: 'S', inStock: true },
                        { name: 'M', inStock: true },
                        { name: 'L', inStock: true },
                        { name: 'XL', inStock: true },
                        { name: 'XXL', inStock: true },
                    ],
                    inStock: true,
                    featured: false,
                },
                {
                    name: 'Selvedge Denim Jacket Wholesale',
                    price: 'Est. $45.00 / unit',
                    category: 'Womens Clothing',
                    subCategory: 'Jacket & Vest',
                    imgPrimary: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=800&auto=format&fit=crop',
                    description: '14oz Japanese selvedge denim woven on vintage shuttle looms. Antique brass hardware.',
                    colors: [
                        { name: 'Blue', hex: '#2563EB' },
                        { name: 'Light Blue', hex: '#93C5FD' },
                        { name: 'Black', hex: '#000000' },
                    ],
                    sizes: [
                        { name: 'XS', inStock: true },
                        { name: 'S', inStock: true },
                        { name: 'M', inStock: true },
                        { name: 'L', inStock: true },
                    ],
                    inStock: true,
                    featured: true,
                },
                {
                    name: 'Custom Utility Cargo Pants',
                    price: 'Est. $28.00 / unit',
                    category: 'Mens Clothing',
                    subCategory: 'Pants & Trousers',
                    imgPrimary: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
                    description: 'Ripstop reinforced cotton blend with multi-pocket configuration and adjustable cuffs.',
                    colors: [
                        { name: 'Olive', hex: '#556B2F' },
                        { name: 'Khaki', hex: '#C3B091' },
                        { name: 'Black', hex: '#000000' },
                    ],
                    sizes: [
                        { name: 'S', inStock: true },
                        { name: 'M', inStock: true },
                        { name: 'L', inStock: true },
                        { name: 'XL', inStock: true },
                        { name: 'XXL', inStock: true },
                    ],
                    inStock: true,
                    featured: false,
                },
                {
                    name: 'Minimalist Trench Coat',
                    price: 'Est. $65.00 / unit',
                    category: 'Womens Clothing',
                    subCategory: 'Jacket & Vest',
                    imgPrimary: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop',
                    description: 'Double-breasted tailored trench with horn buttons and storm flap.',
                    colors: [
                        { name: 'Camel', hex: '#C19A6B' },
                        { name: 'Black', hex: '#000000' },
                        { name: 'Beige', hex: '#F5F5DC' },
                    ],
                    sizes: [
                        { name: 'S', inStock: true },
                        { name: 'M', inStock: true },
                        { name: 'L', inStock: true },
                        { name: 'XL', inStock: true },
                    ],
                    inStock: true,
                    featured: false,
                },
            ];
            await Product_js_1.Product.insertMany(sampleProducts);
            console.log(`[Seed] Seeded ${sampleProducts.length} sample products.`);
        }
        else {
            console.log(`[Seed] Products already exist (${count} items)`);
        }
    }
    catch (error) {
        console.error('[Seed] Error seeding products:', error);
    }
};
exports.seedInitialProducts = seedInitialProducts;
const seedInitialSections = async () => {
    try {
        const clientSections = [
            {
                sectionKey: 'hero',
                sectionName: 'Hero Section',
                category: 'Homepage',
                title: 'Our Journey Started.',
                subtitle: "Connecting the world's leading fashion brands with premium textile engineering and seamless production management.",
                description: "Connecting the world's leading fashion brands with premium textile engineering and seamless production management.",
                image: '/total apparel.png',
                images: ['/total apparel.png'],
                badgeText: 'Total Apparel Manufacturing',
                buttonText: 'Start Production',
                buttonLink: '/contact',
            },
            {
                sectionKey: 'company_story',
                sectionName: 'Our Story',
                category: 'Homepage',
                title: 'Our Story',
                subtitle: 'Excellence in Global Apparel Manufacturing',
                description: 'Since our inception, we have been driven by a singular vision: to redefine global apparel manufacturing through uncompromising quality and sustainable innovation. What began as a boutique operation has evolved into a world-class production powerhouse.',
                image: '/images/company-story/factory.png',
                images: [
                    '/images/company-story/factory.png',
                    '/images/company-story/inspection.png',
                    '/images/company-story/cutting.png',
                ],
                badgeText: 'Total Apparel Journey',
                buttonText: 'Learn More About Us',
                buttonLink: '/about',
                stats: [
                    { label: 'Years Experience', value: '15+' },
                    { label: 'Global Clients', value: '500+' },
                    { label: 'Export Countries', value: '50+' },
                    { label: 'On-Time Delivery', value: '99%' },
                ],
            },
            {
                sectionKey: 'cotton_farming',
                sectionName: 'Cotton Farming',
                category: 'Homepage',
                title: 'The Origins of Our Quality',
                subtitle: '100% Organic Certified Cotton',
                description: 'Every premium garment begins with exceptional raw materials. Our photorealistic cotton fields represent our commitment to sustainable farming, ensuring that from seed to thread, quality is never compromised.',
                image: '/images/cotton_farming_hero.png',
                images: [
                    '/images/cotton_farming_hero.png',
                    '/images/quality_laboratory.png',
                    '/images/company-story/inspection.png',
                ],
                badgeText: 'Sustainable Source',
                buttonText: 'Explore Our Farming Process',
                buttonLink: '#cotton',
            },
            {
                sectionKey: 'spinning_mill',
                sectionName: 'Spinning Mill',
                category: 'Homepage',
                title: 'Modern Spinning Technology',
                subtitle: 'Automated Precision Spindles',
                description: 'Experience the cinematic precision of our modern spinning mills. We transform raw white cotton fibers into fine, exceptionally strong yarn threads using high-speed spindles and cutting-edge mechanical technology.',
                image: '/images/spinning_mill_yarn.png',
                images: [
                    '/images/spinning_mill_yarn.png',
                    '/images/precision_spinning.png',
                    '/images/yarn_to_fabric.png',
                    '/images/weaving_loom.png',
                ],
                badgeText: 'Textile Manufacturing',
                buttonText: 'View Production Plant',
                buttonLink: '#spinning',
            },
            {
                sectionKey: 'weaving_loom',
                sectionName: 'Weaving Loom',
                category: 'Homepage',
                title: 'The Art of Weaving',
                subtitle: 'Woven Perfection & Synchronized Threads',
                description: 'Witness the cinematic orchestration of our ultra-modern weaving looms. Thousands of fine yarns crisscross in perfect synchrony, forming the structural foundation of our luxurious and highly durable apparel.',
                image: '/images/weaving_loom.png',
                images: [
                    '/images/weaving_loom.png',
                    '/images/yarn_to_fabric.png',
                    '/images/fabric_dyeing.png',
                ],
                badgeText: 'Fabric Construction',
                buttonText: 'Discover Our Textiles',
                buttonLink: '#weaving',
            },
            {
                sectionKey: 'yarn_to_fabric',
                sectionName: 'Yarn to Fabric',
                category: 'Homepage',
                title: 'Yarn to Fabric',
                subtitle: 'Neural Grid Active • Laser Interlacing',
                description: 'Experience the futuristic evolution of textile manufacturing. Glowing neon blue and white yarn threads automatically interlace into a complex, high-tech fabric grid driven by laser-guided systems.',
                image: '/images/yarn_to_fabric.png',
                images: ['/images/yarn_to_fabric.png'],
                badgeText: 'Textile Innovation',
                buttonText: 'Explore Technology',
                buttonLink: '#yarn',
            },
            {
                sectionKey: 'fabric_dyeing',
                sectionName: 'Fabric Dyeing',
                category: 'Homepage',
                title: 'Fabric Dyeing & Finishing',
                subtitle: 'Advanced Color Infusion & Eco-Friendly Dyes',
                description: 'Infusing life into our textiles. Our modern, high-tech dyeing facilities ensure vibrant, long-lasting colors while our finishing processes add unparalleled texture, performance, and durability to every woven roll.',
                image: '/images/fabric_dyeing.png',
                images: ['/images/fabric_dyeing.png'],
                badgeText: 'Color & Texture',
                buttonText: 'View Dyeing Process',
                buttonLink: '#dyeing',
            },
            {
                sectionKey: 'quality_laboratory',
                sectionName: 'Quality Laboratory',
                category: 'Homepage',
                title: 'Quality Laboratory',
                subtitle: 'ISO Certified Lab - Strict QC Parameters',
                description: 'Before any fabric moves to production, it must pass our state-of-the-art laboratory testing. From GSM verification to advanced shrinkage and color fastness analysis, our scientists ensure perfect consistency.',
                image: '/images/quality_laboratory.png',
                images: ['/images/quality_laboratory.png'],
                badgeText: 'Uncompromising Standards',
                buttonText: 'Explore QC Parameters',
                buttonLink: '#lab',
            },
            {
                sectionKey: 'garment_manufacturing',
                sectionName: 'Garment Manufacturing',
                category: 'Homepage',
                title: 'Garment Manufacturing',
                subtitle: 'High-Volume Automated Stitching & Construction',
                description: 'The grand finale of our production process. From automated precision fabric cutting to advanced stitching and immaculate packing, our vast industrial facilities transform premium textiles into world-class finished garments.',
                image: '/images/garment_manufacturing.png',
                images: [
                    '/images/garment_manufacturing.png',
                    '/images/company-story/cutting.png',
                    '/images/company-story/factory.png',
                ],
                badgeText: 'Final Assembly',
                buttonText: 'Take a Factory Tour',
                buttonLink: '#garment',
            },
            {
                sectionKey: 'global_manufacturing',
                sectionName: 'Global Manufacturing',
                category: 'Homepage',
                title: 'Global Manufacturing Process',
                subtitle: 'Worldwide Delivery - Global Sync Active',
                description: 'From the initial tech pack to final worldwide delivery, we manage the entire lifecycle. Our interconnected global logistics network ensures transparency, speed, and uncompromising quality at every single touchpoint.',
                image: '/images/global_manufacturing.png',
                images: ['/images/global_manufacturing.png'],
                badgeText: 'End-to-End Supply Chain',
                buttonText: 'Track Our Logistics',
                buttonLink: '#global',
            },
            {
                sectionKey: 'lets_work_together',
                sectionName: "Let's Work Together",
                category: 'Homepage',
                title: "Let's Work Together",
                subtitle: 'Global Headquarters: New York • London • Dhaka',
                description: 'Partner with a world-class manufacturing facility. Whether you have a new tech pack or a large-scale production inquiry, our team is ready to deliver excellence.',
                image: '/images/lets_work_together.png',
                images: ['/images/lets_work_together.png'],
                badgeText: 'Business Inquiry',
                buttonText: 'Send an Inquiry',
                buttonLink: 'mailto:inquiry@globalapparel.com',
            },
            // FOOTER & GLOBAL CTA
            {
                sectionKey: 'footer',
                sectionName: 'Footer & Global Brand',
                category: 'Footer',
                title: "Let's Build Together.",
                subtitle: 'Start Project',
                description: "Partner with the industry's finest. We engineer apparel solutions that define global brands.",
                image: '',
                images: [],
                badgeText: 'id@totaltexbd.com',
                buttonText: 'Start Project',
                buttonLink: '/contact',
            },
            // ABOUT PAGE SECTIONS
            {
                sectionKey: 'about_hero',
                sectionName: 'About - Hero Story',
                category: 'About Page',
                title: 'The TOTAL APPAREL Story.',
                subtitle: 'Global Excellence',
                description: 'Operating from the heart of the global textile hub in Dhaka, Bangladesh, TOTAL APPAREL bridges the gap between creative fashion design and technical garment manufacturing. We bring together a specialized team of textile engineers and merchandising experts dedicated to supplying world-class Ready-Made Garments (RMG) to the international market.',
                image: '/our-story-cover.png',
                images: ['/our-story-cover.png'],
                badgeText: 'Global Excellence',
                buttonText: '',
                buttonLink: '',
            },
            {
                sectionKey: 'about_mission',
                sectionName: 'About - Mission & Precision',
                category: 'About Page',
                title: 'Precision, Transparency, and Timely Delivery',
                subtitle: 'Our Mission',
                description: 'At TOTAL APPAREL, we believe that exceptional garments begin with meticulous planning and technical precision. We go beyond traditional manufacturing by providing expert fabric selection—including premium cottons, specialized activewear blends, and eco-friendly organics.',
                image: '/process-engineering.png',
                images: [
                    '/process-engineering.png',
                    '/process-sourcing.png',
                    '/process-quality.png',
                ],
                badgeText: 'Quality Assured',
                buttonText: '',
                buttonLink: '',
            },
            {
                sectionKey: 'about_expertise',
                sectionName: 'About - Expertise & Partners',
                category: 'About Page',
                title: 'Driven by Expertise, Trusted by Global Partners',
                subtitle: 'Ethical Manufacturing',
                description: 'Our team consists of seasoned textile engineers, merchandising specialists, and quality control experts with decades of combined industry experience. We collaborate closely with international fashion brands, buying houses, and independent labels, acting as their highly reliable, on-the-ground execution partner in Bangladesh.',
                image: '/professional-team.png',
                images: [
                    '/professional-team.png',
                    '/merchandising.png',
                ],
                badgeText: 'Decades of Experience',
                buttonText: '',
                buttonLink: '',
            },
            {
                sectionKey: 'about_cta',
                sectionName: 'About - Ready to Source CTA',
                category: 'About Page',
                title: "Let's Build Your Next Collection.",
                subtitle: 'Ready to Source?',
                description: 'Work With Our Team to engineer apparel solutions that define global brands.',
                image: '',
                images: [],
                badgeText: 'Ready to Source?',
                buttonText: 'Work With Our Team',
                buttonLink: '/contact',
            },
            // CONTACT PAGE
            {
                sectionKey: 'contact_hero',
                sectionName: 'Contact - Hero & Details',
                category: 'Contact Page',
                title: "Let's Build Together.",
                subtitle: 'Start Your Project',
                description: "From raw materials to global shipment, we engineer elite manufacturing solutions for the world's most demanding brands.",
                image: '/images/contact_hero_bg.png',
                images: ['/images/contact_hero_bg.png'],
                badgeText: 'Total Apparel Bd. • Dhaka, Bangladesh',
                buttonText: '',
                buttonLink: '',
            },
            // CAPABILITIES PAGE
            {
                sectionKey: 'capabilities_hero',
                sectionName: 'Capabilities - Hero',
                category: 'Capabilities Page',
                title: 'Technical Expertise.',
                subtitle: 'Core Competencies',
                description: "Seamless execution across the entire manufacturing ecosystem, engineered for the world's leading brands.",
                image: '',
                images: [],
                badgeText: 'Core Competencies',
                buttonText: '',
                buttonLink: '',
            },
            // PROCESS PAGE
            {
                sectionKey: 'process_hero',
                sectionName: 'Process - Ecosystem Hero',
                category: 'Process Page',
                title: 'The Anatomy of Precision',
                subtitle: 'Our Ecosystem',
                description: 'Discover how we are working with global buyers and maintaining the start-to-end process. We seamlessly execute complex orders through meticulous engineering. From the Tech Pack to Shipment, we define world-class manufacturing.',
                image: '',
                images: [],
                badgeText: 'Our Ecosystem',
                buttonText: '',
                buttonLink: '',
            },
            {
                sectionKey: 'process_steps',
                sectionName: 'Process - 6 Manufacturing Steps Gallery',
                category: 'Process Page',
                title: '6-Stage Production Pipeline',
                subtitle: 'From Yarn to Global Delivery',
                description: '01 Raw Material Sourcing • 02 Fabric Development • 03 Dyeing & Production • 04 Cutting & Engineering • 05 Quality Assurance • 06 Packaging & Logistics',
                image: '/process-sourcing.png',
                images: [
                    '/process-sourcing.png',
                    '/fabric-development.png',
                    '/process-production.png',
                    '/process-engineering.png',
                    '/process-quality.png',
                    '/export-logistics.png',
                ],
                badgeText: '6-Step Pipeline',
                buttonText: '',
                buttonLink: '',
            },
        ];
        for (const sec of clientSections) {
            await Section_js_1.Section.findOneAndUpdate({ sectionKey: sec.sectionKey }, { $set: sec }, { upsert: true, new: true });
        }
        // Clean up old obsolete keys if present
        await Section_js_1.Section.deleteMany({
            sectionKey: { $in: ['quality_lab', 'garment_mfg', 'global_mfg'] },
        });
        console.log(`[Seed] Synced all ${clientSections.length} real client sections.`);
    }
    catch (error) {
        console.error('[Seed] Error seeding sections:', error);
    }
};
exports.seedInitialSections = seedInitialSections;
const seedInitialTaxonomies = async () => {
    try {
        const upsertMany = async (model, label, items) => {
            for (const item of items) {
                const slug = item.slug || (0, slugify_js_1.slugify)(item.name);
                await model.findOneAndUpdate({ slug }, { $set: { ...item, slug } }, { upsert: true, new: true });
            }
            console.log(`[Seed] Synced ${items.length} ${label}.`);
        };
        const colors = [
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Red', hex: '#DC2626' },
            { name: 'Blue', hex: '#2563EB' },
            { name: 'Navy Blue', hex: '#1E3A8A' },
            { name: 'Sky Blue', hex: '#38BDF8' },
            { name: 'Green', hex: '#16A34A' },
            { name: 'Olive Green', hex: '#4D7C0F' },
            { name: 'Yellow', hex: '#FACC15' },
            { name: 'Orange', hex: '#F97316' },
            { name: 'Pink', hex: '#EC4899' },
            { name: 'Purple', hex: '#7C3AED' },
            { name: 'Maroon', hex: '#7F1D1D' },
            { name: 'Brown', hex: '#78350F' },
            { name: 'Beige', hex: '#D6C7A1' },
            { name: 'Cream', hex: '#F5F0E1' },
            { name: 'Gray', hex: '#9CA3AF' },
            { name: 'Charcoal', hex: '#374151' },
            { name: 'Khaki', hex: '#C3B091' },
            { name: 'Teal', hex: '#0D9488' },
            { name: 'Cyan', hex: '#06B6D4' },
            { name: 'Magenta', hex: '#D946EF' },
            { name: 'Multicolor', hex: '#808080' },
        ].map((c, i) => ({ ...c, sortOrder: i, status: 'active' }));
        const adultSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL', 'Free Size'];
        const kidsSizes = [
            '0–3 Months',
            '3–6 Months',
            '6–12 Months',
            '1–2 Years',
            '2–3 Years',
            '3–4 Years',
            '4–5 Years',
            '5–6 Years',
            '6–7 Years',
            '7–8 Years',
            '8–10 Years',
            '10–12 Years',
            '12–14 Years',
        ];
        const sizes = [
            ...adultSizes.map((name, i) => ({ name, group: 'adult', sortOrder: i, status: 'active' })),
            ...kidsSizes.map((name, i) => ({ name, group: 'kids', sortOrder: i, status: 'active' })),
        ];
        const brands = [
            'Aarong', 'Yellow', 'Sailor', 'Ecstasy', 'Cats Eye', 'Richman', 'Dorjibari', 'Le Reve',
            'Artisan', 'Kay Kraft', 'Lubnan', 'Rang', 'Twelve', 'Noir', 'Infinity', 'Freeland',
            'Easy', 'Apex', 'Bata', 'Lotto', 'Adidas', 'Nike', 'Puma', "Levi's", 'H&M', 'Zara',
            'Uniqlo', 'Louis Philippe', 'Van Heusen', 'Tommy Hilfiger', 'Calvin Klein', 'Jack & Jones',
            'U.S. Polo Assn.', 'Other / Unbranded',
        ].map((name, i) => ({ name, sortOrder: i, status: 'active' }));
        const categories = [
            { name: 'Men', slug: 'men', description: "Men's clothing, footwear and fashion accessories", sortOrder: 0 },
            { name: 'Women', slug: 'women', description: "Women's clothing, footwear and fashion accessories", sortOrder: 1 },
            { name: 'Kids', slug: 'kids', description: 'Clothing and fashion products for kids', sortOrder: 2 },
            { name: 'Footwear', slug: 'footwear', description: 'Shoes, sandals, sneakers and other footwear', sortOrder: 3 },
            { name: 'Bags', slug: 'bags', description: 'Backpacks, handbags, wallets and fashion bags', sortOrder: 4 },
            { name: 'Accessories', slug: 'accessories', description: 'Belts, caps, watches, sunglasses and other accessories', sortOrder: 5 },
            { name: 'Traditional Wear', slug: 'traditional-wear', description: 'Traditional and ethnic fashion products', sortOrder: 6 },
            { name: 'Sportswear', slug: 'sportswear', description: 'Sports, gym and activewear products', sortOrder: 7 },
        ].map((c) => ({ ...c, status: 'active' }));
        const subcategoryMap = {
            Men: ['T-Shirts', 'Shirts', 'Polo Shirts', 'Panjabi', 'Jeans', 'Pants', 'Shorts', 'Hoodies', 'Jackets', 'Sweaters', 'Underwear'],
            Women: ['Saree', 'Salwar Kameez', 'Kurti', 'Tops', 'T-Shirts', 'Dresses', 'Gowns', 'Jeans', 'Pants', 'Skirts', 'Hijab', 'Abaya'],
            Kids: ['Boys Clothing', 'Girls Clothing', 'Baby Clothing', 'Kids T-Shirts', 'Kids Shirts', 'Kids Dresses', 'Kids Pants', 'School Wear'],
            Footwear: ['Sneakers', 'Casual Shoes', 'Formal Shoes', 'Sandals', 'Slippers', 'Heels', 'Flats', 'Boots'],
            Bags: ['Backpacks', 'Handbags', 'Shoulder Bags', 'Crossbody Bags', 'Laptop Bags', 'Travel Bags', 'Wallets'],
            Accessories: ['Belts', 'Caps', 'Hats', 'Sunglasses', 'Watches', 'Scarves', 'Gloves', 'Socks'],
        };
        const subcategories = Object.entries(subcategoryMap).flatMap(([category, names]) => names.map((name, i) => ({ name, category, slug: (0, slugify_js_1.slugify)(`${category} ${name}`), sortOrder: i, status: 'active' })));
        await upsertMany(Color_js_1.Color, 'colors', colors);
        await upsertMany(Size_js_1.Size, 'sizes', sizes);
        await upsertMany(Brand_js_1.Brand, 'brands', brands);
        await upsertMany(Category_js_1.Category, 'categories', categories);
        await upsertMany(Subcategory_js_1.Subcategory, 'subcategories', subcategories);
    }
    catch (error) {
        console.error('[Seed] Error seeding taxonomies:', error);
    }
};
exports.seedInitialTaxonomies = seedInitialTaxonomies;
const seedInitialNews = async () => {
    try {
        const articles = [
            {
                title: 'The Future of Sustainable Denim: Closed-Loop Water Systems',
                slug: 'sustainable-denim',
                category: 'Sustainability',
                date: 'July 24, 2026',
                readTime: '8 min read',
                excerpt: 'As the global fashion industry rapidly shifts towards true circularity, we explore how our newly implemented closed-loop water systems and ozone washing techniques are revolutionizing high-volume raw denim manufacturing.',
                image: '/images/fabric_dyeing.png',
                featured: true,
            },
            {
                title: 'Navigating Global Logistics: SS26 Freight Updates',
                slug: 'navigating-global-logistics-ss26-freight-updates',
                category: 'Supply Chain',
                date: 'July 20, 2026',
                readTime: '5 min read',
                excerpt: 'How AI-driven forecasting and optimized freight routes are cutting global transit times this season.',
                image: '/images/global_manufacturing.png',
                featured: false,
            },
            {
                title: 'Material Focus: The Rise of Heavyweight French Terry',
                slug: 'material-focus-heavyweight-french-terry',
                category: 'Fabric Innovation',
                date: 'July 15, 2026',
                readTime: '4 min read',
                excerpt: 'Inside our new knitting technique for 400gsm+ French Terry with a smooth, print-ready face.',
                image: '/images/yarn_to_fabric.png',
                featured: false,
            },
            {
                title: 'Inside the Facility: New Quality Assurance Protocols',
                slug: 'inside-the-facility-new-quality-assurance-protocols',
                category: 'Operations',
                date: 'July 08, 2026',
                readTime: '6 min read',
                excerpt: 'Automated optical inspection and zero-defect tolerance now standard across every production line.',
                image: '/images/quality_laboratory.png',
                featured: false,
            },
            {
                title: 'Client Spotlight: Scaling a Luxury Streetwear Syndicate',
                slug: 'client-spotlight-scaling-a-luxury-streetwear-syndicate',
                category: 'Case Study',
                date: 'June 28, 2026',
                readTime: '10 min read',
                excerpt: 'How we scaled a European streetwear brand from 5,000 to 50,000 units with flawless consistency.',
                image: '/images/garment_manufacturing.png',
                featured: false,
            },
            {
                title: 'The Golden Hour: Photorealistic Cotton Harvesting',
                slug: 'the-golden-hour-photorealistic-cotton-harvesting',
                category: 'Sourcing',
                date: 'June 12, 2026',
                readTime: '7 min read',
                excerpt: 'Regenerative agriculture and long-staple fibers from our partner cotton farms.',
                image: '/images/cotton_farming_hero.png',
                featured: false,
            },
            {
                title: 'Ultra-Modern Weaving Looms in Action',
                slug: 'ultra-modern-weaving-looms-in-action',
                category: 'Technology',
                date: 'June 05, 2026',
                readTime: '5 min read',
                excerpt: 'Air-jet weaving technology enabling custom fabric development at lower MOQs.',
                image: '/images/weaving_loom.png',
                featured: false,
            },
        ].map((item, i) => ({ ...item, status: 'active', sortOrder: i }));
        const count = await News_js_1.News.countDocuments();
        if (count === 0) {
            await News_js_1.News.insertMany(articles);
            console.log(`[Seed] Seeded ${articles.length} news articles.`);
        }
        else {
            console.log(`[Seed] News already exists (${count} articles)`);
        }
    }
    catch (error) {
        console.error('[Seed] Error seeding news:', error);
    }
};
exports.seedInitialNews = seedInitialNews;
// Directly run seeder ONLY if executed directly from CLI (e.g. npm run seed)
const runCLI = async () => {
    try {
        await mongoose_1.default.connect(env_js_1.ENV.MONGODB_URI);
        console.log('[Seed CLI] Connected to database');
        await (0, exports.seedInitialAdmin)();
        await (0, exports.seedInitialProducts)();
        await (0, exports.seedInitialSections)();
        await (0, exports.seedInitialTaxonomies)();
        await (0, exports.seedInitialNews)();
        await mongoose_1.default.disconnect();
        console.log('[Seed CLI] Seeding completed');
        process.exit(0);
    }
    catch (err) {
        console.error('[Seed CLI] Connection failed:', err);
        process.exit(1);
    }
};
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
    runCLI();
}
