const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') return;

  const myUrl = url.parse(req.url, true);  //true -> parse the query parameters as well

  let visitorName = myUrl.query.name;
  if(!visitorName) visitorName = "";

  switch(myUrl.pathname) {  //match just the pathname, not the whole url
    case '/':
      res.end(`Hi ${visitorName}, Welcome to Home!`);
      break;
    case '/about':
      res.end(`Hi ${visitorName}, My name is Satyam Chand, and I am learning Node Js fundamentals!`);
      break;
    case '/contacts':
      res.end("You can find me at: github.com/satyam294");
      break;
    default:
      res.end("404 not found");
  }
  fs.appendFile('log.txt', `Time stamp: ${Date.now()}, Request for: ${req.url}\n`, () => {
    console.log("server request, log created!");
  });
});


// listening event is generated everytime the server successfully starts to listen on a port
// the callback is run/added when the listeningEvent is generated
myServer.listen(8000, (listeningEvent) => {
  console.log('Server started on port 8000!');
})

