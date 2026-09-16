import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/totalapparel',
  JWT_SECRET: process.env.JWT_SECRET || 'totalapparel_default_jwt_secret_change_in_prod',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  ADMIN_NAME: process.env.ADMIN_NAME || 'Super Admin',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gmail.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '123456',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  IMGBB_API_KEY: process.env.IMGBB_API_KEY || '5208745dacce2f0b8ea7cce043481d64',
};
