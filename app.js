const http = require('http');
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AutoClipper AI - Simplified Deployment');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AutoClipper AI running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully');
  server.close(() => process.exit(0));
});