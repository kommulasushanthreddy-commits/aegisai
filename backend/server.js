import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';

import authRoutes from './src/routes/auth.routes.js';
import redactionRoutes from './src/routes/redaction.routes.js';
import phishingRoutes from './src/routes/phishing.routes.js';
import scanRoutes from './src/routes/scan.routes.js';
import adminRoutes from './src/routes/admin.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup for React Vite client
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'AegisAI Gateway Backend',
    timestamp: new Date().toISOString()
  });
});

// Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/redaction', redactionRoutes);
app.use('/api/phishing', phishingRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/audit-log', adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Backend Exception:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🛡️ AegisAI Security Gateway Backend listening on http://localhost:${PORT}`);
  });
}

startServer();
