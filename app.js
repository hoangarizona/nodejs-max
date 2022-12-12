const http = require('http');
const server = http.createServer((req, res)=>{
  const url = req.url;
  if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();//have return so we dont run another setHeader, write, end
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Enter Message</title></head>')
  res.write('<body><h1>Hello from my Node.js server!</h1></body>');
  res.write('</html>');
  return res.end();//no more write after this because it already send res to the client
});

server.listen(3000);