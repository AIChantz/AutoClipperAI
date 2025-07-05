#!/usr/bin/env node

// Minimal deployment launcher for AutoClipper AI
// Designed for instant Cloud Run deployment without dependencies

const { spawn } = require('child_process');

console.log('🚀 AutoClipper AI - Minimal Deployment Launcher');
console.log('═'.repeat(60));

// Deployment-optimized environment - Use PORT env var or default to 8080
const PORT = process.env.PORT || '8080';
const NODE_ENV = process.env.NODE_ENV || 'production';

console.log(`🔧 Port: ${PORT}`);
console.log(`🌍 Environment: ${NODE_ENV}`);
console.log(`📦 Starting minimal server for deployment...`);

// Enhanced environment for deployment
const env = {
  ...process.env,
  PORT,
  NODE_ENV,
  // Minimal configuration
  NODE_OPTIONS: '--max-old-space-size=256'
};

// Start the minimal server
const server = spawn('node', ['server/minimal.js'], {
  stdio: 'inherit',
  env: env,
  cwd: process.cwd()
});

// Enhanced error handling
server.on('error', (error) => {
  console.error('❌ Server process error:', error);
  process.exit(1);
});

server.on('exit', (code, signal) => {
  console.log(`📊 Server process exited with code ${code} and signal ${signal}`);
  process.exit(code || 0);
});

// Graceful shutdown
function gracefulShutdown(signal) {
  console.log(`🛑 ${signal} received, shutting down gracefully...`);
  server.kill('SIGTERM');
  
  setTimeout(() => {
    console.log('⏰ Force shutdown after timeout');
    server.kill('SIGKILL');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

console.log('✅ Deployment launcher ready!');