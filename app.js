const http = require('http');
const server = http.createServer((req, res)=>{
  //console.log(req.url, req.method, req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Hello</title></head>')
  res.write('<body><h1>Hello from my Node.js server!</body>');
  res.write('</html>');
  res.end();//no more write after this because it already send res to the client

});

server.listen(3000);