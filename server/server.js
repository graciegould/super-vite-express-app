import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import apiRoutes from './api/api.js'; // Import API routes

// Load environment variables
const VITE_MODE = process.env.VITE_MODE || 'development';
dotenv.config({ path: VITE_MODE === 'production' ? '.env.production' : '.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  app.use(express.json()); // Middleware for parsing JSON request bodies

  // Handle API routes
  app.use('/api', apiRoutes);

  if (VITE_MODE !== 'production') {
    // Development mode: Use Vite as middleware for hot-reloading
    const vite = await createViteServer({
      server: { middlewareMode: 'html' },
      mode: 'development',
    });
    app.use(vite.middlewares); // Vite's middleware for assets and hot-reloading
  } else {
    // Production mode: Serve static files from 'dist' folder
    app.use(express.static(path.resolve(__dirname, '../dist')));

    // Serve the built index.html for non-API routes
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });
  }

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running in ${VITE_MODE} mode on port ${PORT}`);
  });
}

startServer();
