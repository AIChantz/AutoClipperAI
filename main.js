#!/usr/bin/env node

// Main production deployment entry point for AutoClipper AI
// Optimized for instant Cloud Run deployment with health checks

const { spawn } = require('child_process');

console.log('🚀 AutoClipper AI - Main Production Entry Point');
console.log('═'.repeat(60));

// Environment configuration - Cloud Run compatible
const PORT = process.env.PORT || '8080';
const NODE_ENV = process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || '0.0.0.0';

console.log(`🔧 Port: ${PORT}`);
console.log(`🌍 Environment: ${NODE_ENV}`);
console.log(`🌐 Host: ${HOST}`);
console.log(`📦 Starting minimal server for instant deployment...`);

// Production-optimized environment
const env = {
  ...process.env,
  PORT,
  NODE_ENV,
  HOST,
  // Ensure we have all required environment variables with fallbacks
  SESSION_SECRET: process.env.SESSION_SECRET || 'autoclipper-production-secret-' + Date.now(),
  // Memory optimization for deployment
  NODE_OPTIONS: '--max-old-space-size=256'
};

// Start the minimal server for fastest deployment
const server = spawn('node', ['server/minimal.js'], {
  stdio: 'inherit',
  env: env,
  cwd: process.cwd()
});

// Production error handling
server.on('error', (error) => {
  console.error('❌ Server startup error:', error);
  console.error('💡 Ensure all dependencies are installed and PORT is available');
  process.exit(1);
});

server.on('exit', (code, signal) => {
  console.log(`📊 Server exited with code ${code} and signal ${signal}`);
  if (code !== 0 && code !== null) {
    console.error('❌ Server exited with error code');
    process.exit(code);
  }
  process.exit(0);
});

// Graceful shutdown for containerized environments
function gracefulShutdown(signal) {
  console.log(`🛑 ${signal} received, shutting down gracefully...`);
  server.kill('SIGTERM');
  
  // Force shutdown after timeout to prevent hanging containers
  setTimeout(() => {
    console.log('⏰ Force shutdown after timeout');
    server.kill('SIGKILL');
    process.exit(1);
  }, 5000);
}

// Handle deployment platform signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGHUP', () => gracefulShutdown('SIGHUP'));

console.log('✅ Main production launcher ready for deployment!');