/*
  normal node js: single handler function. Checks for route. In each route checks for request method type
  performs appropriate operation for that request, all within a single handler
  hard to manage, cluttered

  express: creates an app(request entry point)
  for each path and request type, we can write a separate handler function
  breaks a single handler into multiple handlers - easy to read and manage

  feature: dont need to parse the request url explicitly to get pathname and query params
  the req object has already been parsed in the separate handlers 
  -> req is equivalent to "url.parse(req.url, true)"

  it also uses http internally. So you dont even need to create server with http
*/

const express = require("express");   //does not return an object, but a function to create object(factory design)

const app = express();       //this line creates my server (uses http internally)

// handler for get request on '/' path
app.get('/', (req, res) => { 
  const visitorName = req.query.name || "";    
  res.end("Welcome to Homepage " + visitorName);
});

// handler for get request on '/about' path
app.get('/about', (req, res) => {
  res.end("My name is Satyam Chand and i am learning espress routing.");
});

app.listen(8000, () => {
  console.log("Listening on port 8000...");
});




