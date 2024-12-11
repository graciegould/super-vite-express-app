import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import apiRoutes from './api/api.js'; 

const VITE_MODE = process.env.VITE_MODE || 'development';
dotenv.config({ path: VITE_MODE === 'production' ? '.env.production' : '.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  app.use(express.json()); 
  app.use('/api', apiRoutes);

  if (VITE_MODE !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: 'html' },
      mode: 'development',
    });
    app.use(vite.middlewares); 
  } else {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });
  }

  app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`Server running in ${VITE_MODE} mode on port ${PORT}`);
  });
}

startServer();
