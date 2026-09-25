import app from './app.js';
import { APP_CONFIG } from './appConfig.js';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

/**
 * Starts the Express server independently from the Vite dev server.
 * @param {number|string} port - Server port (defaults to process.env.PORT or 3000)
 * @param {string} host - Host address (defaults to '0.0.0.0')
 * @returns {import('http').Server}
 */
export function startServer(port = PORT, host = HOST) {
  const server = app.listen(port, host, () => {
    console.log(`[${APP_CONFIG.brandName}] Express server running independently at http://${host}:${port}`);
  });
  return server;
}

// Check if this module is run directly via node (e.g., node entry.js)
const isDirectExecution =
  process.argv[1] &&
  (fileURLToPath(import.meta.url) === process.argv[1] ||
    process.argv[1].endsWith('entry.js'));

if (isDirectExecution) {
  startServer();
}

export { app };
export default startServer;
