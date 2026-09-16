"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const env_js_1 = require("./config/env.js");
const db_js_1 = require("./config/db.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const homePage_js_1 = require("./views/homePage.js");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: env_js_1.ENV.CORS_ORIGIN === '*' ? true : env_js_1.ENV.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// API landing / status page (no database required)
app.get('/', (_req, res) => {
    res.status(200).type('html').send((0, homePage_js_1.renderHomePage)());
});
// API index (JSON)
app.get('/api', (_req, res) => {
    res.status(200).json({ success: true, data: (0, homePage_js_1.homePageInfo)() });
});
// Health check endpoint (no database required)
app.get('/api/health', (_, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date() });
});
// Ensure the database is connected before handling API requests.
// This is essential on serverless hosts (Vercel), where the long-running
// server.ts entrypoint (and its connectDB call) does not run.
app.use('/api', async (_req, _res, next) => {
    try {
        await (0, db_js_1.connectDB)();
        next();
    }
    catch (error) {
        next(error);
    }
});
// API Routes
app.use('/api', index_js_1.default);
/**
 * Resolve a directory that contains a built front-end (index.html).
 * Checks PUBLIC_DIR first, then ./public, then ../admin/dist so the server
 * can serve the admin panel out of the box during local development.
 */
const resolvePublicDir = () => {
    const candidates = [
        process.env.PUBLIC_DIR,
        path_1.default.resolve(process.cwd(), 'public'),
        path_1.default.resolve(process.cwd(), '../admin/dist'),
    ].filter(Boolean);
    for (const dir of candidates) {
        try {
            if (fs_1.default.existsSync(path_1.default.join(dir, 'index.html')))
                return dir;
        }
        catch {
            // ignore
        }
    }
    return null;
};
const publicDir = resolvePublicDir();
if (publicDir) {
    console.log(`[Server] Serving front-end from: ${publicDir}`);
    app.use(express_1.default.static(publicDir));
    // SPA fallback: any non-API GET serves index.html so client-side routes work
    app.get(/^(?!\/api).*/, (_req, res) => {
        res.sendFile(path_1.default.join(publicDir, 'index.html'));
    });
}
// Error Handling
app.use(errorHandler_js_1.notFoundHandler);
app.use(errorHandler_js_1.errorHandler);
exports.default = app;
