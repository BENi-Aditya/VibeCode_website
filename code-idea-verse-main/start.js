const { spawn } = require('child_process');
const path = require('path');

// Start the API server
const apiServer = spawn('node', ['server.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

console.log('API server started on http://localhost:3001');

// Start the development server
const devServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: __dirname
});

console.log('Development server starting...');

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  apiServer.kill();
  devServer.kill();
  process.exit();
});

// Log any errors
apiServer.on('error', (error) => {
  console.error('API server error:', error);
});

devServer.on('error', (error) => {
  console.error('Development server error:', error);
});
