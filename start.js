#!/usr/bin/env node

// Production start script for AutoClipper AI
// Optimized for Cloud Run and container deployments

const { spawn } = require('child_process');
const http = require('http');

console.log('🚀 AutoClipper AI - Production Server');
console.log('═'.repeat(50));

// Environment configuration with proper defaults for deployment
const PORT = process.env.PORT || '8080';
const NODE_ENV = process.env.NODE_ENV || 'production';
const SESSION_SECRET = process.env.SESSION_SECRET || 'autoclipper-session-secret-' + Math.random().toString(36).substring(2, 15);

console.log(`🔧 Port: ${PORT}`);
console.log(`🌍 Environment: ${NODE_ENV}`);
console.log(`💾 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);

// Set production environment with all required variables
const env = {
  ...process.env,
  PORT,
  NODE_ENV,
  SESSION_SECRET,
  // Optimize for production
  NODE_OPTIONS: '--max-old-space-size=512',
};

console.log('📦 Starting server process...');

const server = spawn('node', ['server/minimal.js'], {
  stdio: 'inherit',
  env: env,
  cwd: process.cwd()
});

// Health check function for deployment verification
function performHealthCheck() {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${PORT}/health`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Health check passed');
          resolve(true);
        } else {
          console.log(`❌ Health check failed: ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Health check error: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      console.log('❌ Health check timeout');
      resolve(false);
    });
  });
}

// Monitor server startup and health
let healthCheckAttempts = 0;
const maxHealthCheckAttempts = 12; // 60 seconds total

function waitForServerHealth() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      healthCheckAttempts++;
      console.log(`🏥 Health check attempt ${healthCheckAttempts}/${maxHealthCheckAttempts}`);
      
      if (await performHealthCheck()) {
        clearInterval(interval);
        console.log('🎉 Server is healthy and ready!');
        console.log(`📡 API available at: http://0.0.0.0:${PORT}/`);
        console.log(`🏥 Health endpoint: http://0.0.0.0:${PORT}/health`);
        resolve(true);
      } else if (healthCheckAttempts >= maxHealthCheckAttempts) {
        clearInterval(interval);
        reject(new Error('Health check failed after maximum attempts'));
      }
    }, 5000);
  });
}

// Server event handlers
server.on('error', (error) => {
  console.error('❌ Server process error:', error);
  process.exit(1);
});

server.on('exit', (code, signal) => {
  console.log(`📊 Server process exited with code ${code} and signal ${signal}`);
  process.exit(code || 0);
});

// Graceful shutdown handlers
function gracefulShutdown(signal) {
  console.log(`🛑 ${signal} received, shutting down gracefully...`);
  server.kill(signal);
  setTimeout(() => {
    console.log('⏰ Force shutdown after timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start health monitoring after a brief delay
setTimeout(() => {
  waitForServerHealth().catch((error) => {
    console.error('❌ Server failed health check:', error.message);
    console.error('💡 Check if the server is binding to the correct port and responding to requests');
    process.exit(1);
  });
}, 3000); // Give server 3 seconds to start