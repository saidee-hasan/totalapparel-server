import app from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { seedInitialAdmin, seedInitialProducts, seedInitialSections, seedInitialTaxonomies, seedInitialNews } from './scripts/seed.js';

const startServer = async () => {
  try {
    await connectDB();
    await seedInitialAdmin();
    await seedInitialProducts();
    await seedInitialSections();
    await seedInitialTaxonomies();
    await seedInitialNews();

    app.listen(ENV.PORT, () => {
      console.log(`[Server] TotalApparel API Server running on port ${ENV.PORT}`);
      console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('[Server] Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
