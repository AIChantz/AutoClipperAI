#!/usr/bin/env node

// AutoClipper AI - Deployment Server
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

console.log('🚀 AutoClipper AI - Starting Server...');

const app = express();
const PORT = parseInt(process.env.PORT || "10000", 10);
const HOST = "0.0.0.0";

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoints
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    service: "AutoClipper AI", 
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "production"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    service: "AutoClipper AI", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.get("/api/status", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "AutoClipper AI API is running",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: "not_found", 
    service: "AutoClipper AI",
    message: `Route ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ AutoClipper AI server running on ${HOST}:${PORT}`);
  console.log(`🏥 Health check: http://${HOST}:${PORT}/health`);
  console.log(`📡 API endpoint: http://${HOST}:${PORT}/`);
  console.log(`⚡ Server ready for deployment!`);
});

// Handle errors
server.on('error', (error) => {
  console.error('❌ Server startup error:', error);
  process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`🛑 ${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
