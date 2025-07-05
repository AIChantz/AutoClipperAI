require('http').createServer((req, res) => {
  res.end('OK');
}).listen(process.env.PORT || 8080, () => console.log('Ready'));