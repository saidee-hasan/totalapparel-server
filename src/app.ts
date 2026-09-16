import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { renderHomePage, homePageInfo } from './views/homePage.js';

const app: Express = express();

// Middleware
app.use(cors({
  origin: ENV.CORS_ORIGIN === '*' ? true : ENV.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API landing / status page (no database required)
app.get('/', (_req, res) => {
  res.status(200).type('html').send(renderHomePage());
});

// API index (JSON)
app.get('/api', (_req, res) => {
  res.status(200).json({ success: true, data: homePageInfo() });
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
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// API Routes
app.use('/api', apiRoutes);

/**
 * Resolve a directory that contains a built front-end (index.html).
 * Checks PUBLIC_DIR first, then ./public, then ../admin/dist so the server
 * can serve the admin panel out of the box during local development.
 */
const resolvePublicDir = (): string | null => {
  const candidates = [
    process.env.PUBLIC_DIR,
    path.resolve(process.cwd(), 'public'),
    path.resolve(process.cwd(), '../admin/dist'),
  ].filter(Boolean) as string[];

  for (const dir of candidates) {
    try {
      if (fs.existsSync(path.join(dir, 'index.html'))) return dir;
    } catch {
      // ignore
    }
  }
  return null;
};

const publicDir = resolvePublicDir();

if (publicDir) {
  console.log(`[Server] Serving front-end from: ${publicDir}`);
  app.use(express.static(publicDir));

  // SPA fallback: any non-API GET serves index.html so client-side routes work
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
