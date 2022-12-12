const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res)=>{
  const method = req.method;
  const url = req.url;
  if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();//have return so we dont run another setHeader, write, end
  }
  if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data',(chunk) => {
      console.log(chunk);
      body.push(chunk);
      console.log(body);
    });
    return req.on('end', ()=>{ // return here so there is not duplicate of sending header
      const parsedBody = Buffer.concat(body).toString();//this is a buffer
      //fs.writeFileSync('message.txt', parsedBody.split('=')[1]);//sync, block code execution
      fs.writeFile('message.txt', parsedBody.split('=')[1], (err)=>{//handle error later
        res.statusCode = 302;//redirecting
        res.setHeader('Location','/');//redirecting
        return res.end();
      });//async
    
    });


  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Enter Message</title></head>')
  res.write('<body><h1>Hello from my Node.js server!</h1></body>');
  res.write('</html>');
  return res.end();//no more write after this because it already send res to the client
});

server.listen(4000);