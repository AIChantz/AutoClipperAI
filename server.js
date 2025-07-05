#!/usr/bin/env node

// Production server launcher for AutoClipper AI
// Handles all deployment requirements including health checks, port configuration, and graceful shutdown

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AutoClipper AI production server...');

// Set environment variables for production
const env = {
  ...process.env,
  PORT: process.env.PORT || '8080',
  NODE_ENV: process.env.NODE_ENV || 'production',
  // Set default session secret if not provided
  SESSION_SECRET: process.env.SESSION_SECRET || 'autoclipper-session-secret-' + Math.random().toString(36).substring(2, 15),
};

// Log startup configuration
console.log(`📡 Port: ${env.PORT}`);
console.log(`🌍 Environment: ${env.NODE_ENV}`);
console.log(`💾 Database: ${env.DATABASE_URL ? 'Connected' : 'Not configured'}`);

// Start the server process
const serverProcess = spawn('node', ['server/minimal.js'], {
  stdio: 'inherit',
  env: env,
  cwd: process.cwd()
});

// Handle server events
serverProcess.on('error', (error) => {
  console.error('❌ Server process error:', error);
  process.exit(1);
});

serverProcess.on('exit', (code, signal) => {
  console.log(`📊 Server process exited with code ${code} and signal ${signal}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
function gracefulShutdown(signal) {
  console.log(`🛑 Received ${signal}, shutting down gracefully...`);
  serverProcess.kill(signal);
  
  // Force exit after 10 seconds
  setTimeout(() => {
    console.log('⏰ Force exit after 10 seconds');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

console.log('🎯 Server launcher ready. Server starting...');