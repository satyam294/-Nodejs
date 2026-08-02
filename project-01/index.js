const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware - like a plugin for now -> puts any url encoded/ JSpn value received in the body section
// this plugin works on every request -> checks for any url encoded(form) data or JSON data.
// If found, converts it into a JS object and puts it inside the body section
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  fs.appendFile('./log.txt', `${Date.now()} : ${req.method} : ${req.path}\n`, (err, data) => {
    next();
  });
})

// routes

/*
  Hybrid routes -> '/users' vs. '/api/users'
  backend service can be accessed by 2 different type of users : 1) end users 2) developers
  end users want to see pretty results on a screen and developers require raw data
  so for request on '/users' -> send HTML(pretty representation), on '/api/users' -> send raw json object
  Thus, '/api' helps us identify if raww data is being requested or the pretty representation
*/

// server side rendering (SSR)
app.get('/users', (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => {
    return `<li>${user.first_name}</li>`;
  }).join("")
    }
    </ul>
  `;

  return res.send(html);
});

// 1- REST APIs - GET routes
app.get('/api/users', (req, res) => {
  return res.json(users);     // return is optional. useful when if-else blocks are there for response
});

// dynamic path parameters : the third path in url is a variable -> sp start with ':' and name it anything
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);  // url params string by default
  const user = users.find((user) => user.id === id); //the callback for whichever entry evals to true, that entry is returned
  return res.json(user);
});

/*

  // POST routes
  app.post('/api/users/:id', (req, res) => {
    // TODO : add new user with id
    return res.json({status: 'pending'});
  });

  // PATCH routes
  app.patch('/api/users/:id', (req, res) => {
    // TODO : update user with id 
    return res.json({status: 'pending'});
  });

  // DELETE routes
  app.delete('/api/users/:id', (req, res) => {
    // TODO : delete user with id 
    return res.json({status: 'pending'});
  });

*/

// embedding requests on the same route
app.route('/api/users/:id')
  .patch((req, res) => {
    // TODO : update user with id 
    return res.json({ status: 'pending' });
  })
  .delete((req, res) => {
    // TODO : delete user with id 
    return res.json({ status: 'pending' });
  });

  app.post('/api/users', (req, res) => {
    const userData = req.body;
    const newUser = {id: users.length + 1, ...userData};
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      return res.json({status: "success", id: users.length});
    })
  });

app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}...`);
});