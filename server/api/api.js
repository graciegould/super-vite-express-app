import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const router = express.Router();

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routesPath = path.join(__dirname, 'routes');

/**
 * Function to autoload routes from a directory
 * @param {string} dir - The directory to load routes from
 * @param {string} basePath - The base path for the routes (default is an empty string)
 * This function reads the contents of the directory and loads each route file.
 * If a subdirectory is found, it recursively calls itself to load routes from that directory.
 * The base path is used to set the URL path for each route.
 * For example, if the base path is '/api', the routes will be loaded under the '/api' URL.
 */
function autoloadRoutes(dir, basePath = '') {
  fs.readdirSync(dir).forEach(async (file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      autoloadRoutes(fullPath, `${basePath}/${file}`);
    } else if (file.endsWith('.js')) {
      const route = await import(fullPath);
      const routeName = file.replace('.js', '');
      const routePath = `${basePath}/${routeName}`;
      router.use(routePath, route.default || route);
      console.log(`Route loaded: api${routePath}`);
    }
  });
}

autoloadRoutes(routesPath);
export default router;