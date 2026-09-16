"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = require("./config/db.js");
const env_js_1 = require("./config/env.js");
const seed_js_1 = require("./scripts/seed.js");
const startServer = async () => {
    try {
        await (0, db_js_1.connectDB)();
        await (0, seed_js_1.seedInitialAdmin)();
        await (0, seed_js_1.seedInitialProducts)();
        await (0, seed_js_1.seedInitialSections)();
        await (0, seed_js_1.seedInitialTaxonomies)();
        await (0, seed_js_1.seedInitialNews)();
        app_js_1.default.listen(env_js_1.ENV.PORT, () => {
            console.log(`[Server] TotalApparel API Server running on port ${env_js_1.ENV.PORT}`);
            console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    }
    catch (err) {
        console.error('[Server] Failed to start server:', err);
        process.exit(1);
    }
};
startServer();
