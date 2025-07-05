import http from 'http';
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AutoClipper AI is running');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});